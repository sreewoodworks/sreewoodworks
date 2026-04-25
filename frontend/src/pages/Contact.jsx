import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── animation tokens ── */
const ease      = [0.22, 1, 0.36, 1];
const fadeUp    = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  60 }, visible: { opacity: 1, x: 0 } };
const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const SERVICES = ['Modular Kitchen', 'Wardrobes', 'TV Unit', 'Doors & Windows', 'Office Furniture', 'Custom Carpentry', 'Other'];

const contactItems = [
  { icon: '📞', label: 'Phone',         value: <a href="tel:+919876543210" style={{ color: 'inherit' }}>+91 98765 43210</a> },
  { icon: '📧', label: 'Email',         value: <a href="mailto:info@woodcraft.in" style={{ color: 'inherit' }}>info@woodcraft.in</a> },
  { icon: '📍', label: 'Showroom',      value: 'Plot 42, Road No. 12, Banjara Hills, Hyderabad — 500034' },
  { icon: '🕒', label: 'Working Hours', value: 'Monday – Saturday: 9:00 AM – 7:00 PM' },
];

const socials = [
  { label: 'Facebook',  href: '#',                          icon: '📘' },
  { label: 'Instagram', href: '#',                          icon: '📸' },
  { label: 'WhatsApp',  href: 'https://wa.me/919876543210', icon: '💬' },
  { label: 'YouTube',   href: '#',                          icon: '▶️' },
];

/* ── form validation ── */
function validate(fields) {
  const errs = {};
  if (!fields.name.trim())                        errs.name    = 'Please enter your name.';
  if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone)) errs.phone   = 'Enter a valid phone number.';
  if (!fields.service)                            errs.service = 'Please select a service.';
  if (fields.message.trim().length < 10)          errs.message = 'Message must be at least 10 characters.';
  return errs;
}

/* ── main component ── */
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
      {/* ── Hero ── */}
      <div className="svc-hero">
        <motion.div
          className="svc-hero-bg"
          style={{ backgroundImage: 'url(/ai-images/office.png)' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="svc-hero-overlay" />
        <div className="container svc-hero-content">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.nav className="breadcrumb" variants={fadeUp}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
              <span className="sep">›</span>
              <span>Contact</span>
            </motion.nav>
            <motion.span className="label-tag" variants={fadeUp} style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'inline-block' }}>
              Reach Out
            </motion.span>
            <motion.h1 variants={fadeUp}>
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUp}>
              Ready to start your project? Reach out — we'll respond within a few hours.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── Contact Section ── */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">

            {/* Info Panel */}
            <motion.div
              className="contact-info"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <h3>We're Here to Help</h3>
              <p>Whether you have a clear plan or just an idea — talk to us. Our design team will guide you from concept to completion.</p>

              <ul className="ci-list">
                {contactItems.map((item, i) => (
                  <motion.li
                    className="ci-item"
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
                  >
                    <div className="ci-icon">{item.icon}</div>
                    <div className="ci-text">
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="ci-social">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    className="soc-btn"
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: 0.6 + i * 0.08 }}
                    whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Form Panel */}
            <motion.div
              className="contact-form-wrap"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <h3>Send Us a Message</h3>
              <p>Fill in the details below and we'll get back to you within a few hours with a personalised quote.</p>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    className="form-success show"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1,    y: 0  }}
                    exit={{    opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <div className="success-icon">✅</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. Our team will contact you within a few hours to discuss your project.</p>
                    <a
                      href="https://wa.me/919876543210?text=Hi%2C%20I%20just%20submitted%20your%20contact%20form!"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp"
                    >
                      💬 Continue on WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{    opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="form-row-2">
                      <div className={`form-group${errors.name ? ' invalid' : ''}`}>
                        <label htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" placeholder="Rajesh Mehta"
                          value={fields.name} onChange={onChange} />
                        <span className="err">{errors.name}</span>
                      </div>
                      <div className={`form-group${errors.phone ? ' invalid' : ''}`}>
                        <label htmlFor="phone">Phone Number *</label>
                        <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                          value={fields.phone} onChange={onChange} />
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

                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      Send Message →
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">Find Us</span>
            <h2>Visit Our Showroom</h2>
            <p>Come see our full-size display kitchen, wardrobe, and furniture samples in person.</p>
            <div className="underline" />
          </motion.div>
          <motion.div
            className="map-wrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <iframe
              title="WoodCraft Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2645774937!2d78.4260613!3d17.4282489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d01dca29dd%3A0x2c1f97dd3b36eccc!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="section"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label-tag">Ready to Begin?</span>
          <h2 style={{ marginBottom: '0.75rem' }}>Let's Build Something Beautiful</h2>
          <p style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
            Call us directly or ping us on WhatsApp for a quick response. We're available 6 days a week.
          </p>
          <div className="contact-cta-row">
            <motion.a
              href="tel:+919876543210"
              className="btn btn-dark btn-lg"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              📞 Call Now: +91 98765 43210
            </motion.a>
            <motion.a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20quote%20for%20my%20carpentry%20project."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-lg"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              💬 WhatsApp Us
            </motion.a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
