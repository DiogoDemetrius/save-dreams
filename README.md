# Dreams Cloud Gaming - Documentação de Integração com APIs 🚀

## Consumo de APIs

### Configuração Inicial
O projeto utiliza um cliente HTTP centralizado que gerencia automaticamente:
- Headers de autenticação
- Tratamento de erros
- Refresh de token
- Mensagens de feedback

### Exemplo de Uso

```typescript
// Fazendo uma requisição autenticada
import { apiRequest } from './services/api';

// GET request
const data = await apiRequest<UserProfile>('/profile');

// POST request com body
const response = await apiRequest('/vm/start', {
  method: 'POST',
  body: JSON.stringify({ vm_id: '123', plan: 'standard' })
});
```

### Tratamento de Erros
O sistema possui tratamento centralizado de erros que:
- Exibe mensagens amigáveis ao usuário
- Lida com erros de rede
- Gerencia expiração de token
- Fornece feedback consistente

### Status de Máquinas Virtuais
O sistema verifica periodicamente o status das VMs:
```typescript
// Exemplo de verificação de status
vmService.startStatusCheck('vm-id');

// Ouvindo atualizações de status
window.addEventListener('vm-status-update', (event) => {
  const { vmId, status } = event.detail;
  // Atualiza UI com novo status
});
```

### Códigos de Erro
- 400: Dados inválidos
- 401: Não autorizado/Token expirado
- 403: Acesso negado
- 404: Recurso não encontrado
- 409: Conflito
- 422: Erro de validação
- 429: Muitas requisições
- 500: Erro interno do servidor

### Boas Práticas
1. Sempre use o `apiRequest` para fazer chamadas à API
2. Trate erros específicos nos serviços
3. Forneça feedback claro ao usuário
4. Mantenha o estado da aplicação sincronizado com o backend