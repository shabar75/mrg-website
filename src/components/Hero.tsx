import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Building2, Database, Handshake } from 'lucide-react';
import './Hero.css';

const features = [
  { icon: Shield, label: 'Regulatory\nCompliance' },
  { icon: Building2, label: 'Government\nLiaison' },
  { icon: Database, label: 'Data Processing\n& Support' },
  { icon: Handshake, label: 'End-to-End\nAssistance' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__diagonal" aria-hidden="true" />
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            YOUR BUSINESS &nbsp;|&nbsp; OUR EXPERTISE
          </p>
          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Compliance &amp; Liaisoning<br />
            Solutions for a Stronger<br />
            <span className="text-gold">Tomorrow</span>
          </h1>
          <p className="hero__desc animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            MRG provides end-to-end consultation services to businesses and houses,
            helping you navigate compliance, secure approvals and liaise with competent
            authorities — efficiently, transparently and professionally.
          </p>

          <div className="hero__features animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            {features.map((f, i) => (
              <div key={i} className="hero__feature">
                <div className="hero__feature-icon">
                  <f.icon size={20} strokeWidth={1.75} />
                </div>
                <span className="hero__feature-label">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
            <Link to="/consultation" className="btn btn-primary hero__cta">
              Let's Work Together
              <ArrowRight size={18} className="btn-arrow" />
            </Link>
          </div>
        </div>

        <div className="hero__visual animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="hero__image-wrap">
            <div className="hero__image">
              <div className="hero__image-bg" />
              <div className="hero__image-overlay">
                <div className="hero__overlay-text">
                  <span>Navigating</span>
                  <span>Regulations.</span>
                  <span>Building</span>
                  <span>Your Growth.</span>
                  <div className="hero__overlay-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
