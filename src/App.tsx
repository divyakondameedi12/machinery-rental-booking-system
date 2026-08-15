import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import type { MachineType } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import Hero from '@/components/Hero';
import Machinery from '@/components/Machinery';
import Services from '@/components/Services';
import BookingSection from '@/components/BookingSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import FinalBrand from '@/components/FinalBrand';
import AdminLogin from '@/admin/AdminLogin';
import AdminDashboard from '@/admin/AdminDashboard';

function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, ''));
  useEffect(() => {
    const onChange = () => setHash(window.location.hash.replace(/^#/, ''));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function PublicSite() {
  const [selectedMachine, setSelectedMachine] = useState<MachineType>('tractor');

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bookMachine = (m: MachineType) => {
    setSelectedMachine(m);
    scrollToBooking();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onBook={scrollToBooking} />
      <main className="flex-1 pb-16 lg:pb-0">
        <Hero onBook={scrollToBooking} />
        <Machinery onBook={bookMachine} />
        <Services onBook={scrollToBooking} />
        <BookingSection selectedMachine={selectedMachine} onMachineChange={setSelectedMachine} />
        <About />
        <Contact />
        <FinalBrand />
      </main>
      <Footer />
      <MobileBar onBook={scrollToBooking} />
    </div>
  );
}

export default function App() {
  const { session, loading } = useAuth();
  const route = useHashRoute();

  if (route === 'admin') {
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-earth-800 text-cream-100">
          Loading...
        </div>
      );
    }
    return session ? <AdminDashboard /> : <AdminLogin />;
  }

  return <PublicSite />;
}
