import { Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/dreams-latam/',
    label: 'LinkedIn'
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/dreams_latam',
    label: 'Instagram'
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/@dreams_latam',
    label: 'YouTube'
  },
  {
    icon: MessageCircle,
    href: 'https://discord.gg/dreamscloud',
    label: 'Discord'
  }
];

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-black/30 text-dreams-lilac-light hover:text-dreams-blue-light hover:bg-black/50 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          <div className="text-center text-sm text-dreams-lilac-light">
            <p>Dreams Cloud © {new Date().getFullYear()}</p>
            <p>W&K Future Of Technology LTDA • CNPJ 55.980.202/0001-39</p>
          </div>
        </div>
      </div>
    </footer>
  );
}