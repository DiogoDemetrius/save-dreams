import { HelpCircle, FileText, BookOpen } from 'lucide-react';

const supportLinks = [
  {
    icon: HelpCircle,
    title: 'Contate Suporte',
    description: 'Precisa de ajuda? Nossa equipe está pronta para atender você.',
    href: 'https://discord.gg/dreamscloud'
  },
  {
    icon: FileText,
    title: 'Termos de Uso',
    description: 'Leia nossos termos e condições de uso do serviço.',
    href: 'https://drive.google.com/file/d/1Wz6aqYfDofyl9QCXWdLkT5fCVHw7pQUY/view?usp=drive_link'
  },
  {
    icon: BookOpen,
    title: 'Tutoriais',
    description: 'Aprenda a utilizar todos os recursos da plataforma.',
    href: 'https://www.youtube.com/playlist?list=PL1Qdg86XG2gtkvtg3ygLRtczv56g9uL5j'
  }
];

export function Features() {
  return (
    <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-dreams-lilac/10 
                hover:border-dreams-lilac/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <link.icon className="w-12 h-12 text-dreams-blue-light mb-4 group-hover:text-dreams-lilac transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-dreams-lilac-light transition-colors">
                  {link.title}
                </h3>
                <p className="text-dreams-lilac-light">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}