export const defaultPlans = [
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
] as const;