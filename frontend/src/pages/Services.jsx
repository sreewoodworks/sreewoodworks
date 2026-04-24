import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🍳',
    title: 'Modular Kitchen',
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
    badge: 'Most Popular',
  },
  {
    icon: '🚪',
    title: 'Wardrobes',
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
    badge: null,
  },
  {
    icon: '📺',
    title: 'TV Units',
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
    badge: 'Trending',
  },
  {
    icon: '🚪',
    title: 'Doors & Windows',
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
    badge: null,
  },
  {
    icon: '💼',
    title: 'Office Furniture',
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
    badge: null,
  },
  {
    icon: '🪵',
    title: 'Custom Carpentry',
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
    badge: 'New',
  },
];

export default function Services() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Services</span>
          </nav>
          <h1>Our Services</h1>
          <p>Six specialised services delivered with master craftsmanship, premium materials, and a commitment to perfection.</p>
        </div>
      </div>

      {/* Services List */}
      <section className="section">
        <div className="container">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-block${i % 2 !== 0 ? ' reverse' : ''}`}
              data-reveal
            >
              {/* Image / Placeholder */}
              <div className="sb-img">
                <div
                  className="sb-ph"
                  style={{ background: `linear-gradient(135deg, #F5F5DC, ${['#E8DDD0','#DDD0C0','#D4C5B0','#CCC0AA','#C5BAA8','#BDB5A0'][i]})` }}
                >
                  <span className="icon">{s.icon}</span>
                  <span className="lbl">{s.title}</span>
                </div>
              </div>

              {/* Body */}
              <div className="sb-body">
                <span className="label-tag">{s.badge || 'Our Service'}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="sb-price">💰 {s.price}</span>
                <ul className="sb-features">
                  {s.features.map(f => (
                    <li key={f}>
                      <span className="chk">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Get Started</span>
          <h2>Ready to Transform Your Space?</h2>
          <p>Book a free home visit and get a detailed quote within 24 hours. No hidden charges.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Free Visit</Link>
            <a href="tel:+919876543210" className="btn btn-outline btn-lg">📞 +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
