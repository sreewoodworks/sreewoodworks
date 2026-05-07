import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

/* ── about page icons ── */
const AboutIcon = ({ id, size = 24 }) => {
  const icons = {
    ruler: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d="M8 34V10l4 4-4 4"/><path d="M8 34h24l-4-4 4-4"/><path d="M8 34L32 8"/><path d="M15 27l2-2M22 20l2-2"/></svg>,
    bolt:  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><rect x="14" y="5" width="12" height="7" rx="1.5"/><path d="M12 12h16l3 20H9z"/><path d="M12 19h16M11 26h18"/></svg>,
    saw:   <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d="M10 32l5-5 14-14 4 4L19 31l-5 5-4-4z"/><path d="M29 13l3-5 3 3-5 3"/><path d="M10 36h8"/></svg>,
    shield:<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d="M20 4L7 9v10c0 8 6 13 13 16 7-3 13-8 13-16V9z"/><path d="M14 21l4 4 9-9"/></svg>,
    trophy:<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d="M13 6h14v12a7 7 0 01-14 0z"/><path d="M8 10H13M27 10h5M8 10a5 5 0 005 5M32 10a5 5 0 01-5 5"/><path d="M17 28v6M23 28v6M12 34h16"/></svg>,
    link:  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d="M15 14c-4 0-7 3-7 7s3 7 7 7h3"/><path d="M22 14h3c4 0 7 3 7 7s-3 7-7 7h-3"/><path d="M15 21h10"/></svg>,
    target:<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><circle cx="20" cy="20" r="14"/><circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="4"/></svg>,
  };
  return (
    <div style={{ width:'56px', height:'56px', border:'1.5px solid rgba(200,146,42,0.3)', borderRadius:'13px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', background:'rgba(200,146,42,0.07)', flexShrink:0 }}>
      {icons[id] || null}
    </div>
  );
};

/* ── animation tokens ── */
const ease      = [0.22, 1, 0.36, 1];
const fadeUp    = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  60 }, visible: { opacity: 1, x: 0 } };
const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const principles = [
  { id: 'ruler',  title: 'Design-First Approach',   desc: 'Every project starts with a detailed 3D render so you can visualise the end result before production begins.' },
  { id: 'bolt',   title: 'Factory-Tested Hardware', desc: 'We use only Hettich, Hafele & Blum fittings — brands trusted by premium European furniture makers.' },
  { id: 'saw',    title: 'In-House Production',     desc: 'All cutting, drilling, and finishing happens in our own workshop — no outsourcing, no surprises.' },
  { id: 'shield', title: 'Warranty on Every Job',  desc: '5-year structural warranty on all fixed furniture. Hardware defects replaced free within warranty period.' },
];

const values = [
  { id: 'trophy', title: 'Quality First',  desc: 'We never compromise on material grade or finish quality. Every joint, every panel, every coat of paint is inspected before delivery.' },
  { id: 'link',   title: 'Client Trust',   desc: 'Transparent pricing, clear timelines, and honest communication. No hidden charges — what we quote is what you pay.' },
  { id: 'target', title: 'Precision Work', desc: 'Our craftsmen hold tolerances of ±1mm. Every measurement is verified three times before cutting begins.' },
];

const badges = [
  { icon: '✅', text: 'ISO 9001 Certified Studio' },
  { icon: '🌳', text: 'FSC Certified Wood Sources' },
  { icon: '🏠', text: 'Free Home Consultation' },
];

/* ── animated counter ── */
function CountBox({ target, suffix, label }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;
    let n = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n + suffix;
      if (n >= target) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target, suffix]);

  return (
    <motion.div
      className="stat-box"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="big-num"><span ref={ref}>0{suffix}</span></div>
      <div className="desc">{label}</div>
    </motion.div>
  );
}

/* ── main component ── */
export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="svc-hero">
        <motion.div
          className="svc-hero-bg"
          style={{ backgroundImage: 'url(/ai-images/wardrobe.png)' }}
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
              <span>About</span>
            </motion.nav>
            <motion.span className="label-tag" variants={fadeUp} style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'inline-block' }}>
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp}>
              About Sree Wood Works
            </motion.h1>
            <motion.p variants={fadeUp}>
              Fifteen years of turning raw wood into spaces people love to live and work in.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── Intro / Our Story ── */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-img-wrap"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="about-main-img">🪵</div>
              <div className="about-badge">
                <div className="num">15+</div>
                <div className="lbl">Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="label-tag">Our Story</span>
              <h2>Crafting Spaces in Chennai</h2>
              <p>
                Sree Wood Works was founded by a master carpenter with a passion for quality and a vision to make
                premium furniture accessible to every home. Starting from a modest workshop in Kottivakkam, Chennai,
                we have grown steadily — built entirely on craftsmanship and word-of-mouth trust.
              </p>
              <p>
                From modular kitchens to wardrobes, corporate offices, and bespoke handcrafted pieces — our mission
                has never changed: deliver furniture that lasts generations, at a price that makes sense.
              </p>
              <p>
                Every project begins with a free home visit, a detailed 3D design, and a transparent cost breakdown.
                We believe you should see exactly what you're getting before a single nail is driven.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                <Link to="/products" className="btn btn-primary">View Our Work</Link>
                <Link to="/contact"   className="btn btn-ghost">Get in Touch</Link>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {badges.map(b => (
                  <span key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Working Principles ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">Why We're Different</span>
            <h2>Our Working Principles</h2>
            <div className="underline" />
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '860px', margin: '0 auto' }}>
            {principles.map((p, i) => (
              <motion.div
                className="value-pt"
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <AboutIcon id={p.id} />
                <div className="vp-text">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">By the Numbers</span>
            <h2>Experience That Speaks</h2>
            <div className="underline" />
          </motion.div>
          <div className="stats-row">
            <CountBox target={1200} suffix="+" label="Projects Completed" />
            <CountBox target={25}   suffix="+" label="Years in Business"  />
            <CountBox target={50}   suffix="+" label="Skilled Craftsmen"  />
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">What We Stand For</span>
            <h2>Our Core Values</h2>
            <div className="underline" />
          </motion.div>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div
                className="val-card"
                key={v.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <AboutIcon id={v.id} />
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="cta-banner"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Let's Work Together</span>
          <h2>Start Your Project with Us</h2>
          <p>Book a free consultation today. Our designers will visit your space, understand your needs, and deliver a detailed design + quote within 24 hours.</p>
          <div className="cta-actions">
            <Link to="/contact"   className="btn btn-primary btn-lg">Book Free Visit</Link>
            <Link to="/products" className="btn btn-outline btn-lg">See Our Products</Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
