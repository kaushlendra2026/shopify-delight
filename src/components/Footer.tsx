import { useEffect, useState } from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchShopPolicies, ShopPolicies } from '@/lib/shopify';
import logo from '@/assets/logo.png';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/pickaxe.labs?igsh=bjZwcGx2bWtjYjFo', label: 'Instagram' },
  { icon: Mail, href: 'mailto:kaushlendra.pandey@pickaxelab.com', label: 'Email' },
];

const footerLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Footer = () => {
  const [policies, setPolicies] = useState<ShopPolicies | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await fetchShopPolicies();
        setPolicies(data);
      } catch (err) {
        console.error('Failed to fetch policies:', err);
      }
    };
    loadPolicies();
  }, []);

  const navigateOrScrollTop = (href: string) => {
    if (href === location.pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(href);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigateOrScrollTop(href);
      return;
    }

    if (href.startsWith('#') && href.length > 1) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const policyLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Return / Refund', href: '/refund' },
    { label: 'Shipping Policy', href: '/shipping' },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/50">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="watermark-text">PICKAXE</span>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo */}
          <button onClick={handleLogoClick} className="inline-block mb-4 cursor-pointer">
            <img src={logo} alt="PickaxeLab" className="h-14 w-auto mx-auto" />
          </button>

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
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
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

          {/* Policy Links (dedicated URLs for Razorpay) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {policyLinks.map((item, index) => (
              <button
                key={index}
                className="text-muted-foreground hover:text-primary transition-colors text-xs underline underline-offset-2 disabled:opacity-50"
                onClick={() => navigateOrScrollTop(item.href)}
              >
                {item.label}
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
