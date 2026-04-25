import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ── animation tokens ── */
const ease    = [0.22, 1, 0.36, 1];
const fadeUp  = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const services = [
  {
    id: 'kitchen',
    icon: '🍳',
    title: 'Modular Kitchen',
    bg: '#F5F0E0',
    img: '/ai-images/kitchen.png',
    badge: 'Most Popular',
    desc: 'A well-designed kitchen is the heart of every home. Our modular kitchens combine intelligent storage, durable materials, and stunning aesthetics to create a cooking space you\'ll love every day.',
    features: [
      'L-shaped, U-shaped, straight & island layouts',
      'Soft-close hinges & drawer systems',
      'Premium laminate, acrylic & membrane finishes',
      'Granite, quartz & engineered stone countertops',
      'Built-in chimney, sink & appliance integration',
      '10-year structural warranty',
    ],
    price: 'Starting ₹1.2L',
  },
  {
    id: 'wardrobe',
    icon: '🚪',
    title: 'Wardrobes',
    bg: '#EDE8D5',
    img: '/ai-images/wardrobe.png',
    badge: null,
    desc: 'From walk-in closets to sliding door wardrobes — every wardrobe we build is a masterclass in organisation. Custom compartments, pull-out trays, and premium hardware for a seamless experience.',
    features: [
      'Sliding, hinged & walk-in configurations',
      'Custom internal layouts — shelves, drawers, racks',
      'Mirror panels & backlit interiors available',
      'Anti-rust fittings & soft-close mechanisms',
      'Floor-to-ceiling design for maximum space',
      '8-year hardware warranty',
    ],
    price: 'Starting ₹55,000',
  },
  {
    id: 'tv',
    icon: '📺',
    title: 'TV Units',
    bg: '#E8DDD0',
    img: '/ai-images/kitchen.png', // Reusing kitchen or generating more if needed, but for now I'll use what's available
    badge: 'Trending',
    desc: 'Your living room deserves a focal point that\'s both functional and beautiful. Our TV units are crafted to house your entertainment setup while doubling as statement furniture.',
    features: [
      'Wall-mounted & floor-standing options',
      'Cable management built-in',
      'Open shelving, cabinets & display niches',
      'Backlit panel options',
      'Custom widths from 4ft to full wall',
      'Matching side tables available',
    ],
    price: 'Starting ₹25,000',
  },
  {
    id: 'doors',
    icon: '🪟',
    title: 'Doors & Windows',
    bg: '#DDD0C0',
    img: '/ai-images/custom.png',
    badge: null,
    desc: 'First impressions start at the door. We craft solid wood and engineered wood doors and windows that combine security, insulation, and beauty — built to last decades.',
    features: [
      'Solid teak, mango & engineered wood',
      'Panel, flush & carved designs',
      'PU finish, enamel & natural polish',
      'UPVC & aluminium windows available',
      'Custom sizes for any opening',
      'Anti-termite treatment included',
    ],
    price: 'Starting ₹8,000/door',
  },
  {
    id: 'office',
    icon: '💼',
    title: 'Office Furniture',
    bg: '#D4C5B0',
    img: '/ai-images/office.png',
    badge: null,
    desc: 'A productive workspace starts with the right furniture. We design and build office interiors that reflect your brand — from reception desks to collaborative workstations.',
    features: [
      'Executive desks, workstations & cabins',
      'Reception counters & front desks',
      'Conference tables (6 to 24 seater)',
      'Storage walls & filing units',
      'Cable-managed workstation clusters',
      'Corporate branding integration',
    ],
    price: 'Starting ₹80,000/workspace',
  },
  {
    id: 'custom',
    icon: '🪵',
    title: 'Custom Carpentry',
    bg: '#C8BDA8',
    img: '/ai-images/custom.png',
    badge: 'New',
    desc: 'Have a vision that doesn\'t fit a standard category? Our custom carpentry service brings any idea to life — from heirloom furniture to architectural millwork.',
    features: [
      'Bespoke dining tables & beds',
      'Staircases, panelling & ceilings',
      'Pooja mandirs & display units',
      'Children\'s furniture & study units',
      '3D design visualisation before production',
      'Any wood species, any finish',
    ],
    price: 'Custom quote',
  },
];

const materials = [
  { icon: '🌲', title: 'Teak Wood',           desc: 'Premium hardwood with natural grain. Termite-resistant and built for generations.',     bg: '#3D2B1F' },
  { icon: '🪵', title: 'Marine Plywood',       desc: 'BWR-grade moisture-resistant ply. The backbone of long-lasting kitchen & bath units.',  bg: '#4A3525' },
  { icon: '🔲', title: 'MDF Board',            desc: 'Ultra-smooth surface for flawless high-gloss & matte finishes. Cost-effective choice.',  bg: '#352820' },
  { icon: '✨', title: 'High-Gloss Laminates', desc: 'Scratch-resistant in 100+ colours. Easy to clean, impossible to ignore.',               bg: '#2C1F15' },
  { icon: '💧', title: 'WPC Boards',           desc: 'Wood-plastic composite — fully waterproof, eco-friendly, and dimensionally stable.',     bg: '#3A2818' },
];

const processSteps = [
  { step: '01', icon: '🤝', title: 'Free Consultation',  desc: 'We visit your space, take measurements, and understand your requirements and budget in detail.' },
  { step: '02', icon: '✏️', title: '3D Design',          desc: 'Our designers create a photorealistic 3D render so you can visualise the result before a single nail is driven.' },
  { step: '03', icon: '🌳', title: 'Material Selection', desc: 'Choose from our curated range of premium woods, laminates, and European hardware fittings at our showroom.' },
  { step: '04', icon: '🪚', title: 'Manufacturing',      desc: 'All cutting, drilling and finishing happens in our own 8,000 sq.ft workshop. No outsourcing, no surprises.' },
  { step: '05', icon: '🏠', title: 'Clean Installation', desc: 'Our team installs on-site with minimal disruption to your routine. Site cleaned before we leave.' },
];

const miniTestimonials = [
  { name: 'Ananya S.', loc: 'Jubilee Hills', stars: 5, text: 'The modular kitchen exceeded every expectation. Delivery was on day 18, exactly as promised. Stunning finish.' },
  { name: 'Kiran R.',  loc: 'Gachibowli',   stars: 5, text: 'Floor-to-ceiling wardrobe looks absolutely stunning. The LED lighting suggestion was brilliant — love it every day.' },
];

/* ── ProcessStep sub-component ── */
function ProcessStep({ item, index, isLast }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  return (
    <div className="process-step-wrapper" ref={ref}>
      <motion.div
        className={`process-step${isLeft ? ' step-left' : ' step-right'}`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
      >
        <div className="ps-icon">{item.icon}</div>
        <div className="ps-body">
          <div className="ps-num">STEP {item.step}</div>
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
      </motion.div>
      {!isLast && (
        <motion.div
          className="process-connector"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.65 }}
        />
      )}
    </div>
  );
}

/* ── ServiceBlock sub-component ── */
function ServiceBlock({ s, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      className={`service-block${!isLeft ? ' reverse' : ''}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: 0.1 }}
      id={s.id}
    >
      <div className="sb-img">
        <img src={s.img} alt={s.title} loading="lazy" />
      </div>
      <div className="sb-body">
        <span className="label-tag">{s.badge || 'Our Service'}</span>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
        <span className="sb-price">💰 {s.price}</span>
        <ul className="sb-features">
          {s.features.map(f => (
            <li key={f}><span className="chk">✓</span>{f}</li>
          ))}
        </ul>
        <Link to="/contact" className="btn btn-primary">Request a Quote →</Link>
      </div>
    </motion.div>
  );
}

/* ── main component ── */
export default function Services() {
  /* horizontal scroll */
  const hRef      = useRef(null);
  const hTrackRef = useRef(null);
  const [scrollDist, setScrollDist] = useState(0);

  useEffect(() => {
    const update = () => {
      if (hTrackRef.current)
        setScrollDist(hTrackRef.current.scrollWidth - window.innerWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress: hProg } = useScroll({ target: hRef, offset: ['start start', 'end end'] });
  const hX = useTransform(hProg, [0, 1], [0, -scrollDist]);

  /* scroll to service detail */
  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="svc-hero">
        <motion.div
          className="svc-hero-bg"
          style={{ backgroundImage: 'url(/ai-images/kitchen.png)' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="svc-hero-overlay" />
        <div className="container svc-hero-content">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.nav className="breadcrumb" variants={fadeUp}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
              <span className="sep">›</span>
              <span>Services</span>
            </motion.nav>
            <motion.span className="label-tag" variants={fadeUp} style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'inline-block' }}>
              Expert Solutions
            </motion.span>
            <motion.h1 variants={fadeUp}>
              Our Craft. Your Space.
            </motion.h1>
            <motion.p variants={fadeUp}>
              Custom carpentry &amp; furnishing solutions built to last — designed for the way you live.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Category Grid ── */}
      <section className="section">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">Browse Services</span>
            <h2>Six Ways We Transform Spaces</h2>
            <p>Click any category to jump to full details below.</p>
            <div className="underline" />
          </motion.div>

          <div className="svc-cat-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                className="svc-cat-card"
                onClick={() => scrollTo(s.id)}
                whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && scrollTo(s.id)}
              >
                <div className="svc-cat-ph">
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} loading="lazy" />
                </div>
                <div className="svc-cat-overlay" />
                <div className="svc-cat-info">
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '1.05rem' }}>{s.title}</h4>
                  <div className="svc-cat-cta">View Details →</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alternating Service Detail Blocks ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">Service Details</span>
            <h2>Everything You Need to Know</h2>
            <div className="underline" />
          </motion.div>

          {services.map((s, i) => (
            <ServiceBlock key={s.id} s={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── Horizontal Scroll — Materials ── */}
      <div ref={hRef} className="h-scroll-outer">
        <div className="h-scroll-sticky">
          <div className="h-scroll-header">
            <span className="h-scroll-tag">Premium Materials</span>
            <h2 style={{ color: '#fff', margin: '0.5rem 0 0' }}>Built with the Best</h2>
          </div>
          <div className="h-scroll-viewport">
            <motion.div className="h-scroll-track" ref={hTrackRef} style={{ x: hX }}>
              {materials.map(m => (
                <div
                  key={m.title}
                  className="h-scroll-item"
                  style={{ background: `linear-gradient(160deg, ${m.bg}, #1A0A02)`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 2rem' }}
                >
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{m.icon}</div>
                  <h3 style={{ color: '#fff', margin: '0 0 0.5rem', fontSize: '1.3rem' }}>{m.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="h-scroll-progress-wrap">
            <motion.div className="h-scroll-progress-bar" style={{ scaleX: hProg, transformOrigin: 'left' }} />
          </div>
        </div>
      </div>

      {/* ── Process Section ── */}
      <section className="section process-section">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">How We Work</span>
            <h2>From Vision to Reality</h2>
            <p>A transparent 5-step process — no surprises, no delays.</p>
            <div className="underline" />
          </motion.div>
          <div className="process-track">
            {processSteps.map((item, i) => (
              <ProcessStep key={item.step} item={item} index={i} isLast={i === processSteps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini Testimonials ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div className="section-head"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <span className="label-tag">Client Stories</span>
            <h2>What Our Clients Say</h2>
            <div className="underline" />
          </motion.div>
          <div className="svc-testimonials-row">
            {miniTestimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="tcard"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.15 }}
              >
                <div className="tc-stars">{'★'.repeat(t.stars)}</div>
                <p className="tc-text">"{t.text}"</p>
                <div className="tc-author">
                  <div className="tc-init">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span className="tc-loc">📍 {t.loc}</span>
                  </div>
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
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Get Started</span>
          <h2>Let's Build Your Dream Space</h2>
          <p>Book a free home visit and receive a detailed design + quote within 24 hours. No hidden charges — ever.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Free Visit</Link>
            <a href="tel:+919876543210" className="btn btn-outline btn-lg">📞 Call Now</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp</a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
