import { MessageCircle } from 'lucide-react';

export function DiscordButton() {
  return (
    <a
      href="https://discord.gg/dreamscloud"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-dreams-blue to-dreams-lilac rounded-full shadow-lg 
        hover:scale-110 transition-all duration-300 group"
      aria-label="Chat no Discord"
    >
      <MessageCircle className="w-6 h-6 text-black" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-black/80 text-white text-sm
        opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 whitespace-nowrap
        group-hover:opacity-100 group-hover:translate-x-0">
        Chat no Discord
      </span>
    </a>
  );
}