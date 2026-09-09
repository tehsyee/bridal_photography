import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Packages from './components/Packages';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandStatement />
        <Portfolio />
        <Experience />
        <Packages />
        <About />
        <Testimonials />
        <FAQ />
        <BookingForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
