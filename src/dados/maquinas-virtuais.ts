export const maquinasVirtuais = [
  {
    id: 'mv1',
    nome: 'Gaming Ultra',
    especificacoes: {
      processador: 'AMD Ryzen 9',
      memoria: '32GB DDR4',
      armazenamento: '1TB NVMe SSD',
      placaVideo: 'NVIDIA RTX 4080'
    },
    preco: 4.99,
    tipo: 'gaming'
  },
  {
    id: 'mv2',
    nome: 'Estação Pro',
    especificacoes: {
      processador: 'Intel i9',
      memoria: '64GB DDR4',
      armazenamento: '2TB NVMe SSD',
      placaVideo: 'NVIDIA RTX A4000'
    },
    preco: 6.99,
    tipo: 'profissional'
  }
] as const;