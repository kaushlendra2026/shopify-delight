import { ArrowRight, Sparkles } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Happy Collectors' },
  { value: '100%', label: 'Premium Quality' },
  { value: '50+', label: 'Unique Designs' },
];

const HeroSection = () => {
  const scrollToShop = () => {
    const element = document.querySelector('#shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline=""
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 section-badge mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Handcrafted 3D Printed Art</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 animate-slide-up">
          <span className="text-foreground">PREMIUM</span>
          <br />
          <span className="text-neon-intense">3D PRINTED</span>
          <br />
          <span className="text-foreground">COLLECTIBLES</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          From iconic character busts to functional art pieces. Each creation is
          meticulously designed and printed to perfection for collectors who
          demand excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button onClick={scrollToShop} className="btn-neon flex items-center gap-2">
            Explore Collection
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={scrollToAbout} className="btn-outline-neon">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display font-black text-3xl md:text-4xl text-neon">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
