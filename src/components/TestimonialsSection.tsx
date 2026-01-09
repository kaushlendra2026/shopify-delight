import { MessageCircle } from 'lucide-react';

const testimonials = [
  {
    quote: "Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Neha Patel",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    quote: "The quality of these 3D prints is absolutely incredible. The Darth Vader bust looks like it came straight from a movie prop studio!",
    name: "Vikram Rao",
    role: "Star Wars Collector",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    quote: "My piston lamp is the centerpiece of my office. Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Neha Patel",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    quote: "Fast shipping and the packaging was perfect. The Minecraft ore lamp exceeded my expectations!",
    name: "Kunal Singh",
    role: "Gaming Enthusiast",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    quote: "I've bought from many 3D print shops, but the detail and finish quality here is unmatched. Will definitely order again!",
    name: "Ananya Iyer",
    role: "Model Kit Builder",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
  },
  {
    quote: "Highly recommend!",
    name: "Priya Sharma",
    role: "Art Collector",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  },
  {
    quote: "The brake caliper lamp with the glowing rotor effect is mind-blowing. Perfect gift for any car enthusiast.",
    name: "Rohan Verma",
    role: "Automotive Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    quote: "Customer service was amazing. They helped me choose the perfect piece for my collection. Highly recommend!",
    name: "Priya Sharma",
    role: "Art Collector",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
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
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
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
