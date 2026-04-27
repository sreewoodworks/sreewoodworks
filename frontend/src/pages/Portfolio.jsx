import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WA = '919876543210';

const ALL_PRODUCTS = [
  { id: 1,  img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_19_36 PM.png',              category: 'kitchen',  title: 'Modern Modular Kitchen',           price: null,   rating: 4.8, reviews: 124 },
  { id: 2,  img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_19_57 PM.png',              category: 'bedroom',  title: 'Luxury Interior Design',           price: null,   rating: 4.7, reviews: 98  },
  { id: 3,  img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_06 PM.png',              category: 'office',   title: 'Premium Workspace Setup',          price: null,   rating: 4.6, reviews: 76  },
  { id: 4,  img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_13 PM.png',              category: 'custom',   title: 'Designer Living Room Unit',        price: null,   rating: 4.9, reviews: 143 },
  { id: 5,  img: '/portfolio-images/ChatGPT Image Apr 26, 2026, 09_20_23 PM.png',              category: 'kitchen',  title: 'Island Kitchen Design',            price: null,   rating: 4.7, reviews: 89  },
  { id: 6,  img: '/portfolio-images/Handcrafted Teakwood cot.png',                             category: 'bedroom',  title: 'Handcrafted Teakwood Cot',         price: 21000,  rating: 4.9, reviews: 212 },
  { id: 7,  img: '/portfolio-images/Handcrafted Teakwood cot queensize21k King size30k.png',   category: 'bedroom',  title: 'Queen & King Size Teakwood Cot',   price: 21000,  rating: 4.8, reviews: 187 },
  { id: 8,  img: '/portfolio-images/Teak Cane Panel Cabinet 21000rs.png',                      category: 'custom',   title: 'Teak Cane Panel Cabinet',          price: 21000,  rating: 4.7, reviews: 156 },
  { id: 9,  img: '/portfolio-images/Teak Cane Panel Cabinet2.png',                             category: 'custom',   title: 'Teak Cane Cabinet — Side View',    price: 21000,  rating: 4.7, reviews: 156 },
  { id: 10, img: '/portfolio-images/Teak Cane Panel Cabinet3.png',                             category: 'custom',   title: 'Teak Cane Cabinet — Detail',       price: 21000,  rating: 4.7, reviews: 156 },
  { id: 11, img: '/portfolio-images/Teak Elegance Console Table 4500rs.png',                   category: 'custom',   title: 'Teak Elegance Console Table',      price: 4500,   rating: 4.6, reviews: 203 },
  { id: 12, img: '/portfolio-images/Teak Elegance Console Table diff views2.png',              category: 'custom',   title: 'Console Table — Alt View',         price: 4500,   rating: 4.6, reviews: 203 },
  { id: 13, img: '/portfolio-images/teakWood coffee table with slatted shelf 6500rs.png',      category: 'custom',   title: 'Teakwood Coffee Table with Shelf', price: 6500,   rating: 4.8, reviews: 178 },
  { id: 14, img: '/portfolio-images/teakWood coffee table with slatted shelf2.png',            category: 'custom',   title: 'Coffee Table — Shelf Detail',      price: 6500,   rating: 4.8, reviews: 178 },
  { id: 15, img: '/portfolio-images/teakWood mosaic block tablestool square shaped 4000rs.png',category: 'custom',   title: 'Mosaic Block Square Stool',        price: 4000,   rating: 4.5, reviews: 134 },
  { id: 16, img: '/portfolio-images/teakWood mosaic block tablestool square shaped2.png',      category: 'custom',   title: 'Square Mosaic Stool — Top View',   price: 4000,   rating: 4.5, reviews: 134 },
  { id: 17, img: '/portfolio-images/teakWood round mosaic stool designed 3000rs.png',          category: 'custom',   title: 'Round Mosaic Teakwood Stool',      price: 3000,   rating: 4.6, reviews: 167 },
  { id: 18, img: '/portfolio-images/teakWood round mosaic stool designed2.png',                category: 'custom',   title: 'Mosaic Stool — Side View',         price: 3000,   rating: 4.6, reviews: 167 },
  { id: 19, img: '/portfolio-images/teakwood desk with drawers 15K.png',                       category: 'office',   title: 'Teakwood Desk with Drawers',       price: 15000,  rating: 4.9, reviews: 245 },
  { id: 20, img: '/portfolio-images/teakwood desk with drawers2.png',                          category: 'office',   title: 'Desk Drawer — Detail View',        price: 15000,  rating: 4.9, reviews: 245 },
  { id: 21, img: '/portfolio-images/teakwood round designed table 3000rs.png',                 category: 'custom',   title: 'Teakwood Round Designed Table',    price: 3000,   rating: 4.7, reviews: 192 },
  { id: 22, img: '/portfolio-images/teakwood round designed table top view2.png',              category: 'custom',   title: 'Round Table — Top View',           price: 3000,   rating: 4.7, reviews: 192 },
  { id: 23, img: '/portfolio-images/teakwood round table darkpolished 2500rs.png',             category: 'custom',   title: 'Dark Polished Teakwood Table',     price: 2500,   rating: 4.5, reviews: 118 },
  { id: 24, img: '/portfolio-images/teakwood round table darkpolished2.png',                   category: 'custom',   title: 'Dark Polish Table — Detail',       price: 2500,   rating: 4.5, reviews: 118 },
  { id: 25, img: '/portfolio-images/teakwood round table plain 2000rs.png',                    category: 'custom',   title: 'Natural Teakwood Round Table',     price: 2000,   rating: 4.4, reviews: 97  },
  { id: 26, img: '/portfolio-images/teakwood round table plain2.png',                          category: 'custom',   title: 'Plain Teak Table — Side View',     price: 2000,   rating: 4.4, reviews: 97  },
];

const CATEGORIES = ['Kitchen', 'Bedroom', 'Office', 'Custom'];
const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular'        },
  { value: 'price-asc',  label: 'Price: Low to High'  },
  { value: 'price-desc', label: 'Price: High to Low'  },
  { value: 'rating',     label: 'Highest Rated'       },
];

function Stars({ rating }) {
  return (
    <span className="prod-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
      ))}
    </span>
  );
}

function waLink(title) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(`Hi, I'm interested in "${title}". Please share more details.`)}`;
}

export default function Portfolio() {
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice]         = useState('');
  const [maxPrice, setMaxPrice]         = useState('');
  const [sortBy, setSortBy]             = useState('popular');
  const [applied, setApplied]           = useState({ cats: [], min: '', max: '', sort: 'popular' });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCat = cat => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const applyFilters = () => {
    setApplied({ cats: selectedCats, min: minPrice, max: maxPrice, sort: sortBy });
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('popular');
    setApplied({ cats: [], min: '', max: '', sort: 'popular' });
  };

  const visible = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (applied.cats.length > 0) {
      list = list.filter(p => applied.cats.map(c => c.toLowerCase()).includes(p.category));
    }
    if (applied.min !== '') {
      list = list.filter(p => p.price === null || p.price >= Number(applied.min));
    }
    if (applied.max !== '') {
      list = list.filter(p => p.price === null || p.price <= Number(applied.max));
    }
    if (applied.sort === 'price-asc')  list.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
    if (applied.sort === 'price-desc') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (applied.sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    if (applied.sort === 'popular')    list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [applied]);

  const catLabel = applied.cats.length > 0 ? applied.cats.join(', ') : 'All categories';

  const Sidebar = () => (
    <aside className="prod-sidebar">
      <div className="prod-sidebar-header">
        <span className="prod-sidebar-title">⚙ Filters</span>
      </div>

      <div className="prod-filter-section">
        <div className="prod-filter-label">CATEGORY</div>
        {CATEGORIES.map(cat => (
          <label key={cat} className="prod-filter-check">
            <input
              type="checkbox"
              checked={selectedCats.includes(cat)}
              onChange={() => toggleCat(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="prod-filter-section">
        <div className="prod-filter-label">PRICE RANGE</div>
        <div className="prod-price-row">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="prod-price-input"
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="prod-price-input"
          />
        </div>
      </div>

      <div className="prod-filter-section">
        <div className="prod-filter-label">SORT BY</div>
        <select
          className="prod-sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <button className="btn btn-primary prod-apply-btn" onClick={applyFilters}>Apply Filters</button>
      <button className="prod-clear-btn" onClick={clearFilters}>Clear All Filters</button>
    </aside>
  );

  return (
    <div className="prod-page">
      {/* Mobile filter toggle */}
      <div className="prod-mobile-bar container">
        <button className="prod-filter-toggle" onClick={() => setMobileFiltersOpen(o => !o)}>
          ⚙ Filters
        </button>
        <span className="prod-count-label">{visible.length} Products Found</span>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div className="prod-mobile-sidebar"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}>
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="prod-layout container">
        {/* Desktop Sidebar */}
        <div className="prod-sidebar-wrap">
          <Sidebar />
        </div>

        {/* Products area */}
        <div className="prod-main">
          <div className="prod-topbar">
            <h2 className="prod-count"><strong>{visible.length}</strong> Products Found</h2>
            <span className="prod-cat-label">{catLabel}</span>
          </div>

          <motion.div className="prod-grid" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((p, idx) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (idx % 9) * 0.04 }}
                  className="prod-card"
                >
                  <div className="prod-card-img">
                    <img src={p.img} alt={p.title} loading="lazy" />
                    <span className={`prod-cat-badge prod-cat-${p.category}`}>
                      {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                    </span>
                  </div>
                  <div className="prod-card-body">
                    <h4 className="prod-card-title">{p.title}</h4>
                    <div className="prod-card-rating">
                      <Stars rating={p.rating} />
                      <span className="prod-review-count">({p.reviews})</span>
                    </div>
                    <div className="prod-card-price">
                      {p.price
                        ? <><span className="prod-price-val">₹{p.price.toLocaleString('en-IN')}</span></>
                        : <span className="prod-price-quote">Get Quote</span>
                      }
                    </div>
                    <div className="prod-card-actions">
                      <a
                        href={waLink(p.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="prod-enquiry-btn"
                      >
                        💬 Enquiry
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="prod-empty">
              <p>No products match your filters. <button onClick={clearFilters}>Clear filters</button></p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <span className="label-tag" style={{ color: 'rgba(255,140,0,0.9)' }}>Custom Orders Welcome</span>
          <h2>Can't Find What You're Looking For?</h2>
          <p>We craft custom furniture to your exact specifications. Share your idea and we'll bring it to life.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
            <a href={`https://wa.me/${WA}?text=Hi%2C%20I%20need%20custom%20furniture`} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
