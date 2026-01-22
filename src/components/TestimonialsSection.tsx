import { MessageCircle } from 'lucide-react';

const testimonials = [
  {
    quote: "Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Neha Patel",
    role: "Interior Designer",
  },
  {
    quote: "The quality of these 3D prints is absolutely incredible. The Darth Vader bust looks like it came straight from a movie prop studio!",
    name: "Vikram Rao",
    role: "Star Wars Collector",
  },
  {
    quote: "My piston lamp is the centerpiece of my office. Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Meera Krishnan",
    role: "Interior Designer",
  },
  {
    quote: "Fast shipping and the packaging was perfect. The Minecraft ore lamp exceeded my expectations!",
    name: "Kunal Singh",
    role: "Gaming Enthusiast",
  },
  {
    quote: "I've bought from many 3D print shops, but the detail and finish quality here is unmatched. Will definitely order again!",
    name: "Ananya Iyer",
    role: "Model Kit Builder",
  },
  {
    quote: "Highly recommend!",
    name: "Priya Sharma",
    role: "Art Collector",
  },
  {
    quote: "The brake caliper lamp with the glowing rotor effect is mind-blowing. Perfect gift for any car enthusiast.",
    name: "Rohan Verma",
    role: "Automotive Engineer",
  },
  {
    quote: "Customer service was amazing. They helped me choose the perfect piece for my collection. Highly recommend!",
    name: "Aditya Nair",
    role: "Art Collector",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          
          <h2 className="font-display font-black text-3xl md:text-5xl mb-4">
            <span className="text-foreground">What Our</span>{' '}
            <span className="text-neon">Collectors</span>
            <br />
            <span className="text-foreground">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join hundreds of satisfied collectors who've found their perfect pieces
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="break-inside-avoid glass-card p-6 hover:border-primary/50 transition-colors"
            >
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
