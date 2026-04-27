import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';

/* ─── Animation Variants ─── */
const ease = [0.22, 1, 0.36, 1];
const fadeUp  = { hidden: { opacity: 0, y: 48   }, visible: { opacity: 1, y: 0     } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ─── Data ─── */
const services = [
  { icon: '🍳', label: 'Kitchen',  title: 'Modular Kitchen',  desc: 'Smart, space-saving kitchen designs with premium hardware and laminates.', badge: 'Popular',  img: '/ai-images/kitchen.png' },
  { icon: '🚪', label: 'Wardrobe', title: 'Wardrobes',        desc: 'Floor-to-ceiling wardrobes with custom compartments for every lifestyle.',  badge: 'Trending', img: '/ai-images/wardrobe.png' },
  { icon: '💼', label: 'Office',   title: 'Office Furniture', desc: 'Ergonomic, professional workspaces built for productivity and style.',       badge: null,       img: '/ai-images/office.png' },
  { icon: '🪑', label: 'Custom',   title: 'Custom Carpentry', desc: 'One-of-a-kind pieces crafted exactly to your vision and specifications.',   badge: 'New',      img: '/ai-images/custom.png' },
];

const craftProcess = [
  { step: '01', icon: '✏️', title: 'Design Consultation', desc: 'We visit your space, understand your needs, and create detailed 3D renders so you can visualise every corner before production begins.' },
  { step: '02', icon: '🌳', title: 'Material Selection',  desc: 'Choose from Grade-A teak, marine ply, and imported laminates. We walk you through samples and recommend the best fit for your budget.' },
  { step: '03', icon: '🪚', title: 'Master Crafting',     desc: 'Our 35-member workshop team cuts, finishes, and assembles every piece in-house with ±1mm tolerances and triple quality checks.' },
  { step: '04', icon: '🏠', title: 'Clean Installation',  desc: 'We arrive on schedule, install with precision, clean up completely, and hand over a space ready to live in — same day.' },
];

const hScrollItems = [
  { icon: '🍳', title: 'Modular Kitchens',  sub: 'Where cooking becomes a pleasure.',    bg: '#F5F0E0', img: '/scroll-image/kitchen.png' },
  { icon: '🚪', title: 'Wardrobes',         sub: 'Every compartment, perfectly placed.',  bg: '#EDE8D5', img: '/scroll-image/wardrobe.png' },
  { icon: '💼', title: 'Office Furniture',  sub: 'Spaces that inspire great work.',       bg: '#E8DDD0', img: '/scroll-image/office.png' },
  { icon: '🪵', title: 'Custom Carpentry',  sub: 'One-of-a-kind — just like you.',        bg: '#DDD0C0', img: '/scroll-image/custom.png' },
  { icon: '📺', title: 'TV & Living Units', sub: 'The focal point of every living room.', bg: '#D4C5B0', img: '/scroll-image/tv-and-livingunit.png' },
];

const whyItems = [
  { icon: '🔨', title: 'Skilled Craftsmanship', desc: '15+ years of mastering joinery, finishing and bespoke woodwork by expert craftsmen.' },
  { icon: '🌳', title: 'Premium Materials',      desc: 'We source Grade-A teak, marine ply, and imported laminates for lasting quality.'     },
  { icon: '📅', title: 'On-Time Delivery',       desc: 'Strict project timelines backed by weekly progress updates and clear milestones.'     },
  { icon: '✏️', title: '100% Custom Designs',   desc: 'Every piece is designed from scratch — no off-the-shelf templates, ever.'           },
];

const projects = [
  { icon: '🍳', label: 'Kitchen', title: 'Modern Modular Kitchen',       cat: 'Kitchen', img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_19_36 PM.png' },
  { icon: '🚪', label: 'Bedroom', title: 'Handcrafted Teakwood Cot',     cat: 'Bedroom', img: '/portfolio-images/Handcrafted Teakwood cot.png' },
  { icon: '💼', label: 'Office',  title: 'Teakwood Desk with Drawers',   cat: 'Office',  img: '/portfolio-images/teakwood desk with drawers 15K.png' },
  { icon: '🏠', label: 'Living',  title: 'Teak Cane Panel Cabinet',      cat: 'Custom',  img: '/portfolio-images/Teak Cane Panel Cabinet 21000rs.png' },
  { icon: '📚', label: 'Custom',  title: 'Teakwood Round Designed Table', cat: 'Custom', img: '/portfolio-images/teakwood round designed table 3000rs.png' },
];

const testimonials = [
  { initial: 'R', name: 'Rajesh Mehta',  role: 'Homeowner, Jubilee Hills',       text: 'WoodCraft transformed our entire home. The modular kitchen is stunning — every detail was executed perfectly. Delivery was on time and the team was professional throughout.' },
  { initial: 'P', name: 'Priya Sharma',  role: 'Interior Designer, Hyderabad',   text: 'I recommend WoodCraft to all my clients. The quality of their wardrobes and TV units is unmatched. Custom finishes are executed exactly as designed — no surprises.'        },
  { initial: 'A', name: 'Arjun Reddy',   role: 'Tech Startup Founder, Madhapur', text: 'Our office furniture from WoodCraft is both functional and beautiful. The team understood our brand aesthetic and delivered a workspace our employees love.'               },
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

  /* Floating furniture */
  const floatRef = useRef(null);
  const { scrollYProgress: floatProg } = useScroll({
    target: floatRef,
    offset: ['start end', 'end start'],
  });
  const furnitureX = useTransform(floatProg, [0, 1], ['-20%', '120%']);
  const furnitureR = useTransform(floatProg, [0, 0.5, 1], [-6, 0, 6]);
  const furnitureY = useTransform(floatProg, [0, 0.5, 1], [30, -20, 30]);

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

  /* Testimonial auto-slider */
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

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
              { icon: '✅', title: 'Licensed & Insured',     sub: 'Fully certified studio'  },
              { icon: '🕒', title: '25+ Years Experience',   sub: 'Trusted since 1999'      },
              { icon: '🏆', title: '1200+ Happy Clients',     sub: 'Across Hyderabad'        },
              { icon: '🌳', title: 'Premium Materials Only', sub: 'Grade-A wood & hardware' },
            ].map(t => (
              <div className="trust-item" key={t.title}>
                <div className="trust-icon">{t.icon}</div>
                <div><strong>{t.title}</strong><span>{t.sub}</span></div>
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
          <motion.div
            className="float-furniture"
            style={{ x: furnitureX, rotate: furnitureR, y: furnitureY }}
            aria-hidden="true"
          >
            🪑
          </motion.div>
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
                <div className="sc-img">
                  <img src={s.img} alt={s.title} loading="lazy" />
                  {s.badge && <span className="sc-badge">{s.badge}</span>}
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
            <span className="label-tag">Why WoodCraft</span>
            <h2>Built Different. Built Better.</h2>
            <p>Four pillars that make every WoodCraft project an investment worth making.</p>
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
                <div className="why-icon">{w.icon}</div>
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
                <Link to="/products" className="proj-btn">View Details →</Link>
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
                    <div className="hsi-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
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

      {/* ── TESTIMONIALS SLIDER ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-tag">Client Stories</span>
            <h2>What Our Clients Say</h2>
            <p>Real feedback from homeowners, designers, and businesses who trusted WoodCraft.</p>
            <div className="underline" />
          </motion.div>

          <div className="tslider">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                className="tslide-card"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease }}
              >
                <span className="tcard-quote">"</span>
                <div className="tcard-stars">★★★★★</div>
                <p className="tcard-text">{testimonials[tIdx].text}</p>
                <div className="tcard-author">
                  <div className="tcard-avatar">{testimonials[tIdx].initial}</div>
                  <div>
                    <div className="tcard-name">{testimonials[tIdx].name}</div>
                    <div className="tcard-role">{testimonials[tIdx].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="tslide-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`tslide-dot${i === tIdx ? ' active' : ''}`}
                  onClick={() => setTIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
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
            <a href="tel:+919876543210" className="btn btn-outline btn-lg">📞 Call Now</a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
