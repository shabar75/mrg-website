import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const ref = useReveal();

  return (
    <div className="page-enter contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">CONTACT</span>
          <h1 className="page-hero__title">Get in Touch</h1>
          <p className="page-hero__subtitle">
            We are here to help with your compliance, liaison and consultation needs.
          </p>
        </div>
      </section>

      <section className="section" ref={ref}>
        <div className="container">
          <div className="contact-page__grid">
            <div className="contact-card reveal">
              <div className="contact-card__icon"><Phone size={24} /></div>
              <h3>Phone</h3>
              <a href="tel:+919086000911">+91 90880 00911</a>
              <p>Available during business hours</p>
            </div>
            <div className="contact-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="contact-card__icon"><Mail size={24} /></div>
              <h3>Email</h3>
              <a href="mailto:info@mrgsolutions.in">info@mrgsolutions.in</a>
              <p>We respond within 1–2 business days</p>
            </div>
            <div className="contact-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="contact-card__icon"><MapPin size={24} /></div>
              <h3>Location</h3>
              <p className="contact-card__loc">Srinagar, Jammu &amp; Kashmir</p>
              <p>Serving clients across India</p>
            </div>
          </div>

          <div className="contact-page__cta reveal">
            <h2>Prefer a structured discussion?</h2>
            <p>Share your requirements through our consultation form and our team will get back to you.</p>
            <Link to="/consultation" className="btn btn-primary">
              Get a Consultation
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
