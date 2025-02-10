# API Reference - Dreams Cloud Gaming

## Endpoints

### Autenticação

#### POST /auth/login
```json
{
  "request": {
    "email": "string",
    "password": "string"
  },
  "response": {
    "auth_token": "string"
  }
}
```

#### POST /auth/register
```json
{
  "request": {
    "username": "string",
    "email": "string",
    "password": "string"
  },
  "response": {
    "message": "string"
  }
}
```

### Máquinas Virtuais

#### GET /vm/status/:vmId
```json
{
  "response": {
    "status": "running | stopped | starting",
    "ip": "string",
    "credentials": {
      "username": "string",
      "password": "string"
    }
  }
}
```

#### POST /vm/start
```json
{
  "request": {
    "vm_id": "string",
    "plan": "standard | premium"
  },
  "response": {
    "message": "string"
  }
}
```

### Planos

#### GET /plans
```json
{
  "response": [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "features": ["string"]
    }
  ]
}
```

## Códigos de Erro

- 401: Token inválido/expirado
- 403: Permissão negada
- 404: Recurso não encontrado
- 500: Erro interno