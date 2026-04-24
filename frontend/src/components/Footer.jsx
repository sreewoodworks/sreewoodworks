import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <span className="logo-mark">🪵</span>
              WoodCraft
            </Link>
            <p>
              Premium carpentry &amp; furnishing crafted with passion. We turn raw wood
              into timeless pieces that elevate every space — from modular kitchens to
              bespoke office furniture.
            </p>
            <div className="footer-social">
              {[
                { icon: 'f', label: 'Facebook',  href: '#' },
                { icon: 'in', label: 'Instagram', href: '#' },
                { icon: 'yt', label: 'YouTube',   href: '#' },
                { icon: 'wa', label: 'WhatsApp',  href: 'https://wa.me/919876543210' },
              ].map(s => (
                <a key={s.label} href={s.href} className="soc-btn" aria-label={s.label} target="_blank" rel="noreferrer">
                  {s.icon === 'f'  && '📘'}
                  {s.icon === 'in' && '📸'}
                  {s.icon === 'yt' && '▶️'}
                  {s.icon === 'wa' && '💬'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <nav className="footer-links">
              {[
                { to: '/',          label: 'Home' },
                { to: '/services',  label: 'Services' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/about',     label: 'About Us' },
                { to: '/contact',   label: 'Contact' },
              ].map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
            </nav>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h5>Services</h5>
            <nav className="footer-links">
              {['Modular Kitchen', 'Wardrobes', 'TV Units', 'Doors & Windows', 'Office Furniture', 'Custom Carpentry'].map(s => (
                <Link key={s} to="/services">{s}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact Us</h5>
            <ul className="footer-contact-list">
              <li className="fci"><span className="icon">📍</span><span>Banjara Hills, Hyderabad, Telangana — 500034</span></li>
              <li className="fci"><span className="icon">📞</span><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li className="fci"><span className="icon">📧</span><a href="mailto:info@woodcraft.in">info@woodcraft.in</a></li>
              <li className="fci"><span className="icon">🕒</span><span>Mon – Sat: 9 AM – 7 PM</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} WoodCraft. All rights reserved.</span>
          <span>Crafted with ❤️ in Hyderabad · <a href="/privacy">Privacy Policy</a></span>
        </div>
      </div>
    </footer>
  );
}
