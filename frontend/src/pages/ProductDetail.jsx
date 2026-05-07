import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PRODUCTS, WA } from '../data/products';
import WhatsAppIcon from '../components/WhatsAppIcon';

function Stars({ rating }) {
  return (
    <span className="prod-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db', fontSize: '1.1rem' }}>★</span>
      ))}
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = ALL_PRODUCTS.find(p => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary">← Back to Products</Link>
      </div>
    );
  }

  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(`Hi, I'm interested in "${product.title}". Please share more details and pricing.`)}`;

  return (
    <div className="pd-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb container">
        <Link to="/">Home</Link>
        <span className="sep">›</span>
        <Link to="/products">Products</Link>
        <span className="sep">›</span>
        <span>{product.title}</span>
      </div>

      <div className="pd-layout container">
        {/* ── Left: Image Gallery ── */}
        <div className="pd-gallery">
          {/* Main image */}
          <div className="pd-main-img-wrap">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.title}
                className="pd-main-img"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
            {product.images.length > 1 && (
              <>
                <button
                  className="pd-arrow pd-arrow-left"
                  onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                  aria-label="Previous image"
                >‹</button>
                <button
                  className="pd-arrow pd-arrow-right"
                  onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                  aria-label="Next image"
                >›</button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.title} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info ── */}
        <motion.div
          className="pd-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
        >
          {/* Badges row */}
          <div className="pd-badges-row">
            <span className={`prod-cat-badge prod-cat-${product.category} pd-cat-badge`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <span className="pd-custom-size-badge">📐 Custom Size Available</span>
          </div>

          <h1 className="pd-title">{product.title}</h1>

          {/* Rating row */}
          <div className="pd-rating-row">
            <Stars rating={product.rating} />
            <span className="pd-rating-val">{product.rating}</span>
            <span className="pd-review-count">({product.reviews} reviews)</span>
          </div>

          <div className="pd-divider" />

          {/* Description */}
          <p className="pd-description">{product.description}</p>

          {/* Specs */}
          {product.specs && (
            <ul className="pd-specs">
              {product.specs.map((s, i) => (
                <li key={i}><span className="pd-spec-dot">▸</span>{s}</li>
              ))}
            </ul>
          )}

          <div className="pd-divider" />

          {/* Actions */}
          <div className="pd-actions">
            <motion.a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="pd-enquiry-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon size={20} /> Enquire on WhatsApp
            </motion.a>
            <button className="pd-back-btn" onClick={() => navigate('/products')}>
              ← Back to Products
            </button>
          </div>

          {/* Trust badges */}
          <div className="pd-trust">
            <span>🏅 100% Solid Wood</span>
            <span>🔨 Handcrafted</span>
            <span>🚚 Delivery Available</span>
            <span>📐 Custom Sizes</span>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <RelatedProducts current={product} />
    </div>
  );
}

function RelatedProducts({ current }) {
  const related = ALL_PRODUCTS
    .filter(p => p.id !== current.id && p.category === current.category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="pd-related container">
      <h3 className="pd-related-title">You May Also Like</h3>
      <div className="pd-related-grid">
        {related.map(p => (
          <motion.div
            key={p.id}
            className="prod-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={`/products/${p.id}`} className="pd-rel-img-link">
              <div className="prod-card-img">
                <img src={p.images[0]} alt={p.title} loading="lazy" />
                <span className={`prod-cat-badge prod-cat-${p.category}`}>
                  {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                </span>
              </div>
            </Link>
            <div className="prod-card-body">
              <h4 className="prod-card-title">{p.title}</h4>
              <div className="prod-card-price">
                {p.price
                  ? <span className="prod-price-val">₹{p.price.toLocaleString('en-IN')}</span>
                  : <span className="prod-price-quote">Get Quote</span>
                }
              </div>
              <Link to={`/products/${p.id}`} className="pd-view-btn">View Product →</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
