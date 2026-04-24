import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function CountBox({ target, suffix, label }) {
  const ref = useRef(null);
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
  }, [target, suffix]);
  return (
    <div className="stat-box" data-reveal>
      <div className="big-num"><span ref={ref}>0{suffix}</span></div>
      <div className="desc">{label}</div>
    </div>
  );
}

const values = [
  { icon: '🏆', title: 'Quality First',    desc: 'We never compromise on material grade or finish quality. Every joint, every panel, every coat of paint is inspected before delivery.' },
  { icon: '🤝', title: 'Client Trust',     desc: 'Transparent pricing, clear timelines, and honest communication. No hidden charges — what we quote is what you pay.' },
  { icon: '🎯', title: 'Precision Work',   desc: 'Our craftsmen hold tolerances of ±1mm. Every measurement is verified three times before cutting begins.' },
];

const team = [
  { initial: 'R', name: 'Ravi Kumar',      role: 'Master Carpenter & Founder',   exp: '22 years crafting premium furniture across South India.' },
  { initial: 'S', name: 'Sunita Reddy',    role: 'Lead Interior Designer',        exp: 'B.Arch + 12 years designing residential & commercial spaces.' },
  { initial: 'A', name: 'Ajay Patil',      role: 'Workshop Head',                 exp: 'Oversees 35 craftsmen with a focus on quality control and on-time delivery.' },
];

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>About</span>
          </nav>
          <h1>About WoodCraft</h1>
          <p>Fifteen years of turning raw wood into spaces people love to live and work in.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-wrap" data-reveal="left">
              <div className="about-main-img">🪵</div>
              <div className="about-badge">
                <div className="num">15+</div>
                <div className="lbl">Years of Excellence</div>
              </div>
            </div>
            <div data-reveal="right">
              <span className="label-tag">Our Story</span>
              <h2>Crafting Spaces Since 2009</h2>
              <p>
                WoodCraft was founded in 2009 by master carpenter Ravi Kumar in a modest workshop in Hyderabad's
                old city. Starting with a single lathe and a dream to make quality furniture accessible, we've grown
                into a 35-person studio with a fully equipped 8,000 sq.ft production facility in Nacharam.
              </p>
              <p>
                Over 500 projects later — spanning modular kitchens, wardrobes, corporate offices, and bespoke
                handcrafted pieces — our mission remains the same: deliver furniture that lasts generations,
                at a price that makes sense.
              </p>
              <p>
                Every project begins with a free home visit, a detailed 3D design, and a transparent cost breakdown.
                We believe you should see exactly what you're getting before a single nail is driven.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                <Link to="/portfolio" className="btn btn-primary">View Our Work</Link>
                <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                {[
                  { icon: '✅', text: 'ISO 9001 Certified Studio' },
                  { icon: '🌳', text: 'FSC Certified Wood Sources' },
                  { icon: '🏠', text: 'Free Home Consultation' },
                ].map(b => (
                  <span key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Points */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">Why We're Different</span>
            <h2>Our Working Principles</h2>
            <div className="underline" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '860px', margin: '0 auto' }}>
            {[
              { icon: '📐', title: 'Design-First Approach',     desc: 'Every project starts with a detailed 3D render so you can visualise the end result before production begins.' },
              { icon: '🔩', title: 'Factory-Tested Hardware',   desc: 'We use only Hettich, Hafele & Blum fittings — brands trusted by premium European furniture makers.' },
              { icon: '🪚', title: 'In-House Production',       desc: 'All cutting, drilling, and finishing happens in our own workshop — no outsourcing, no surprises.' },
              { icon: '🛡️', title: 'Warranty on Every Job',    desc: '5-year structural warranty on all fixed furniture. Hardware defects replaced free within warranty period.' },
            ].map(p => (
              <div className="value-pt" key={p.title} data-reveal>
                <div className="vp-icon">{p.icon}</div>
                <div className="vp-text">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">By the Numbers</span>
            <h2>Experience That Speaks</h2>
            <div className="underline" />
          </div>
          <div className="stats-row">
            <CountBox target={500} suffix="+" label="Projects Completed" />
            <CountBox target={15}  suffix="+"  label="Years in Business" />
            <CountBox target={35}  suffix="+"  label="Skilled Craftsmen" />
          </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">What We Stand For</span>
            <h2>Our Core Values</h2>
            <div className="underline" />
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="val-card" key={v.title} data-reveal data-delay={String(i + 1)}>
                <div className="vc-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="label-tag">The People Behind the Wood</span>
            <h2>Meet Our Team</h2>
            <p>Passionate professionals who bring your vision to life with decades of combined expertise.</p>
            <div className="underline" />
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card" key={m.name} data-reveal data-delay={String(i + 1)}>
                <div className="team-img" style={{ fontSize: '3rem', background: `linear-gradient(135deg, #F5F5DC, #D4C5B0)` }}>
                  {m.initial}
                </div>
                <div className="team-body">
                  <h4>{m.name}</h4>
                  <div className="role">{m.role}</div>
                  <p>{m.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Let's Work Together</span>
          <h2>Start Your Project with Us</h2>
          <p>Book a free consultation today. Our designers will visit your space, understand your needs, and deliver a detailed design + quote within 24 hours.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Free Visit</Link>
            <Link to="/portfolio" className="btn btn-outline btn-lg">See Our Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
