import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Factory, Truck, Building, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import './IndustriesSection.css';

const industries = [
  { icon: Wheat, label: 'Agriculture &\nHorticulture' },
  { icon: Factory, label: 'Manufacturing\n& Processing' },
  { icon: Truck, label: 'Logistics &\nWarehousing' },
  { icon: Building, label: 'Real Estate &\nConstruction' },
  { icon: ShoppingBag, label: 'Retail &\nTrading' },
  { icon: MoreHorizontal, label: '& More' },
];

export default function IndustriesSection() {
  const ref = useReveal();

  return (
    <section className="industries section" ref={ref}>
      <div className="container">
        <div className="industries__grid">
          <div className="industries__intro reveal">
            <span className="section-label">INDUSTRIES WE SERVE</span>
            <h2 className="section-title">Supporting a Wide Range<br />of Businesses</h2>
            <p className="section-subtitle">
              We cater to diverse industries, offering customized solutions for your unique needs.
            </p>
            <Link to="/consultation" className="btn btn-primary industries__btn">
              View Industries
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </div>
          <div className="industries__cards">
            {industries.map((ind, i) => (
              <div key={i} className="industry-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="industry-card__icon">
                  <ind.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="industry-card__label">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
