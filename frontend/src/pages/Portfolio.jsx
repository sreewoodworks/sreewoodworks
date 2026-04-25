import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const projectImages = [
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.26.jpeg', category: 'kitchen', title: 'Modern Modular Kitchen', location: 'Jubilee Hills' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.27.jpeg', category: 'bedroom', title: 'Master Bedroom Suite', location: 'Gachibowli' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.28.jpeg', category: 'office', title: 'Executive Office Setup', location: 'Madhapur' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.29.jpeg', category: 'custom', title: 'Premium TV Unit', location: 'Banjara Hills' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.30.jpeg', category: 'kitchen', title: 'Island Kitchen Design', location: 'Kukatpally' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.31.jpeg', category: 'bedroom', title: 'Luxury Wardrobe', location: 'HITEC City' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.32.jpeg', category: 'custom', title: 'Teak Wood Pooja Mandir', location: 'Miyapur' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.33.jpeg', category: 'kitchen', title: 'Compact U-Kitchen', location: 'Ameerpet' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.34.jpeg', category: 'bedroom', title: 'Kids Bedroom', location: 'Kondapur' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.35.jpeg', category: 'office', title: 'Tech Startup Hub', location: 'Financial District' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.36.jpeg', category: 'custom', title: 'Handcrafted Dining Table', location: 'Secunderabad' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.37.jpeg', category: 'kitchen', title: 'Rustic Kitchen Style', location: 'Manikonda' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.38.jpeg', category: 'bedroom', title: 'Modern Guest Room', location: 'Uppal' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.39.jpeg', category: 'office', title: 'Conference Room', location: 'Begumpet' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.40.jpeg', category: 'custom', title: 'Glass Partition Wall', location: 'Somajiguda' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.41.jpeg', category: 'kitchen', title: 'Classic White Kitchen', location: 'Nallagandla' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.42.jpeg', category: 'bedroom', title: 'Walk-in Closet', location: 'Tellapur' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.43.jpeg', category: 'custom', title: 'Custom Bookshelf', location: 'Kokapet' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.44.jpeg', category: 'kitchen', title: 'Smart Kitchen Solution', location: 'Lingampally' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.45.jpeg', category: 'bedroom', title: 'Contemporary Bed Frame', location: 'Hafeezpet' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.46.jpeg', category: 'office', title: 'Collaborative Workspace', location: 'Madhapur' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.47.jpeg', category: 'custom', title: 'Designer Shoe Rack', location: 'Kukatpally' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.48.jpeg', category: 'kitchen', title: 'High-Gloss Kitchen', location: 'Gachibowli' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.49.jpeg', category: 'bedroom', title: 'Minimalist Wardrobe', location: 'Jubilee Hills' },
  { src: '/portfolio-images/WhatsApp Image 2026-04-24 at 16.08.50.jpeg', category: 'office', title: 'Home Office Nook', location: 'Banjara Hills' },
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
              <span>Portfolio</span>
            </motion.nav>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              Our Portfolio
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
