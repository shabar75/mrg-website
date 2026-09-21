import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Landmark, FileKey, Database, Briefcase, HeadphonesIcon } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useReveal } from '../hooks/useReveal';
import './ServicesSection.css';

const services = [
  {
    icon: ShieldCheck,
    title: 'Compliance Management',
    description: 'Stay compliant with changing regulations and industry standards.',
  },
  {
    icon: Landmark,
    title: 'Liaisoning with Authorities',
    description: 'Direct coordination with government & regulatory bodies.',
  },
  {
    icon: FileKey,
    title: 'Licensing Services',
    description: 'Support for obtaining and renewing required licenses and approvals.',
  },
  {
    icon: Database,
    title: 'Raw Data Processing',
    description: 'Accurate, secure and efficient processing of your business data and records.',
  },
  {
    icon: Briefcase,
    title: 'Business Consultation',
    description: 'Strategic advice for smoother operations and informed decisions.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Advisory & Support',
    description: 'Ongoing support for regulatory, legal and operational needs.',
  },
];

export default function ServicesSection() {
  const ref = useReveal();

  return (
    <section className="services section" id="services" ref={ref}>
      <div className="container">
        <div className="services__grid">
          <div className="services__intro reveal">
            <span className="section-label">OUR SERVICES</span>
            <h2 className="section-title">Comprehensive Support<br />for Your Business</h2>
            <p className="section-subtitle">
              From documentation to approvals, we handle the complex so you can focus on what
              matters most — your business.
            </p>
            <Link to="/consultation" className="btn btn-primary services__btn">
              Explore Our Services
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </div>
          <div className="services__cards">
            {services.map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <ServiceCard {...s} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
