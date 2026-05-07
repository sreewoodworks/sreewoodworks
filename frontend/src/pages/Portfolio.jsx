import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PRODUCTS, WA } from '../data/products';
import WhatsAppIcon from '../components/WhatsAppIcon';

const CATEGORIES = ['Kitchen', 'Bedroom', 'Office', 'Living', 'Custom'];
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
  const [searchQuery, setSearchQuery]   = useState('');
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice]         = useState('');
  const [maxPrice, setMaxPrice]         = useState('');
  const [sortBy, setSortBy]             = useState('popular');
  const [applied, setApplied]           = useState({ search: '', cats: [], min: '', max: '', sort: 'popular' });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCat = cat => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const applyFilters = () => {
    setApplied({ search: searchQuery, cats: selectedCats, min: minPrice, max: maxPrice, sort: sortBy });
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCats([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('popular');
    setApplied({ search: '', cats: [], min: '', max: '', sort: 'popular' });
  };

  const visible = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    
    // Search Filter
    if (applied.search.trim()) {
      const q = applied.search.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

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
        <div className="prod-filter-label">SEARCH</div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="prod-search-input"
          onKeyDown={e => e.key === 'Enter' && applyFilters()}
        />
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
                  <Link to={`/products/${p.id}`} className="prod-card-img-link">
                    <div className="prod-card-img">
                      <img src={p.images[0]} alt={p.title} loading="lazy" />
                      <span className={`prod-cat-badge prod-cat-${p.category}`}>
                        {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                      </span>
                      <span className="prod-custom-badge">📐 Custom Size</span>
                      {p.images.length > 1 && (
                        <span className="prod-img-count">{p.images.length} photos</span>
                      )}
                    </div>
                  </Link>
                  <div className="prod-card-body">
                    <h4 className="prod-card-title">{p.title}</h4>
                    <div className="prod-card-rating">
                      <Stars rating={p.rating} />
                      <span className="prod-review-count">({p.reviews})</span>
                    </div>
                    <div className="prod-card-actions">
                      <Link to={`/products/${p.id}`} className="prod-view-btn">
                        View Product →
                      </Link>
                      <a
                        href={waLink(p.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="prod-enquiry-btn"
                      >
                        <WhatsAppIcon size={18} /> Enquiry
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
            <a href={`https://wa.me/${WA}?text=Hi%2C%20I%20need%20custom%20furniture`} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
              <WhatsAppIcon size={22} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
