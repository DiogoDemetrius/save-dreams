export interface Jogo {
  id: string;
  titulo: string;
  imagemCapa: string;
  descricao: string;
  generos: string[];
  avaliacao: number;
}

export interface MaquinaVirtual {
  id: string;
  nome: string;
  especificacoes: {
    processador: string;
    memoria: string;
    armazenamento: string;
    placaVideo: string;
  };
  preco: number;
  tipo: 'gaming' | 'workstation' | 'profissional';
}