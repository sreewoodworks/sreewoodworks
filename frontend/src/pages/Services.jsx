import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import WhatsAppIcon from '../components/WhatsAppIcon';
import BorderedIcon from '../components/BorderedIcon';

/* ── animation tokens ── */
const ease    = [0.22, 1, 0.36, 1];
const fadeUp  = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const services = [
  {
    id: 'kitchen',
    icon: 'kitchen',
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
    icon: 'wardrobe',
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
    icon: 'tv',
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
    icon: 'windows',
    title: 'Doors & Windows',
    bg: '#DDD0C0',
    img: '/ai-images/doors_windows.png',
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
    icon: 'office',
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
    icon: 'carpentry',
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

const SvcStepIcon = ({ id }) => {
  const icons = {
    chat:     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M7 10h26a2 2 0 012 2v14a2 2 0 01-2 2H14l-7 4v-4a2 2 0 01-2-2V12a2 2 0 012-2z"/><path d="M13 18h14M13 23h9"/></svg>,
    design:   <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M27 7l6 6L15 31H9v-6L27 7z"/><path d="M24 10l6 6"/><path d="M9 35h22"/></svg>,
    material: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><rect x="7" y="9" width="26" height="5" rx="1.5"/><rect x="7" y="18" width="26" height="5" rx="1.5"/><rect x="7" y="27" width="26" height="5" rx="1.5"/></svg>,
    craft:    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M10 32l5-5 14-14 4 4L19 31l-5 5-4-4z"/><path d="M29 13l3-5 3 3-5 3"/><path d="M10 36h8"/></svg>,
    install:  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M6 21L20 9l14 12"/><path d="M11 19v15h18V19"/><path d="M16 34v-9h8v9"/></svg>,
  };
  return (
    <div style={{ width:'60px', height:'60px', border:'1.5px solid rgba(200,146,42,0.35)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', background:'rgba(200,146,42,0.07)', flexShrink:0 }}>
      {icons[id] || null}
    </div>
  );
};

const MatIcon = ({ id }) => {
  const icons = {
    teak: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 34V18" /><path d="M20 18C20 18 12 14 10 7c4 1 8 4 10 11z" /><path d="M20 18C20 18 28 14 30 7c-4 1-8 4-10 11z" />
        <path d="M20 24C20 24 14 21 12 15" /><path d="M20 24C20 24 26 21 28 15" />
        <ellipse cx="20" cy="35" rx="6" ry="2" />
      </svg>
    ),
    ply: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8"  width="28" height="5" rx="1" />
        <rect x="6" y="16" width="28" height="5" rx="1" />
        <rect x="6" y="24" width="28" height="5" rx="1" />
        <line x1="10" y1="13" x2="30" y2="13" strokeDasharray="3 2" strokeWidth="0.8" />
        <line x1="10" y1="21" x2="30" y2="21" strokeDasharray="3 2" strokeWidth="0.8" />
      </svg>
    ),
    mdf: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="26" height="26" rx="2" />
        <line x1="7" y1="16" x2="33" y2="16" /><line x1="7" y1="24" x2="33" y2="24" />
        <line x1="16" y1="7" x2="16" y2="33" /><line x1="24" y1="7" x2="24" y2="33" />
      </svg>
    ),
    laminate: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6l2.5 7h7.5l-6 4.5 2.5 7L20 21l-6.5 3.5 2.5-7L10 13h7.5z" />
        <circle cx="20" cy="20" r="13" strokeDasharray="4 3" strokeWidth="1" />
      </svg>
    ),
    wpc: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 28c2-4 4-6 6-6s4 4 6 4 4-5 6-5" />
        <rect x="7" y="10" width="26" height="18" rx="3" />
        <line x1="7" y1="18" x2="33" y2="18" strokeDasharray="3 2" strokeWidth="1" />
      </svg>
    ),
  };
  return icons[id] || null;
};

const materials = [
  { id: 'teak',     title: 'Teak Wood',           desc: 'Premium hardwood with natural grain. Termite-resistant and built for generations.',     bg: '#3D2B1F' },
  { id: 'ply',      title: 'Marine Plywood',       desc: 'BWR-grade moisture-resistant ply. The backbone of long-lasting kitchen & bath units.',  bg: '#4A3525' },
  { id: 'mdf',      title: 'MDF Board',            desc: 'Ultra-smooth surface for flawless high-gloss & matte finishes. Cost-effective choice.',  bg: '#352820' },
  { id: 'laminate', title: 'High-Gloss Laminates', desc: 'Scratch-resistant in 100+ colours. Easy to clean, impossible to ignore.',               bg: '#2C1F15' },
  { id: 'wpc',      title: 'WPC Boards',           desc: 'Wood-plastic composite — fully waterproof, eco-friendly, and dimensionally stable.',     bg: '#3A2818' },
];

const processSteps = [
  { step: '01', id: 'chat',     title: 'Free Consultation',  desc: 'We visit your space, take measurements, and understand your requirements and budget in detail.' },
  { step: '02', id: 'design',   title: '3D Design',          desc: 'Our designers create a photorealistic 3D render so you can visualise the result before a single nail is driven.' },
  { step: '03', id: 'material', title: 'Material Selection', desc: 'Choose from our curated range of premium woods, laminates, and European hardware fittings at our showroom.' },
  { step: '04', id: 'craft',    title: 'Manufacturing',      desc: 'All cutting, drilling and finishing happens in our own 8,000 sq.ft workshop. No outsourcing, no surprises.' },
  { step: '05', id: 'install',  title: 'Clean Installation', desc: 'Our team installs on-site with minimal disruption to your routine. Site cleaned before we leave.' },
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
        <div className="ps-icon"><BorderedIcon icon={item.id === 'chat' ? 'whatsapp' : item.id} /></div>
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
                  <div style={{ width: '64px', height: '64px', marginBottom: '1.25rem', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.9)', padding: '14px', backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.06)' }}>
                    <MatIcon id={m.id} />
                  </div>
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
          <motion.div
            style={{ textAlign: 'center', marginTop: '2rem' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <a
              href="https://maps.app.goo.gl/xspDJ6RNdctCrP8r9"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-lg"
            >
              ⭐ Read Our Google Reviews
            </a>
          </motion.div>
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
            <a href="tel:+919840486789" className="btn btn-outline btn-lg">📞 Call Now</a>
            <a href="https://wa.me/919840486789" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
