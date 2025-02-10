import { useState, useCallback } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Mail, Lock, AlertCircle, User, Check, Loader2 } from 'lucide-react';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/authStore';

export function AuthModal() {
  const [mode, setMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthModalOpen, closeAuthModal } = useAuthStore();

  const validateForm = useCallback(() => {
    setError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    if (mode !== 'recovery') {
      if (!password || password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return false;
      }
      
      if (mode === 'register' && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        setError('A senha deve conter letras maiúsculas, minúsculas e números');
        return false;
      }
    }

    if (mode === 'register') {
      if (!username || username.length < 3) {
        setError('O nome de usuário deve ter pelo menos 3 caracteres');
        return false;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError('O nome de usuário deve conter apenas letras, números e underscores');
        return false;
      }
    }

    return true;
  }, [email, password, username, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      switch (mode) {
        case 'login':
          await authService.login({ login: email, password });
          setSuccess('Login realizado com sucesso!');
          closeAuthModal();
          break;

        case 'register':
          await authService.register({ username, email, password });
          setSuccess('Conta criada com sucesso! Redirecionando para login...');
          await Promise.all([
            new Promise(resolve => setTimeout(resolve, 2000)),
            Promise.resolve(setMode('login')),
            Promise.resolve(setUsername('')),
            Promise.resolve(setPassword('')),
            Promise.resolve(setSuccess(''))
          ]);
          break;

        case 'recovery':
          await authService.recoveryPassword(email);
          setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada');
          await Promise.all([
            new Promise(resolve => setTimeout(resolve, 3000)),
            Promise.resolve(setMode('login')),
            Promise.resolve(setEmail('')),
            Promise.resolve(setSuccess(''))
          ]);
          break;
      }
    } catch (error: any) {
      setError(error.message || 'Ocorreu um erro. Por favor, tente novamente');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  }, []);

  const switchMode = useCallback((newMode: 'login' | 'register' | 'recovery') => {
    resetForm();
    setMode(newMode);
  }, [resetForm]);

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => {
        resetForm();
        closeAuthModal();
      }}
      title={mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : 'Recuperar Senha'}
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top duration-300">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top duration-300">
          <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-green-500 text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-2">
              Nome de Usuário
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dreams-lilac-light 
                group-focus-within:text-dreams-blue transition-colors" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-dreams-lilac/20 rounded-xl 
                  text-white focus:border-dreams-blue outline-none transition-colors"
                required
                minLength={3}
                maxLength={30}
                pattern="[a-zA-Z0-9_]+"
                placeholder="Seu nome de usuário"
                aria-label="Nome de usuário"
                autoComplete="username"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-dreams-lilac-light mb-2">
            Email
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dreams-lilac-light 
              group-focus-within:text-dreams-blue transition-colors" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full pl-12 pr-4 py-3 bg-black/30 border border-dreams-lilac/20 rounded-xl 
                text-white focus:border-dreams-blue outline-none transition-colors"
              required
              placeholder="seu@email.com"
              aria-label="Email"
              autoComplete="email"
            />
          </div>
        </div>

        {mode !== 'recovery' && (
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-2">
              Senha
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dreams-lilac-light 
                group-focus-within:text-dreams-blue transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-dreams-lilac/20 rounded-xl 
                  text-white focus:border-dreams-blue outline-none transition-colors"
                required
                minLength={6}
                placeholder="••••••"
                aria-label="Senha"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
            {mode === 'register' && (
              <p className="mt-2 text-xs text-dreams-lilac-light">
                A senha deve conter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas e números
              </p>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 text-lg font-medium bg-gradient-to-r from-dreams-blue to-dreams-lilac 
            text-black transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            focus:ring-2 focus:ring-dreams-lilac/50 focus:ring-offset-2 focus:ring-offset-dreams-bg-dark"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Processando...</span>
            </div>
          ) : (
            mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar conta' : 'Recuperar'
          )}
        </Button>

        <div className="flex justify-between text-sm">
          {mode === 'login' ? (
            <>
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors
                  focus:outline-none focus:ring-2 focus:ring-dreams-lilac/50 focus:ring-offset-2 
                  focus:ring-offset-dreams-bg-dark rounded-lg px-2 py-1"
              >
                Criar conta
              </button>
              <button
                type="button"
                onClick={() => switchMode('recovery')}
                className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors
                  focus:outline-none focus:ring-2 focus:ring-dreams-lilac/50 focus:ring-offset-2 
                  focus:ring-offset-dreams-bg-dark rounded-lg px-2 py-1"
              >
                Esqueci minha senha
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors
                focus:outline-none focus:ring-2 focus:ring-dreams-lilac/50 focus:ring-offset-2 
                focus:ring-offset-dreams-bg-dark rounded-lg px-2 py-1"
            >
              Voltar para login
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}