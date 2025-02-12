import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/User.js'; // Certifique-se de usar a extensão .js
import nodemailer from 'nodemailer';
import axios from 'axios';
import https from 'https';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.use(express.json());

// Adicionar cabeçalhos CORS manualmente (opcional, mas recomendado para maior controle)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Adicione este middleware antes das suas rotas
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('Erro na conexão MongoDB:', err);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado com sucesso');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
});

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Configuração do agente HTTPS para Proxmox
const proxmoxAgent = new https.Agent({
  rejectUnauthorized: false // Desativa verificação de certificados
});

// Endpoint para login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      auth_token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Endpoint para registro
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    const savedUser = await newUser.save();
    console.log('Usuário criado com sucesso:', savedUser); // Log para debug
    
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro detalhado ao criar usuário:', error);
    res.status(500).json({ 
      message: 'Erro ao criar usuário',
      error: error.message 
    });
  }
});

// Endpoint para recuperação de senha
app.post('/api/auth/recovery', async (req, res) => {
  const { email } = req.body;
  
  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email não encontrado' });
    }

    // Gerar token de recuperação
    const recoveryToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Criar link de recuperação
    const resetLink = `http://localhost:5173/reset-password?token=${recoveryToken}`;

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Dreams Cloud Gaming - Recuperação de Senha',
      html: `
        <h1>Recuperação de Senha</h1>
        <p>Olá ${user.username},</p>
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link é válido por 1 hora.</p>
        <p>Se você não solicitou esta recuperação, ignore este email.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe Dreams Cloud Gaming</p>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      message: 'Email de recuperação enviado com sucesso'
    });

  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    res.status(500).json({ message: 'Erro ao processar recuperação de senha' });
  }
});

// Endpoint para redefinir senha
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Hash nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Atualizar senha do usuário
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token expirado' });
    }
    res.status(500).json({ message: 'Erro ao redefinir senha' });
  }
});

// Endpoint para planos de assinatura
app.get('/api/plans', async (req, res) => {
  try {
    res.json([
      {
        id: 'daily',
        name: 'Acesso 24 Horas',
        type: 'daily',
        price: 29.99,
        features: [
          'Acesso a Catálogo e Full Desktop',
          'Máquina Virtual Dedicada',
          'Sessões de até 6 Horas',
          'AFK 30min (Desligamento por AFK)',
          'Filas de ALTA Prioridade',
          'Acesso por 24 horas'
        ]
      },
      {
        id: 'standard',
        name: 'Standard',
        type: 'standard',
        price: 169.99,
        features: [
          'Acesso a catálogo de jogos',
          'Máquina Virtual Standard',
          'Sessões de até 3 horas',
          'AFK 10min (Desligamento por AFK)',
          'Filas de BAIXA Prioridade',
          'Acesso Mensal'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        type: 'premium',
        price: 249.99,
        features: [
          'Acesso a Catálogo e Full Desktop',
          'Máquina Virtual Premium',
          'Sessões de até 6 Horas',
          'AFK 30min (Desligamento por AFK)',
          'Filas de ALTA Prioridade',
          'Acesso Mensal'
        ]
      }
    ]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar planos' });
  }
});

// Endpoint para iniciar VM
app.post('/api/vm/start', async (req, res) => {
  const { PROXMOX_API, USERNAME, PASSWORD, NODE, VMID } = req.body;

  // Validar parâmetros
  if (!PROXMOX_API || !USERNAME || !PASSWORD || !NODE || !VMID) {
    return res.status(400).json({ 
      error: 'Todos os parâmetros são obrigatórios.' 
    });
  }

  try {
    // 1. Autenticação no Proxmox
    console.log('Iniciando autenticação no Proxmox...');
    const authResponse = await axios.post(
      `${PROXMOX_API}/access/ticket`,
      {
        username: USERNAME,
        password: PASSWORD,
      },
      { httpsAgent: proxmoxAgent }
    );

    const { ticket, CSRFPreventionToken } = authResponse.data.data;
    console.log('Autenticação bem sucedida');

    // 2. Iniciar a VM
    console.log(`Iniciando VM ${VMID}...`);
    const startResponse = await axios.post(
      `${PROXMOX_API}/nodes/${NODE}/qemu/${VMID}/status/start`,
      {},
      {
        headers: {
          Cookie: `PVEAuthCookie=${ticket}`,
          CSRFPreventionToken: CSRFPreventionToken,
        },
        httpsAgent: proxmoxAgent,
      }
    );

    // 3. Registrar no banco de dados
    // TODO: Implementar registro de ativação no MongoDB

    console.log('VM iniciada com sucesso');
    res.json({ 
      message: 'VM iniciada com sucesso',
      details: startResponse.data 
    });

  } catch (error) {
    console.error('Erro ao interagir com Proxmox:', error);
    res.status(500).json({
      error: 'Erro ao iniciar VM',
      details: error.response?.data || error.message
    });
  }
});

// Endpoint para verificar status da VM
app.get('/api/vm/:vmId/status', async (req, res) => {
  // TODO: Implementar verificação de status
  res.json({ status: 'running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
