import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import WhatsAppIcon from '../components/WhatsAppIcon';
import BorderedIcon from '../components/BorderedIcon';

/* ─── Animation Variants ─── */
const ease = [0.22, 1, 0.36, 1];
const fadeUp  = { hidden: { opacity: 0, y: 48   }, visible: { opacity: 1, y: 0     } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ─── Home Icons (stroke-based SVG) ─── */
const HomeIcon = ({ id }) => {
  const icons = {
    design: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M27 7l6 6L15 31H9v-6L27 7z"/>
        <path d="M24 10l6 6"/>
        <path d="M9 35h22"/>
      </svg>
    ),
    material: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="7" y="9" width="26" height="5" rx="1.5"/>
        <rect x="7" y="18" width="26" height="5" rx="1.5"/>
        <rect x="7" y="27" width="26" height="5" rx="1.5"/>
      </svg>
    ),
    craft: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M10 32l5-5 14-14 4 4L19 31l-5 5-4-4z"/>
        <path d="M29 13l3-5 3 3-5 3"/>
        <path d="M10 36h8"/>
      </svg>
    ),
    install: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M6 21L20 9l14 12"/>
        <path d="M11 19v15h18V19"/>
        <path d="M16 34v-9h8v9"/>
      </svg>
    ),
    hammer: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M10 32l14-14"/>
        <path d="M22 10l8 8-4 4-8-8z"/>
        <path d="M22 10l-4-4-6 6 4 4"/>
        <path d="M8 36l4-4"/>
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M20 33V17"/>
        <path d="M20 17C20 17 11 12 9 5c5 1 9 5 11 12z"/>
        <path d="M20 21C20 21 29 16 31 9c-5 1-9 5-11 12z"/>
        <path d="M10 34h20"/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="6" y="9" width="28" height="26" rx="3"/>
        <path d="M6 17h28"/>
        <path d="M14 6v6M26 6v6"/>
        <path d="M14 24h2M20 24h2M26 24h2"/>
        <path d="M14 30h2M20 30h2"/>
      </svg>
    ),
    custom: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <circle cx="20" cy="20" r="4"/>
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4"/>
        <path d="M12 12l2.8 2.8M25.2 25.2L28 28M28 12l-2.8 2.8M14.8 25.2L12 28"/>
      </svg>
    ),
  };
  return icons[id] || null;
};

/* ─── Data ─── */
const services = [
  { icon: 'kitchen', label: 'Kitchen',  title: 'Modular Kitchen',  desc: 'Smart, space-saving kitchen designs with premium hardware and laminates.', badge: 'Popular',  img: '/ai-images/kitchen.png' },
  { icon: 'wardrobe', label: 'Wardrobe', title: 'Wardrobes',        desc: 'Floor-to-ceiling wardrobes with custom compartments for every lifestyle.',  badge: 'Trending', img: '/ai-images/wardrobe.png' },
  { icon: 'office', label: 'Office',   title: 'Office Furniture', desc: 'Ergonomic, professional workspaces built for productivity and style.',       badge: null,       img: '/ai-images/office.png' },
  { icon: 'custom', label: 'Custom',   title: 'Custom Carpentry', desc: 'One-of-a-kind pieces crafted exactly to your vision and specifications.',   badge: 'New',      img: '/ai-images/custom.png' },
];

const craftProcess = [
  { step: '01', id: 'design',   title: 'Design Consultation', desc: 'We visit your space, understand your needs, and create detailed 3D renders so you can visualise every corner before production begins.' },
  { step: '02', id: 'material', title: 'Material Selection',  desc: 'Choose from Grade-A teak, marine ply, and imported laminates. We walk you through samples and recommend the best fit for your budget.' },
  { step: '03', id: 'craft',    title: 'Master Crafting',     desc: 'Our 35-member workshop team cuts, finishes, and assembles every piece in-house with ±1mm tolerances and triple quality checks.' },
  { step: '04', id: 'install',  title: 'Clean Installation',  desc: 'We arrive on schedule, install with precision, clean up completely, and hand over a space ready to live in — same day.' },
];

const hScrollItems = [
  { icon: 'kitchen', title: 'Modular Kitchens',  sub: 'Where cooking becomes a pleasure.',    bg: '#F5F0E0', img: '/scroll-image/kitchen.png' },
  { icon: 'wardrobe', title: 'Wardrobes',         sub: 'Every compartment, perfectly placed.',  bg: '#EDE8D5', img: '/scroll-image/wardrobe.png' },
  { icon: 'office', title: 'Office Furniture',  sub: 'Spaces that inspire great work.',       bg: '#E8DDD0', img: '/scroll-image/office.png' },
  { icon: 'carpentry', title: 'Custom Carpentry',  sub: 'One-of-a-kind — just like you.',        bg: '#DDD0C0', img: '/scroll-image/custom.png' },
  { icon: 'tv', title: 'TV & Living Units', sub: 'The focal point of every living room.', bg: '#D4C5B0', img: '/scroll-image/tv-and-livingunit.png' },
];

const whyItems = [
  { id: 'hammer',   title: 'Skilled Craftsmanship', desc: '15+ years of mastering joinery, finishing and bespoke woodwork by expert craftsmen.' },
  { id: 'leaf',     title: 'Premium Materials',      desc: 'We source Grade-A teak, marine ply, and imported laminates for lasting quality.'     },
  { id: 'calendar', title: 'On-Time Delivery',       desc: 'Strict project timelines backed by weekly progress updates and clear milestones.'     },
  { id: 'custom',   title: '100% Custom Designs',   desc: 'Every piece is designed from scratch — no off-the-shelf templates, ever.'           },
];

const projects = [
  { icon: 'kitchen', label: 'Kitchen', title: 'Modern Modular Kitchen',        cat: 'Kitchen', img: '/portfolio-images/modular kitchen/Modern minimalist L-shaped kitchen design.png' },
  { icon: 'wardrobe', label: 'Bedroom', title: 'Handcrafted Teakwood Cot',      cat: 'Bedroom', img: '/portfolio-images/bed/Handcrafted Teakwood cot.png' },
  { icon: 'office', label: 'Office',  title: 'Teakwood Desk with Drawers',    cat: 'Office',  img: '/portfolio-images/teakwood desk with drawers/teakwood desk with drawers 15K.png' },
  { icon: 'home', label: 'Custom',  title: 'Teak Cane Panel Cabinet',       cat: 'Custom',  img: '/portfolio-images/Teak Cane Panel Cabinet/Teak Cane Panel Cabinet 21000rs.png' },
  { icon: 'books', label: 'Custom',  title: 'Teakwood Round Designed Table', cat: 'Custom',  img: '/portfolio-images/teakwood round designed table/teakwood round designed table 3000rs.png' },
];


/* ─── Counter hook ─── */
function useCounter(ref, target, suffix = '') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + suffix;
        if (n >= target) clearInterval(t);
      }, 20);
    }, { threshold: 0.7 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target, suffix]);
}

/* ─── ProcessStep sub-component ─── */
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
        <div className="ps-icon">
          <BorderedIcon icon={item.id} />
        </div>
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

/* ─── Main component ─── */
export default function Home() {
  const c1 = useRef(null), c2 = useRef(null), c3 = useRef(null), c4 = useRef(null);
  useCounter(c1, 1200, '+');
  useCounter(c2, 25,  '+');
  useCounter(c3, 100, '%');
  useCounter(c4, 50,  '+');

  /* Hero parallax */
  const { scrollY } = useScroll();
  const heroBgY      = useTransform(scrollY, [0, 700], [0, 200]);
  const heroContentY = useTransform(scrollY, [0, 700], [0, 80]);

  /* Floating showcase scroll */
  const floatRef = useRef(null);
  const { scrollYProgress: floatProg } = useScroll({
    target: floatRef,
    offset: ['start end', 'end start'],
  });
  const furnitureRotate = useTransform(floatProg, [0, 1], [0, 360]);
  const ringCounterRot  = useTransform(floatProg, [0, 1], [0, -200]);

  /* Horizontal scroll — measure track width dynamically */
  const hRef      = useRef(null);
  const hTrackRef = useRef(null);
  const [scrollDist, setScrollDist] = useState(0);

  useEffect(() => {
    const update = () => {
      if (hTrackRef.current) {
        setScrollDist(hTrackRef.current.scrollWidth - window.innerWidth);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress: hProg } = useScroll({
    target: hRef,
    offset: ['start start', 'end end'],
  });
  const hX = useTransform(hProg, [0, 1], [0, -scrollDist]);


  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <motion.div className="hero-bg" style={{ y: heroBgY }} />
        <div className="hero-overlay" />
        <div className="container">
          <motion.div
            className="hero-content"
            style={{ y: heroContentY }}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >


            <motion.h1 variants={fadeUp} transition={{ duration: 0.7, ease, delay: 0.1 }}>
              Custom Furniture That <em>Defines</em> Your Space
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp} transition={{ duration: 0.7, ease, delay: 0.2 }}>
              From modular kitchens to bespoke wardrobes — we craft premium wooden furniture
              tailored to your exact vision. Quality materials, master craftsmen, on-time delivery.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp} transition={{ duration: 0.7, ease, delay: 0.3 }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Get Free Quote</Link>
              <Link to="/products" className="btn btn-outline btn-lg">View Our Work</Link>
            </motion.div>

            <motion.div className="hero-stats" variants={fadeUp} transition={{ duration: 0.7, ease, delay: 0.5 }}>
              <div><div className="hstat-num"><span ref={c1}>0</span></div><div className="hstat-lbl">Projects Delivered</div></div>
              <div><div className="hstat-num"><span ref={c2}>0</span></div><div className="hstat-lbl">Years Experience</div></div>
              <div><div className="hstat-num"><span ref={c3}>0</span></div><div className="hstat-lbl">Client Satisfaction</div></div>
              <div><div className="hstat-num"><span ref={c4}>0</span></div><div className="hstat-lbl">Skilled Craftsmen</div></div>
            </motion.div>
          </motion.div>
        </div>
        <div className="scroll-cue">
          <div className="scroll-mouse" />
          Scroll
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container">
          <div className="trust-items">
            {[
              { icon: 'check', title: 'Licensed & Insured',     sub: 'Fully certified studio'  },
              { icon: 'clock', title: '25+ Years Experience',   sub: 'Trusted since 1999'      },
              { icon: 'trophy', title: '1200+ Happy Clients',     sub: 'Across Tamil Nadu'        },
              { icon: 'tree', title: 'Premium Materials Only', sub: 'Grade-A wood & hardware' },
            ].map(t => (
              <div className="trust-item" key={t.title}>
                <BorderedIcon icon={t.icon} size={48} />
                <div style={{ marginLeft: '12px' }}><strong>{t.title}</strong><span>{t.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING FURNITURE TRANSITION ── */}
      <div ref={floatRef} className="float-section">
        <div className="container float-inner">
          <div className="float-text-wrap">
            <motion.span
              className="label-tag"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Our Craft
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              Furniture That <em>Moves</em><br />With Your Life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              Every piece we build is designed around how you live — how you cook, work, sleep,
              and gather. Form and function, inseparable.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.35 }}
            >
              <Link to="/services" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Explore Services
              </Link>
            </motion.div>
          </div>
          {/* ── Right: Scroll-driven Showcase ── */}
          <div className="float-showcase">
            <div className="fsh-canvas">

              {/* Outer dashed ring — rotates 360° on scroll */}
              <motion.div className="fsh-orbit" style={{ rotate: furnitureRotate }} />

              {/* Inner ring — counter-rotates */}
              <motion.div className="fsh-inner-ring" style={{ rotate: ringCounterRot }} />

              {/* Main circular product image */}
              <motion.div
                className="fsh-img-circle"
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
              >
                <img
                  src="/portfolio-images/teakwood desk with drawers/teakwood desk with drawers 15K.png"
                  alt="Teakwood Desk with Drawers"
                />
              </motion.div>

              {/* Mini card — top right */}
              <motion.div
                className="fsh-mini fsh-mini-1"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.55 }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <img src="/portfolio-images/Teak Elegance Console Table/Teak Elegance Console Table 4500rs.png" alt="Console Table" />
                  <div className="fsh-mini-lbl">Console Table</div>
                </motion.div>
              </motion.div>

              {/* Mini card — bottom left */}
              <motion.div
                className="fsh-mini fsh-mini-2"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.7 }}
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                  <img src="/portfolio-images/bed/Handcrafted Teakwood cot.png" alt="Teakwood Cot" />
                  <div className="fsh-mini-lbl">Teakwood Cot</div>
                </motion.div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="fsh-badge"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.85, type: 'spring', bounce: 0.4 }}
              >
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <span className="fsh-badge-num">15+</span>
                  <span className="fsh-badge-lbl">Years of Craft</span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">What We Do</span>
            <h2>Our Signature Services</h2>
            <p>From concept to installation — every service delivered with precision, premium materials, and a passion for lasting craftsmanship.</p>
            <div className="underline" />
          </motion.div>

          <motion.div
            className="services-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {services.map((s, i) => (
              <motion.div
                className="service-card"
                key={s.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
              >
                <div className="sc-img" style={{ position: 'relative' }}>
                  <img src={s.img} alt={s.title} loading="lazy" />
                  {s.badge && <span className="sc-badge">{s.badge}</span>}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
                    <BorderedIcon icon={s.icon} size={40} />
                  </div>
                </div>
                <div className="sc-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/services" className="sc-link">Learn More</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{ textAlign: 'center', marginTop: '2.5rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/services" className="btn btn-ghost">View All Services</Link>
          </motion.div>
        </div>
      </section>

      {/* ── CRAFT PROCESS ── */}
      <section className="section section-alt process-section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">How We Work</span>
            <h2>From Vision to Reality</h2>
            <p>A seamless four-step process built around your timeline, your taste, and your peace of mind.</p>
            <div className="underline" />
          </motion.div>
          <div className="process-track">
            {craftProcess.map((item, i) => (
              <ProcessStep
                key={item.step}
                item={item}
                index={i}
                isLast={i === craftProcess.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">Why Sree Wood Works</span>
            <h2>Built Different. Built Better.</h2>
            <p>Four pillars that make every Sree Wood Works project an investment worth making.</p>
            <div className="underline" />
          </motion.div>

          <motion.div
            className="why-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {whyItems.map((w, i) => (
              <motion.div
                className="why-card"
                key={w.title}
                variants={scaleIn}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              >
                <div className="why-icon" style={{ marginBottom: '20px' }}>
                  <BorderedIcon icon={w.id} />
                </div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">Our Work</span>
            <h2>Featured Projects</h2>
            <p>A glimpse into spaces we've transformed — each project a story of precision and passion.</p>
            <div className="underline" />
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {projects.map((p, i) => (
              <motion.div
                className="proj-item"
                key={p.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease, delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              >
                <img src={p.img} alt={p.title} className="proj-img" loading="lazy" />
                <div className="proj-overlay">
                  <h4>{p.title}</h4>
                  <span className="cat">{p.cat}</span>
                </div>
                <a href={`https://wa.me/919840486789?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.title)}`} target="_blank" rel="noreferrer" className="proj-btn">
                  <WhatsAppIcon size={16} /> Enquiry
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{ textAlign: 'center', marginTop: '2.5rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="btn btn-dark">Explore All Products</Link>
          </motion.div>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL SHOWCASE ── */}
      <div ref={hRef} className="h-scroll-outer">
        <div className="h-scroll-sticky">
          <div className="h-scroll-header">
            <motion.span
              className="label-tag h-scroll-tag"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Specialities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease }}
            >
              Scroll to Explore
            </motion.h2>
          </div>

          <div className="h-scroll-viewport">
            <motion.div className="h-scroll-track" ref={hTrackRef} style={{ x: hX }}>
              {hScrollItems.map((item, i) => (
                <div
                  key={i}
                  className="h-scroll-item"
                >
                  <img src={item.img} alt={item.title} className="hsi-bg" />
                  <div className="hsi-overlay" style={{ background: `linear-gradient(to top, #fff 0%, rgba(255,255,255,0.7) 60%, transparent 100%)` }} />
                  <div className="hsi-num">0{i + 1}</div>
                  <div className="hsi-content">
                    <BorderedIcon icon={item.icon} size={48} />
                    <h3 style={{ marginTop: '16px' }}>{item.title}</h3>
                    <p>{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="h-scroll-progress-wrap">
            <motion.div
              className="h-scroll-progress-bar"
              style={{ scaleX: hProg, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>

      {/* ── GOOGLE REVIEWS CTA ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">Client Reviews</span>
            <h2>See What Our Clients Say</h2>
            <p>Real reviews from real customers on Google Maps.</p>
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

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="container">
          <motion.span
            className="label-tag"
            style={{ color: 'rgba(255,140,0,0.9)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Start?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Transform Your Space Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '540px', margin: '0 auto 2rem' }}
          >
            Get a free consultation and detailed quote within 24 hours. No commitment required — just great ideas and honest pricing.
          </motion.p>
          <motion.div
            className="cta-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="btn btn-primary btn-lg">Get Free Quote</Link>
            <a href="tel:+919840486789" className="btn btn-outline btn-lg">📞 Call Now</a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
