import { CheckCircle, Printer, Sparkles, Award } from 'lucide-react';

const features = [
  {
    icon: Printer,
    title: 'Premium 3D Printing',
    description: 'State-of-the-art resin and FDM printers for exceptional detail'
  },
  {
    icon: Sparkles,
    title: 'Custom Designs',
    description: 'Unique artistic vision in every collectible we create'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Each piece inspected and finished by hand for perfection'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="section-badge mb-4 inline-block">
              <Sparkles className="w-4 h-4" />
              About Us
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl mb-6">
              <span className="text-foreground">Crafting</span>{' '}
              <span className="text-neon">Excellence</span>
              <br />
              <span className="text-foreground">One Layer at a Time</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At Pickaxe Lab, we believe every collector deserves exceptional quality.
              Our team of designers and printing specialists work tirelessly to bring
              your favorite characters and functional art pieces to life with
              unprecedented detail and finish.
            </p>

            <div className="space-y-4">
              {['Premium materials only', 'Hand-finished details', 'Secure packaging', 'Worldwide shipping'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 flex items-start gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
