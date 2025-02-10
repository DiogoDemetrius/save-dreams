export interface VirtualMachine {
  id: string;
  name: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    storage_info: string;
  };
  type: 'shared' | 'dedicated';
}

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  genre: string[];
  rating: number;
}