import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-[36px]">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
