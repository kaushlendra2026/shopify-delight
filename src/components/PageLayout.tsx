import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PageLayoutProps = {
  children: React.ReactNode;
  /** Extra top padding to clear the fixed navbar */
  contentClassName?: string;
};

export default function PageLayout({ children, contentClassName }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={contentClassName ?? "pt-20"}>{children}</main>
      <Footer />
    </div>
  );
}
