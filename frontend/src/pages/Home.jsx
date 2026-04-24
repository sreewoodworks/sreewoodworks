import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/* ---- Data ---- */
const services = [
  { icon: '🍳', label: 'Kitchen',   title: 'Modular Kitchen',    desc: 'Smart, space-saving kitchen designs with premium hardware and laminates.', badge: 'Popular' },
  { icon: '🚪', label: 'Wardrobe',  title: 'Wardrobes',          desc: 'Floor-to-ceiling wardrobes with custom compartments for every lifestyle.',  badge: 'Trending' },
  { icon: '💼', label: 'Office',    title: 'Office Furniture',   desc: 'Ergonomic, professional workspaces built for productivity and style.',       badge: null },
  { icon: '🪑', label: 'Custom',    title: 'Custom Carpentry',   desc: 'One-of-a-kind pieces crafted exactly to your vision and specifications.',   badge: 'New' },
];

const whyItems = [
  { icon: '🔨', title: 'Skilled Craftsmanship',   desc: '15+ years of mastering joinery, finishing and bespoke woodwork by expert craftsmen.' },
  { icon: '🌳', title: 'Premium Materials',        desc: 'We source Grade-A teak, marine ply, and imported laminates for lasting quality.' },
  { icon: '📅', title: 'On-Time Delivery',         desc: 'Strict project timelines backed by weekly progress updates and clear milestones.' },
  { icon: '✏️', title: '100% Custom Designs',     desc: 'Every piece is designed from scratch — no off-the-shelf templates, ever.' },
];

const projects = [
  { icon: '🍳', label: 'Kitchen', title: 'Jubilee Hills Kitchen Makeover',   cat: 'Kitchen' },
  { icon: '🚪', label: 'Bedroom', title: 'Gachibowli Master Bedroom Suite',  cat: 'Bedroom' },
  { icon: '💼', label: 'Office',  title: 'Madhapur Corporate Workspace',     cat: 'Office' },
  { icon: '🏠', label: 'Living',  title: 'Banjara Hills Living Room Unit',   cat: 'Custom' },
  { icon: '📚', label: 'Library', title: 'Hitech City Home Library',         cat: 'Custom' },
];

const testimonials = [
  {
    initial: 'R', name: 'Rajesh Mehta', role: 'Homeowner, Jubilee Hills',
    text: 'WoodCraft transformed our entire home. The modular kitchen is stunning — every detail was executed perfectly. Delivery was on time and the team was professional throughout.',
  },
  {
    initial: 'P', name: 'Priya Sharma', role: 'Interior Designer, Hyderabad',
    text: 'I recommend WoodCraft to all my clients. The quality of their wardrobes and TV units is unmatched. Custom finishes are executed exactly as designed — no surprises.',
  },
  {
    initial: 'A', name: 'Arjun Reddy', role: 'Tech Startup Founder, Madhapur',
    text: 'Our office furniture from WoodCraft is both functional and beautiful. The team understood our brand aesthetic and delivered a workspace our employees love.',
  },
];

/* ---- Counter hook ---- */
function useCounter(ref, target, suffix = '') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = start + suffix;
        if (start >= target) clearInterval(timer);
      }, 20);
    }, { threshold: 0.7 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target, suffix]);
}

export default function Home() {
  const c1 = useRef(null), c2 = useRef(null), c3 = useRef(null), c4 = useRef(null);
  useCounter(c1, 500, '+');
  useCounter(c2, 15, '+');
  useCounter(c3, 98, '%');
  useCounter(c4, 30, '+');

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Hyderabad's #1 Carpentry Studio
            </div>
            <h1>Custom Furniture That <em>Defines</em> Your Space</h1>
            <p className="hero-sub">
              From modular kitchens to bespoke wardrobes — we craft premium wooden furniture
              tailored to your exact vision. Quality materials, master craftsmen, on-time delivery.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Get Free Quote</Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg">View Our Work</Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hstat-num"><span ref={c1}>0</span></div>
                <div className="hstat-lbl">Projects Delivered</div>
              </div>
              <div>
                <div className="hstat-num"><span ref={c2}>0</span></div>
                <div className="hstat-lbl">Years Experience</div>
              </div>
              <div>
                <div className="hstat-num"><span ref={c3}>0</span></div>
                <div className="hstat-lbl">Client Satisfaction</div>
              </div>
              <div>
                <div className="hstat-num"><span ref={c4}>0</span></div>
                <div className="hstat-lbl">Skilled Craftsmen</div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <div className="scroll-mouse" />
          Scroll
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-items">
            {[
              { icon: '✅', title: 'Licensed & Insured',      sub: 'Fully certified studio' },
              { icon: '🕒', title: '15+ Years Experience',    sub: 'Trusted since 2009' },
              { icon: '🏆', title: '500+ Happy Clients',      sub: 'Across Hyderabad' },
              { icon: '🌳', title: 'Premium Materials Only',  sub: 'Grade-A wood & hardware' },
            ].map(t => (
              <div className="trust-item" key={t.title}>
                <div className="trust-icon">{t.icon}</div>
                <div>
                  <strong>{t.title}</strong>
                  <span>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">What We Do</span>
            <h2>Our Signature Services</h2>
            <p>From concept to installation — every service is delivered with precision, premium materials, and a passion for lasting craftsmanship.</p>
            <div className="underline" />
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card" key={s.title} data-reveal data-delay={String(i + 1)}>
                <div className="sc-img">
                  <div className="sc-ph" style={{ background: `linear-gradient(135deg, #F5F5DC, #E8DDD0)` }}>
                    <span className="icon">{s.icon}</span>
                    <span className="lbl">{s.label}</span>
                  </div>
                  {s.badge && <span className="sc-badge">{s.badge}</span>}
                </div>
                <div className="sc-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/services" className="sc-link">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn btn-ghost">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">Why WoodCraft</span>
            <h2>Built Different. Built Better.</h2>
            <p>Four pillars that make every WoodCraft project an investment worth making.</p>
            <div className="underline" />
          </div>
          <div className="why-grid">
            {whyItems.map((w, i) => (
              <div className="why-card" key={w.title} data-reveal data-delay={String(i + 1)}>
                <div className="why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">Our Work</span>
            <h2>Featured Projects</h2>
            <p>A glimpse into spaces we've transformed — each project a story of precision and passion.</p>
            <div className="underline" />
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className="proj-item" key={p.title} data-reveal data-delay={String(i % 3 + 1)}>
                <div className="proj-ph" style={{ background: `linear-gradient(135deg, #F5F5DC ${i * 10}%, #D4C5B0)` }}>
                  <span className="icon">{p.icon}</span>
                  <small>{p.label}</small>
                </div>
                <div className="proj-overlay">
                  <h4>{p.title}</h4>
                  <span className="cat">{p.cat}</span>
                </div>
                <Link to="/portfolio" className="proj-btn">View Details →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/portfolio" className="btn btn-dark">Explore Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">Client Stories</span>
            <h2>What Our Clients Say</h2>
            <p>Real feedback from homeowners, designers, and businesses who trusted WoodCraft.</p>
            <div className="underline" />
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="tcard" key={t.name} data-reveal data-delay={String(i + 1)}>
                <span className="tcard-quote">"</span>
                <div className="tcard-stars">★★★★★</div>
                <p className="tcard-text">{t.text}</p>
                <div className="tcard-author">
                  <div className="tcard-avatar">{t.initial}</div>
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Ready to Start?</span>
          <h2>Transform Your Space Today</h2>
          <p>Get a free consultation and detailed quote within 24 hours. No commitment required — just great ideas and honest pricing.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Get Free Quote</Link>
            <a href="tel:+919876543210" className="btn btn-outline btn-lg">📞 Call Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
