import { useReveal } from '../hooks/useReveal';
import './ProcessSection.css';

const steps = [
  {
    num: '01',
    title: 'Understand Your Needs',
    desc: 'We listen to your requirements and assess your case.',
  },
  {
    num: '02',
    title: 'Plan & Strategize',
    desc: 'We design a customised solution for your business.',
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'We handle the process with accuracy and transparency.',
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'You get results with peace of mind.',
  },
];

export default function ProcessSection() {
  const ref = useReveal();

  return (
    <section className="process section" ref={ref}>
      <div className="container">
        <div className="process__header reveal">
          <span className="section-label">OUR PROCESS</span>
          <h2 className="section-title">Simple Steps to Get Started</h2>
          <p className="section-subtitle">
            A streamlined approach to deliver results, faster.
          </p>
        </div>

        <div className="process__timeline">
          <div className="process__line" aria-hidden="true" />
          {steps.map((step, i) => (
            <div
              key={i}
              className="process__step reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="process__num">{step.num}</div>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
