// @/components/layout/footer.tsx
import { Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/janithagamage/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
            <Facebook className="h-6 w-6" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
            </Link>
        </div>
        <p>&copy; {currentYear} Portfolio Pro. All rights reserved.</p>
        <p>Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
