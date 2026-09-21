import { useState } from 'react';
import type { FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import './Consultation.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  preferredContact: string;
}

const services = [
  'Compliance Management',
  'Government Liaison',
  'Licensing Services',
  'Raw Data Processing',
  'Business Consultation',
  'Advisory & Support',
  'Other',
];

const initial: FormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  preferredContact: 'Email',
};

export default function Consultation() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = 'Please enter your full name';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a valid phone number';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please provide more details (min 10 characters)';
    if (form.message.trim().length > 2000) e.message = 'Message is too long (max 2000 characters)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="page-enter consultation-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">CONSULTATION</span>
          <h1 className="page-hero__title">Let's Discuss Your Requirements</h1>
          <p className="page-hero__subtitle">
            Tell us about your requirements and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container consultation-page__wrap">
          {status === 'success' ? (
            <div className="consultation-success">
              <CheckCircle size={48} className="consultation-success__icon" />
              <h2>Thank you</h2>
              <p>
                Your consultation request has been submitted successfully. Our team will contact you shortly.
              </p>
              <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className="consultation-form" onSubmit={handleSubmit} noValidate>
              {status === 'error' && (
                <div className="consultation-alert consultation-alert--error" role="alert">
                  <AlertCircle size={20} />
                  <span>We couldn't submit your request. Please try again or contact us directly at info@mrgsolutions.in</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    aria-invalid={!!errors.fullName}
                    autoComplete="name"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={!!errors.phone}
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Service Required *</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <span className="form-error">{errors.service}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="preferredContact">Preferred Contact Method</label>
                  <select
                    id="preferredContact"
                    value={form.preferredContact}
                    onChange={(e) => handleChange('preferredContact', e.target.value)}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Either">Either</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message / Query *</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="Briefly describe your requirements..."
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary consultation-form__submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Consultation Request
                    <Send size={16} className="btn-arrow" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
