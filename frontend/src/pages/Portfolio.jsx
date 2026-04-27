import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const projectImages = [
  { src: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_19_36 PM.png',               category: 'kitchen',  title: 'Modern Modular Kitchen',            location: 'Jubilee Hills' },
  { src: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_19_57 PM.png',               category: 'bedroom',  title: 'Luxury Interior Design',            location: 'Gachibowli' },
  { src: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_06 PM.png',               category: 'office',   title: 'Premium Workspace Setup',           location: 'Madhapur' },
  { src: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_13 PM.png',               category: 'custom',   title: 'Designer Living Room Unit',         location: 'Banjara Hills' },
  { src: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_23 PM.png',               category: 'kitchen',  title: 'Island Kitchen Design',             location: 'Kukatpally' },
  { src: '/portfolio-images/Handcrafted Teakwood cot.png',                               category: 'bedroom',  title: 'Handcrafted Teakwood Cot',          location: 'HITEC City' },
  { src: '/portfolio-images/Handcrafted Teakwood cot queensize21k King size30k.png',     category: 'bedroom',  title: 'Queen & King Size Teakwood Cot',    location: 'Miyapur' },
  { src: '/portfolio-images/Teak Cane Panel Cabinet 21000rs.png',                        category: 'custom',   title: 'Teak Cane Panel Cabinet',           location: 'Ameerpet' },
  { src: '/portfolio-images/Teak Cane Panel Cabinet2.png',                               category: 'custom',   title: 'Teak Cane Cabinet — Side View',     location: 'Kondapur' },
  { src: '/portfolio-images/Teak Cane Panel Cabinet3.png',                               category: 'custom',   title: 'Teak Cane Cabinet — Detail',        location: 'Financial District' },
  { src: '/portfolio-images/Teak Elegance Console Table 4500rs.png',                     category: 'custom',   title: 'Teak Elegance Console Table',       location: 'Secunderabad' },
  { src: '/portfolio-images/Teak Elegance Console Table diff views2.png',                category: 'custom',   title: 'Console Table — Different Views',   location: 'Manikonda' },
  { src: '/portfolio-images/teakWood coffee table with slatted shelf 6500rs.png',        category: 'custom',   title: 'Teakwood Coffee Table with Shelf',  location: 'Uppal' },
  { src: '/portfolio-images/teakWood coffee table with slatted shelf2.png',              category: 'custom',   title: 'Coffee Table — Shelf Detail',       location: 'Begumpet' },
  { src: '/portfolio-images/teakWood mosaic block tablestool square shaped 4000rs.png',  category: 'custom',   title: 'Mosaic Block Square Stool',         location: 'Somajiguda' },
  { src: '/portfolio-images/teakWood mosaic block tablestool square shaped2.png',        category: 'custom',   title: 'Square Mosaic Stool — Top View',    location: 'Nallagandla' },
  { src: '/portfolio-images/teakWood round mosaic stool designed 3000rs.png',            category: 'custom',   title: 'Round Mosaic Teakwood Stool',       location: 'Tellapur' },
  { src: '/portfolio-images/teakWood round mosaic stool designed2.png',                  category: 'custom',   title: 'Mosaic Stool — Side View',          location: 'Kokapet' },
  { src: '/portfolio-images/teakwood desk with drawers 15K.png',                         category: 'office',   title: 'Teakwood Desk with Drawers',        location: 'Lingampally' },
  { src: '/portfolio-images/teakwood desk with drawers2.png',                            category: 'office',   title: 'Desk Drawer — Detail View',         location: 'Hafeezpet' },
  { src: '/portfolio-images/teakwood round designed table 3000rs.png',                   category: 'custom',   title: 'Teakwood Round Designed Table',     location: 'Madhapur' },
  { src: '/portfolio-images/teakwood round designed table top view2.png',                category: 'custom',   title: 'Round Table — Top View',            location: 'Kukatpally' },
  { src: '/portfolio-images/teakwood round table darkpolished 2500rs.png',               category: 'custom',   title: 'Dark Polished Teakwood Table',      location: 'Gachibowli' },
  { src: '/portfolio-images/teakwood round table darkpolished2.png',                     category: 'custom',   title: 'Dark Polish Table — Detail',        location: 'Jubilee Hills' },
  { src: '/portfolio-images/teakwood round table plain 2000rs.png',                      category: 'custom',   title: 'Natural Teakwood Round Table',      location: 'Banjara Hills' },
  { src: '/portfolio-images/teakwood round table plain2.png',                            category: 'custom',   title: 'Plain Teak Table — Side View',      location: 'Hyderabad' },
];

const projects = projectImages.map((p, index) => ({
  id: index + 1,
  title: p.title,
  category: p.category,
  image: p.src,
  location: p.location + ', Hyderabad',
  materials: 'Premium Ply + Custom Finish',
  duration: '15-20 Days',
  desc: `A premium ${p.category} project delivered with attention to detail and high-quality materials. Custom designed to meet the client's specific needs.`,
  bg: '#F5F5DC'
}));

const FILTERS = ['all', 'kitchen', 'bedroom', 'office', 'custom'];

export default function Portfolio() {
  const [active, setActive]     = useState('all');
  const [modal, setModal]       = useState(null);

  const visible = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <motion.div 
          className="page-hero-bg"
          style={{ backgroundImage: 'url(/ai-images/custom.png)' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.nav className="breadcrumb" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <Link to="/">Home</Link>
              <span className="sep">›</span>
              <span>Products</span>
            </motion.nav>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              Our Products
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              Explore our collection of premium woodwork projects across Hyderabad. From modern kitchens to bespoke furniture.
            </motion.p>
          </motion.div>
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
          <motion.div 
            className="gallery-grid masonry-grid"
            layout
          >
            <AnimatePresence mode='popLayout'>
              {visible.map((p, idx) => (
                <motion.div
                  key={p.id}
                  layout
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
                  className={`gallery-item ${p.id % 4 === 0 ? 'tall' : p.id % 7 === 0 ? 'wide' : ''}`}
                  onClick={() => setModal(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setModal(p)}
                >
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="gi-overlay">
                    <h4>{p.title}</h4>
                    <span className="cat">{p.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className={`modal-bg open`} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <div className="modal-img">
              <img src={modal.image} alt={modal.title} />
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
