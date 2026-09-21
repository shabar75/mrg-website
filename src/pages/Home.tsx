import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import IndustriesSection from '../components/IndustriesSection';
import ProcessSection from '../components/ProcessSection';
import TestimonialSection from '../components/TestimonialSection';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <IndustriesSection />
      <ProcessSection />
      <TestimonialSection />
      <CTA />
    </div>
  );
}
