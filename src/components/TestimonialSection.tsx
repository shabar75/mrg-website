import { Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import './TestimonialSection.css';

const testimonials = [
  {
    quote: 'MRG made our licensing process seamless. Their team handled every detail with professionalism and kept us informed throughout.',
    name: 'Business Owner',
    role: 'Manufacturing Sector',
  },
  {
    quote: 'Clear communication, timely updates and genuine expertise. We trust MRG for all our compliance and liaison requirements.',
    name: 'Director',
    role: 'Logistics Company',
  },
  {
    quote: 'From documentation to final approvals, the process was transparent and efficient. Highly recommend their services.',
    name: 'Proprietor',
    role: 'Retail Business',
  },
];

export default function TestimonialSection() {
  const ref = useReveal();

  return (
    <section className="testimonials section" ref={ref}>
      <div className="container">
        <div className="testimonials__header reveal">
          <span className="section-label">CLIENT EXPERIENCES</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <Quote size={28} className="testimonial-card__quote" strokeWidth={1.5} />
              <p className="testimonial-card__text">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
