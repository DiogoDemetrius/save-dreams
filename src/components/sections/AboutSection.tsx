import { Users, Clock, MessageCircle } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-dreams-blue-light to-dreams-lilac bg-clip-text text-transparent mb-4">
                Sobre a Dreams Cloud
              </h2>
              <p className="text-dreams-lilac-light text-lg">
                Somos uma empresa brasileira de São Paulo, pioneira no mercado
                de cloud gaming, oferecendo soluções inovadoras para gamers e
                profissionais que buscam poder computacional na nuvem.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-black/30 rounded-lg border border-dreams-lilac/10">
                <Clock className="w-8 h-8 text-dreams-blue-light mx-auto mb-2" />
                <p className="text-white font-bold">2+ Anos</p>
                <p className="text-dreams-lilac-light text-sm">no mercado</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-dreams-lilac/10">
                <Users className="w-8 h-8 text-dreams-blue-light mx-auto mb-2" />
                <p className="text-white font-bold">1000+</p>
                <p className="text-dreams-lilac-light text-sm">
                  clientes ativos
                </p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-dreams-lilac/10">
                <MessageCircle className="w-8 h-8 text-dreams-blue-light mx-auto mb-2" />
                <p className="text-white font-bold">6000+</p>
                <p className="text-dreams-lilac-light text-sm">
                  membros Discord
                </p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative aspect-video bg-black/30 rounded-xl overflow-hidden border border-dreams-lilac/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/_iQDib4I_34?controls=0&rel=0&showinfo=0"
              title="Dreams Cloud Gaming Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}