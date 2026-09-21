import { Link } from 'react-router-dom';
import {
  ArrowRight, GraduationCap, Briefcase, BookOpen, Landmark,
  Eye, HeartHandshake, FileText, Route
} from 'lucide-react';
import CTA from '../components/CTA';
import { useReveal } from '../hooks/useReveal';
import './WhyMRG.css';

const reasons = [
  { icon: GraduationCap, title: 'Expertise', desc: 'Specialized knowledge in compliance, licensing and regulatory frameworks.' },
  { icon: Briefcase, title: 'Experience', desc: 'Practical experience supporting businesses across diverse industries.' },
  { icon: BookOpen, title: 'Regulatory Knowledge', desc: 'Up-to-date understanding of applicable rules, procedures and requirements.' },
  { icon: Landmark, title: 'Government & Industry Liaison', desc: 'Effective coordination with competent authorities and relevant bodies.' },
  { icon: Eye, title: 'Transparent Process', desc: 'Clear communication and visibility at every stage of engagement.' },
  { icon: HeartHandshake, title: 'Client-Centric Service', desc: 'Solutions tailored to your needs with dedicated attention and support.' },
  { icon: FileText, title: 'Efficient Documentation', desc: 'Accurate preparation and management of required documents and records.' },
  { icon: Route, title: 'End-to-End Assistance', desc: 'Support from initial assessment through execution and final delivery.' },
];

export default function WhyMRG() {
  const ref = useReveal();

  return (
    <div className="page-enter why-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">WHY MRG</span>
          <h1 className="page-hero__title">Why Choose MRG</h1>
          <p className="page-hero__subtitle">
            At MRG, we combine regulatory knowledge, practical experience and professional
            coordination to simplify complex compliance and approval processes.
          </p>
        </div>
      </section>

      <section className="section" ref={ref}>
        <div className="container">
          <div className="why-page__grid">
            {reasons.map((r, i) => (
              <div key={i} className="why-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="why-card__icon">
                  <r.icon size={22} strokeWidth={1.75} />
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="why-page__cta reveal">
            <Link to="/consultation" className="btn btn-primary">
              Get a Consultation
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
