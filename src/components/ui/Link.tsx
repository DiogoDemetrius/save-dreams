import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      className="flex items-center text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200"
    >
      {children}
    </a>
  );
}