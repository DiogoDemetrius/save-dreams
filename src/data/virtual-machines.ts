export const virtualMachines = [
  {
    id: 'vm1',
    name: 'Standard',
    specs: {
      cpu: 'AMD Ryzen 5 - 4500 (Nucleos)',
      ram: '16GB DDR5',
      storage: 'SSD NVME 256GB',
      gpu: 'RTX 4090 - 24GB',
      storage_info: 'SEM Salvamento de Arquivos'
    },
    type: 'shared'
  },
  {
    id: 'vm2',
    name: 'Premium',
    specs: {
      cpu: 'AMD Ryzen 5 - 4500 (Nucleos)',
      ram: '16GB DDR5',
      storage: 'SSD NVME 1024GB',
      gpu: 'RTX 4090 - 24GB',
      storage_info: 'COM Salvamento de Arquivos'
    },
    type: 'dedicated'
  }
] as const;