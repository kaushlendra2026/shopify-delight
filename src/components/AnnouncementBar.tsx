const announcements = [
  "🚀 FREE SHIPPING on orders over ₹999",
  "⚡ Limited Time: 20% OFF on all products",
  "🔥 New Arrivals just dropped - Shop Now!",
];

const AnnouncementBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...announcements, ...announcements].map((text, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
