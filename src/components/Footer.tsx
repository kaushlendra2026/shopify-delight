import { Twitter, Instagram, Github, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'Github' },
  { icon: Mail, href: '#', label: 'Email' },
];

const footerLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#' },
];

const Footer = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/50">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="watermark-text">PICKAXE</span>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo */}
          <a href="#home" className="inline-block mb-4">
            <img src={logo} alt="PickaxeLab" className="h-14 w-auto mx-auto" />
          </a>

          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Premium 3D printed collectibles and functional art pieces for enthusiasts worldwide.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {footerLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 PickaxeLab. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Crafted with passion for collectors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
