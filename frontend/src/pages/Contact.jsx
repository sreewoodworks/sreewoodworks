import { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  'Modular Kitchen',
  'Wardrobes',
  'TV Unit',
  'Doors & Windows',
  'Office Furniture',
  'Custom Carpentry',
  'Other',
];

function validate(fields) {
  const errs = {};
  if (!fields.name.trim())                         errs.name    = 'Please enter your name.';
  if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone))  errs.phone   = 'Enter a valid phone number.';
  if (!fields.service)                             errs.service = 'Please select a service.';
  if (fields.message.trim().length < 10)           errs.message = 'Message must be at least 10 characters.';
  return errs;
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent,   setSent]   = useState(false);

  const onChange = e => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: undefined }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Contact</span>
          </nav>
          <h1>Get in Touch</h1>
          <p>Ready to start your project? Reach out — we'll respond within a few hours.</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Info */}
            <div className="contact-info" data-reveal="left">
              <h3>We're Here to Help</h3>
              <p>Whether you have a clear plan or just an idea — talk to us. Our design team will guide you from concept to completion.</p>
              <ul className="ci-list">
                <li className="ci-item">
                  <div className="ci-icon">📞</div>
                  <div className="ci-text">
                    <strong>Phone</strong>
                    <span><a href="tel:+919876543210" style={{ color: 'inherit' }}>+91 98765 43210</a></span>
                  </div>
                </li>
                <li className="ci-item">
                  <div className="ci-icon">📧</div>
                  <div className="ci-text">
                    <strong>Email</strong>
                    <span><a href="mailto:info@woodcraft.in" style={{ color: 'inherit' }}>info@woodcraft.in</a></span>
                  </div>
                </li>
                <li className="ci-item">
                  <div className="ci-icon">📍</div>
                  <div className="ci-text">
                    <strong>Showroom</strong>
                    <span>Plot 42, Road No. 12, Banjara Hills, Hyderabad — 500034</span>
                  </div>
                </li>
                <li className="ci-item">
                  <div className="ci-icon">🕒</div>
                  <div className="ci-text">
                    <strong>Working Hours</strong>
                    <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
                  </div>
                </li>
              </ul>
              <div className="ci-social">
                {[
                  { label: 'Facebook',  href: '#',                                          icon: '📘' },
                  { label: 'Instagram', href: '#',                                          icon: '📸' },
                  { label: 'WhatsApp',  href: 'https://wa.me/919876543210',                  icon: '💬' },
                  { label: 'YouTube',   href: '#',                                          icon: '▶️' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="soc-btn" aria-label={s.label} target="_blank" rel="noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap" data-reveal="right">
              <h3>Send Us a Message</h3>
              <p>Fill in the details below and we'll get back to you within a few hours with a personalised quote.</p>

              {sent ? (
                <div className="form-success show">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will contact you within a few hours to discuss your project.</p>
                  <a href="https://wa.me/919876543210?text=Hi%2C%20I%20just%20submitted%20your%20contact%20form!" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                    💬 Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="form-row-2">
                    <div className={`form-group${errors.name ? ' invalid' : ''}`}>
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="Rajesh Mehta" value={fields.name} onChange={onChange} />
                      <span className="err">{errors.name}</span>
                    </div>
                    <div className={`form-group${errors.phone ? ' invalid' : ''}`}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={fields.phone} onChange={onChange} />
                      <span className="err">{errors.phone}</span>
                    </div>
                  </div>

                  <div className={`form-group${errors.service ? ' invalid' : ''}`}>
                    <label htmlFor="service">Service Required *</label>
                    <select id="service" name="service" value={fields.service} onChange={onChange}>
                      <option value="">— Select a Service —</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="err">{errors.service}</span>
                  </div>

                  <div className={`form-group${errors.message ? ' invalid' : ''}`}>
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your project — room size, style preference, budget range..."
                      value={fields.message}
                      onChange={onChange}
                    />
                    <span className="err">{errors.message}</span>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">Find Us</span>
            <h2>Visit Our Showroom</h2>
            <p>Come see our full-size display kitchen, wardrobe, and furniture samples in person.</p>
            <div className="underline" />
          </div>
          <div className="map-wrap" data-reveal>
            <iframe
              title="WoodCraft Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2645774937!2d78.4260613!3d17.4282489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d01dca29dd%3A0x2c1f97dd3b36eccc!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label-tag">Ready to Begin?</span>
          <h2 style={{ marginBottom: '0.75rem' }}>Let's Build Something Beautiful</h2>
          <p style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>Call us directly or ping us on WhatsApp for a quick response. We're available 6 days a week.</p>
          <div className="contact-cta-row">
            <a href="tel:+919876543210" className="btn btn-dark btn-lg">📞 Call Now: +91 98765 43210</a>
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20quote%20for%20my%20carpentry%20project." target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
