import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div className="cta__content">
          <h2 className="cta__title">Ready to Simplify Your Compliance?</h2>
          <p className="cta__text">
            Let's discuss your requirements. Our team is ready to support you with
            professional, transparent and efficient solutions.
          </p>
        </div>
        <Link to="/consultation" className="btn btn-gold cta__btn">
          Get a Consultation
          <ArrowRight size={18} className="btn-arrow" />
        </Link>
      </div>
    </section>
  );
}
