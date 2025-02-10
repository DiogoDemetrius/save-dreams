import { Jogo } from '../tipos';

interface CartaoJogoProps {
  jogo: Jogo;
}

export function CartaoJogo({ jogo }: CartaoJogoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={jogo.imagemCapa}
        alt={jogo.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800">{jogo.titulo}</h3>
        <p className="text-sm text-slate-600 mt-2">{jogo.descricao}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {jogo.generos.map((genero) => (
            <span
              key={genero}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600"
            >
              {genero}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-slate-600">{jogo.avaliacao}</span>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-300 text-white rounded-md hover:opacity-90 transition-opacity">
            Jogar Agora
          </button>
        </div>
      </div>
    </div>
  );
}