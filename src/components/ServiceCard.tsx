import { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import './ServiceCard.css';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="service-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service-card__icon">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
    </div>
  );
}
