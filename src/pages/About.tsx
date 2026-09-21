import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, Users, Shield, Handshake } from 'lucide-react';
import CTA from '../components/CTA';
import { useReveal } from '../hooks/useReveal';
import './About.css';

export default function About() {
  const ref = useReveal();

  return (
    <div className="page-enter about-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">ABOUT MRG</span>
          <h1 className="page-hero__title">Who We Are</h1>
          <p className="page-hero__subtitle">
            Professional compliance, liaison and business support solutions built on expertise, integrity and results.
          </p>
        </div>
      </section>

      <section className="section" ref={ref}>
        <div className="container about-page__content">
          <div className="about-page__block reveal">
            <h2>About MRG</h2>
            <p>
              MRG is a professional consultation service provider dedicated to helping businesses
              and individuals meet their legal and regulatory obligations. We specialize in
              compliance management, liaising with competent authorities, licensing support and
              raw data processing.
            </p>
            <p>
              Our approach is practical, transparent and client-focused. We work closely with
              you to understand requirements, design appropriate solutions and execute with care —
              so you can focus on growing your business.
            </p>
          </div>

          <div className="about-page__grid reveal">
            <div className="about-page__card">
              <Target size={28} className="about-page__card-icon" />
              <h3>What We Do</h3>
              <p>
                End-to-end support for regulatory compliance, government liaison, licensing,
                documentation, data processing and strategic business consultation.
              </p>
            </div>
            <div className="about-page__card">
              <Eye size={28} className="about-page__card-icon" />
              <h3>Our Approach</h3>
              <p>
                We listen first, plan carefully and execute with accuracy and transparency.
                Every engagement is tailored to the client's specific needs and context.
              </p>
            </div>
            <div className="about-page__card">
              <Award size={28} className="about-page__card-icon" />
              <h3>Our Expertise</h3>
              <p>
                Deep knowledge of regulatory frameworks, strong coordination with authorities
                and practical experience across multiple industries and business types.
              </p>
            </div>
            <div className="about-page__card">
              <Handshake size={28} className="about-page__card-icon" />
              <h3>Our Commitment</h3>
              <p>
                Reliable service, clear communication and professional support at every stage.
                We treat your compliance and approval needs with the seriousness they deserve.
              </p>
            </div>
          </div>

          <div className="about-page__why reveal">
            <h2>Why Businesses Choose MRG</h2>
            <ul className="about-page__list">
              <li><Users size={18} /> Experienced and dedicated team</li>
              <li><Shield size={18} /> Strong focus on regulatory accuracy</li>
              <li><Handshake size={18} /> Client-centric and transparent process</li>
              <li><Target size={18} /> End-to-end assistance from start to finish</li>
            </ul>
            <Link to="/consultation" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
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
