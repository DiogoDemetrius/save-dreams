# Documentação de Integração - Dreams Cloud Gaming

## Visão Geral
Esta documentação descreve a integração entre o frontend, painel administrativo e API da Dreams Cloud Gaming.

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário 
- `POST /auth/recovery` - Recuperação de senha

### Máquinas Virtuais
- `GET /vm/status/:vmId` - Status da VM
- `POST /vm/start` - Inicia uma VM
- `POST /vm/stop` - Para uma VM

### Planos e Assinaturas
- `GET /plans` - Lista planos disponíveis
- `POST /subscription/purchase` - Realiza assinatura

## Integração Frontend

### Autenticação
```typescript
// auth.service.ts
const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
```

### Máquinas Virtuais
```typescript
// vm.service.ts
const startVM = async (vmId: string, plan: 'standard' | 'premium') => {
  await api.post('/vm/start', { vm_id: vmId, plan });
};
```

### Planos
```typescript
// subscription.service.ts
const getPlans = async () => {
  const response = await api.get('/plans');
  return response.data;
};
```

## Tratamento de Erros

```typescript
// api.ts
const handleAPIError = (error: APIError) => {
  switch (error.status) {
    case 401: return 'Sessão expirada';
    case 403: return 'Acesso negado';
    case 500: return 'Erro interno';
    default: return 'Erro desconhecido';
  }
};
```

## Fluxos de Integração

### Iniciar VM
1. Usuário seleciona plano (Standard/Premium)
2. Frontend chama `POST /vm/start`
3. API retorna credenciais de acesso
4. Frontend exibe informações de conexão

### Assinatura
1. Usuário escolhe plano
2. Frontend chama `POST /subscription/purchase`
3. API processa pagamento
4. Frontend atualiza status da assinatura

## Considerações de Segurança

- Tokens JWT para autenticação
- Renovação automática de token
- Validação de permissões por rota
- HTTPS obrigatório

## Manutenção

- Monitorar logs de erro
- Verificar status das VMs periodicamente
- Validar integridade das assinaturas