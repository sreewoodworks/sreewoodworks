import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

/* ── animation tokens ── */
const ease      = [0.22, 1, 0.36, 1];
const fadeUp    = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  60 }, visible: { opacity: 1, x: 0 } };
const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const principles = [
  { icon: '📐', title: 'Design-First Approach',   desc: 'Every project starts with a detailed 3D render so you can visualise the end result before production begins.' },
  { icon: '🔩', title: 'Factory-Tested Hardware', desc: 'We use only Hettich, Hafele & Blum fittings — brands trusted by premium European furniture makers.' },
  { icon: '🪚', title: 'In-House Production',     desc: 'All cutting, drilling, and finishing happens in our own workshop — no outsourcing, no surprises.' },
  { icon: '🛡️', title: 'Warranty on Every Job',  desc: '5-year structural warranty on all fixed furniture. Hardware defects replaced free within warranty period.' },
];

const values = [
  { icon: '🏆', title: 'Quality First',  desc: 'We never compromise on material grade or finish quality. Every joint, every panel, every coat of paint is inspected before delivery.' },
  { icon: '🤝', title: 'Client Trust',   desc: 'Transparent pricing, clear timelines, and honest communication. No hidden charges — what we quote is what you pay.' },
  { icon: '🎯', title: 'Precision Work', desc: 'Our craftsmen hold tolerances of ±1mm. Every measurement is verified three times before cutting begins.' },
];

const team = [
  { initial: 'R', name: 'Ravi Kumar',   role: 'Master Carpenter & Founder',  exp: '25+ years crafting premium furniture across South India.' },
  { initial: 'S', name: 'Sunita Reddy', role: 'Lead Interior Designer',       exp: 'B.Arch + 15 years designing residential & commercial spaces.' },
  { initial: 'A', name: 'Ajay Patil',   role: 'Workshop Head',                exp: 'Oversees 50+ craftsmen with a focus on quality control and on-time delivery.' },
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
              About WoodCraft
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
              <h2>Crafting Spaces Since 1999</h2>
              <p>
                WoodCraft was founded in 1999 by master carpenter Ravi Kumar in a modest workshop in Hyderabad's
                old city. Starting with a single lathe and a dream to make quality furniture accessible, we've grown
                into a 50-person studio with a fully equipped 8,000 sq.ft production facility in Nacharam.
              </p>
              <p>
                Over 1200 projects later — spanning modular kitchens, wardrobes, corporate offices, and bespoke
                handcrafted pieces — our mission remains the same: deliver furniture that lasts generations,
                at a price that makes sense.
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
                <div className="vp-icon">{p.icon}</div>
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
                <div className="vc-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">The People Behind the Wood</span>
            <h2>Meet Our Team</h2>
            <p>Passionate professionals who bring your vision to life with decades of combined expertise.</p>
            <div className="underline" />
          </motion.div>
          <div className="team-grid">
            {team.map((m, i) => (
              <motion.div
                className="team-card"
                key={m.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="team-img" style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #F5F5DC, #D4C5B0)' }}>
                  {m.initial}
                </div>
                <div className="team-body">
                  <h4>{m.name}</h4>
                  <div className="role">{m.role}</div>
                  <p>{m.exp}</p>
                </div>
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
