import { useState } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, icon: '🍳', title: 'Jubilee Hills Kitchen',        category: 'kitchen', location: 'Jubilee Hills, Hyderabad', materials: 'Marine Ply + Acrylic Finish', duration: '18 Days', desc: 'A sleek U-shaped modular kitchen with handleless cabinets, quartz countertop, and integrated chimney. Storage optimised for a family of five.', bg: '#F5F5DC' },
  { id: 2, icon: '🚪', title: 'Gachibowli Master Wardrobe',   category: 'bedroom', location: 'Gachibowli, Hyderabad',  materials: 'BWR Ply + Mirror Panels',    duration: '12 Days', desc: 'Floor-to-ceiling sliding wardrobe with internal LED lighting, velvet drawer inserts, and a full-length mirror panel.', bg: '#EDE8D5' },
  { id: 3, icon: '💼', title: 'Madhapur Tech Office',         category: 'office',  location: 'Madhapur, Hyderabad',   materials: 'Teak Veneer + Steel',        duration: '25 Days', desc: 'Open-plan office furniture for 40 staff — including cable-managed workstations, a 16-seat conference table, and a glass-fronted reception counter.', bg: '#E8DDD0' },
  { id: 4, icon: '📺', title: 'Banjara Hills TV Wall',        category: 'custom',  location: 'Banjara Hills, Hyderabad', materials: 'WPC Board + LED Coves',   duration: '8 Days',  desc: 'A full 14-foot feature wall with backlit floating shelves, hidden cable channels, and a stone-textured accent panel.', bg: '#DDD0C0' },
  { id: 5, icon: '🍳', title: 'Kondapur Island Kitchen',      category: 'kitchen', location: 'Kondapur, Hyderabad',   materials: 'PU Finish + Granite',        duration: '22 Days', desc: 'Premium island kitchen with a breakfast counter, wine rack, and Pooja unit integrated seamlessly into the design.', bg: '#F5F0E0' },
  { id: 6, icon: '🚪', title: 'HITEC City Walk-In Closet',    category: 'bedroom', location: 'HITEC City, Hyderabad', materials: 'Pre-lam Ply + Aluminium',    duration: '15 Days', desc: 'A luxury walk-in wardrobe with island dresser, jewellery drawers, shoe racks, and a full-height mirror wall.', bg: '#E8E0D5' },
  { id: 7, icon: '📚', title: 'Ameerpet Home Library',        category: 'custom',  location: 'Ameerpet, Hyderabad',  materials: 'Solid Teak + Walnut',        duration: '20 Days', desc: 'Floor-to-ceiling bookshelf wall with rolling ladder, integrated reading nook, and vintage-inspired teak finish.', bg: '#DDD5C5' },
  { id: 8, icon: '💼', title: 'Financial District Boardroom', category: 'office',  location: 'Financial District, HYD', materials: 'Oak Veneer + Glass',       duration: '30 Days', desc: '24-seater boardroom with a solid oak conference table, credenza, and custom acoustic panelled walls.', bg: '#E0D8CC' },
  { id: 9, icon: '🛏️', title: 'Secunderabad Bedroom Suite',  category: 'bedroom', location: 'Secunderabad, Hyderabad', materials: 'Teak + Fabric Headboard',  duration: '14 Days', desc: 'Complete bedroom suite — bed frame, side tables, dresser unit, and four-door wardrobe in matching warm teak finish.', bg: '#EDE5D8' },
  { id: 10, icon: '🍳', title: 'Kukatpally L-Kitchen',        category: 'kitchen', location: 'Kukatpally, Hyderabad', materials: 'HDF + Laminate Finish',      duration: '16 Days', desc: 'Budget-friendly L-shaped kitchen with maximum storage, durable laminate shutters, and stainless steel sink cabinet.', bg: '#F0ECD8' },
  { id: 11, icon: '🪵', title: 'Miyapur Pooja Mandir',        category: 'custom',  location: 'Miyapur, Hyderabad',   materials: 'Solid Teak + Gold Polish',   duration: '10 Days', desc: 'Handcrafted teak Pooja mandir with ornate carvings, backlit niches, and a foldable door design.', bg: '#E8E0CF' },
  { id: 12, icon: '💼', title: 'Khairatabad Co-Working Space',category: 'office',  location: 'Khairatabad, Hyderabad', materials: 'Powder-Coat Steel + MDF',  duration: '35 Days', desc: '80-seat co-working fitout with hot desks, phone booths, lounge seating, and a fully equipped pantry unit.', bg: '#DDDAC8' },
];

const FILTERS = ['all', 'kitchen', 'bedroom', 'office', 'custom'];

export default function Portfolio() {
  const [active, setActive]     = useState('all');
  const [modal, setModal]       = useState(null);

  const visible = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Portfolio</span>
          </nav>
          <h1>Our Work</h1>
          <p>500+ projects delivered across Hyderabad. Browse by category and see the craftsmanship up close.</p>
        </div>
      </div>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-bar">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filt-btn${active === f ? ' active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {visible.map(p => (
              <div
                key={p.id}
                className="gallery-item"
                data-reveal
                onClick={() => setModal(p)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setModal(p)}
              >
                <div
                  className="gi-ph"
                  style={{ background: `linear-gradient(135deg, ${p.bg}, #C8BDA8)` }}
                >
                  <span className="icon">{p.icon}</span>
                  <small>{p.title}</small>
                </div>
                <div className="gi-overlay">
                  <h4>{p.title}</h4>
                  <span className="cat">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className={`modal-bg open`} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <div className="modal-img" style={{ background: `linear-gradient(135deg, ${modal.bg}, #C8BDA8)` }}>
              {modal.icon}
              <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">✕</button>
            </div>
            <div className="modal-body">
              <span className="label-tag">{modal.category}</span>
              <h3>{modal.title}</h3>
              <p>{modal.desc}</p>
              <div className="modal-meta">
                <div className="meta-item">
                  <strong>Location</strong>
                  <span>📍 {modal.location}</span>
                </div>
                <div className="meta-item">
                  <strong>Materials</strong>
                  <span>🌳 {modal.materials}</span>
                </div>
                <div className="meta-item">
                  <strong>Duration</strong>
                  <span>📅 {modal.duration}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary" onClick={() => setModal(null)}>
                  Get Similar Work Done
                </Link>
                <button className="btn btn-ghost" onClick={() => setModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Love What You See?</span>
          <h2>Let's Build Something Amazing Together</h2>
          <p>Share your vision with us and we'll bring it to life — on time, on budget, and beyond expectations.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Start Your Project</Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
