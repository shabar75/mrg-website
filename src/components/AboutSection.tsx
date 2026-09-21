import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Network, HeartHandshake } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import './AboutSection.css';

const features = [
  { icon: Users, label: 'Experienced\nTeam' },
  { icon: BookOpen, label: 'In-depth\nKnowledge' },
  { icon: Network, label: 'Strong Govt. &\nIndustry Network' },
  { icon: HeartHandshake, label: 'Client-Centric\nApproach' },
];

export default function AboutSection() {
  const ref = useReveal();

  return (
    <section className="about-home section" ref={ref}>
      <div className="container about-home__grid">
        <div className="about-home__visual reveal">
          <div className="about-home__image">
            <div className="about-home__image-bg" />
            <div className="about-home__image-text">
              <span>Your Trusted</span>
              <span>Partner in</span>
              <span>Compliance &amp;</span>
              <span>Business Support</span>
            </div>
          </div>
        </div>

        <div className="about-home__content reveal">
          <span className="section-label">ABOUT MRG</span>
          <h2 className="section-title">Expertise. Integrity. Results.</h2>
          <p className="about-home__text">
            MRG is a professional consultation service provider dedicated to helping
            businesses and individuals meet their legal and regulatory obligations.
          </p>
          <p className="about-home__text">
            We specialize in compliance, liaising with competent authorities, licensing
            support and raw data processing, offering reliable, efficient and personalized
            solutions.
          </p>

          <div className="about-home__features">
            {features.map((f, i) => (
              <div key={i} className="about-home__feature">
                <div className="about-home__feature-icon">
                  <f.icon size={18} strokeWidth={1.75} />
                </div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn btn-outline about-home__btn">
            Learn More About Us
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
