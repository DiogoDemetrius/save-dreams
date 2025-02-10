import { MaquinaVirtual } from '../tipos';

interface CartaoMVProps {
  maquinaVirtual: MaquinaVirtual;
}

export function CartaoMV({ maquinaVirtual: mv }: CartaoMVProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-slate-800">{mv.nome}</h3>
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
          {mv.tipo}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Processador</span>
          <span className="font-medium">{mv.especificacoes.processador}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Memória</span>
          <span className="font-medium">{mv.especificacoes.memoria}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Armazenamento</span>
          <span className="font-medium">{mv.especificacoes.armazenamento}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Placa de Vídeo</span>
          <span className="font-medium">{mv.especificacoes.placaVideo}</span>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-bold text-blue-600">
          R$ {mv.preco}<span className="text-sm font-normal">/hora</span>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-300 text-white rounded-md hover:opacity-90 transition-opacity">
          Iniciar MV
        </button>
      </div>
    </div>
  );
}