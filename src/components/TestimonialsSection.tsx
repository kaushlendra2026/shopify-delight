import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Neha Patel",
    role: "Interior Designer",
  },
  {
    text: "The quality of these 3D prints is absolutely incredible. The Darth Vader bust looks like it came straight from a movie prop studio!",
    name: "Vikram Rao",
    role: "Star Wars Collector",
  },
  {
    text: "My piston lamp is the centerpiece of my office. Everyone asks where I got it. Absolutely stunning craftsmanship.",
    name: "Meera Krishnan",
    role: "Interior Designer",
  },
  {
    text: "Fast shipping and the packaging was perfect. The Minecraft ore lamp exceeded my expectations!",
    name: "Kunal Singh",
    role: "Gaming Enthusiast",
  },
  {
    text: "I've bought from many 3D print shops, but the detail and finish quality here is unmatched. Will definitely order again!",
    name: "Ananya Iyer",
    role: "Model Kit Builder",
  },
  {
    text: "Highly recommend! The pieces are museum-quality and arrived beautifully packaged.",
    name: "Priya Sharma",
    role: "Art Collector",
  },
  {
    text: "The brake caliper lamp with the glowing rotor effect is mind-blowing. Perfect gift for any car enthusiast.",
    name: "Rohan Verma",
    role: "Automotive Engineer",
  },
  {
    text: "Customer service was amazing. They helped me choose the perfect piece for my collection. Highly recommend!",
    name: "Aditya Nair",
    role: "Art Collector",
  },
  {
    text: "Using this store was a breeze. The product quality and attention to detail is second to none.",
    name: "Kavita Desai",
    role: "Home Decor Enthusiast",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 15,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <div className="flex flex-col gap-6" key={index}>
            {testimonials.map(({ text, name, role }, i) => (
              <div
                key={`${index}-${i}`}
                className="glass-card p-6 hover:border-primary/50 transition-colors break-inside-avoid"
              >
                <p className="text-foreground leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {name}
                    </h4>
                    <p className="text-muted-foreground text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl mb-4">
            <span className="text-foreground">What Our </span>
            <span className="text-neon">Collectors</span>
            <br />
            <span className="text-foreground">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join hundreds of satisfied collectors who've found their perfect
            pieces
          </p>
        </div>

        {/* Scrolling Columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[750px]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
