import { Link } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon';
import { Mail } from 'lucide-react';

const ContactSvg = {
  pin: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M20 4C14 4 9 9 9 15c0 8 11 19 11 19s11-11 11-19c0-6-5-11-11-11z"/>
      <circle cx="20" cy="15" r="4.5"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M11 8h5l2.5 6-3.5 2.5c1.5 3.5 5 7 8.5 8.5L26 21.5l6 2.5V29c0 1.5-1 2.5-2.5 2.5C15 31.5 8.5 17 8.5 11 8.5 9.5 9.5 8 11 8z"/>
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="5" y="10" width="30" height="21" rx="2.5"/>
      <path d="M5 12l15 11 15-11"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="20" cy="20" r="13"/>
      <path d="M20 11v10l6 4"/>
    </svg>
  ),
};

const IconBox = ({ svg }) => (
  <div style={{ width:'34px', height:'34px', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.75)', background:'rgba(255,255,255,0.08)', flexShrink:0 }}>
    {svg}
  </div>
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <img src="/logo.png" alt="SreeWoodWorks" className="nav-logo-img" />
            </Link>
            <p>
              Premium carpentry &amp; furnishing crafted with passion. We turn raw wood
              into timeless pieces that elevate every space — from modular kitchens to
              bespoke office furniture.
            </p>
            <div className="footer-social">
              <a href="https://wa.me/919840486789" className="soc-btn" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} />
              </a>
              <a href="mailto:sreewoodworks25@gmail.com" className="soc-btn" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <nav className="footer-links">
              {[
                { to: '/',          label: 'Home' },
                { to: '/services',  label: 'Services' },
                { to: '/products', label: 'Products' },
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
              <li className="fci"><IconBox svg={ContactSvg.pin}     /><a href="https://maps.app.goo.gl/xspDJ6RNdctCrP8r9" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>5/129, Elango nagar, Kottivakkam, Chennai — 600041</a></li>
              <li className="fci"><IconBox svg={ContactSvg.phone}   /><a href="tel:+919840486789">+91 9840486789</a></li>
              <li className="fci"><IconBox svg={ContactSvg.envelope}/><a href="mailto:sreewoodworks25@gmail.com">sreewoodworks25@gmail.com</a></li>
              <li className="fci"><IconBox svg={ContactSvg.clock}   /><span>Mon – Sat: 9 AM – 7 PM</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Sree Wood Works. All rights reserved.</span>
          <span>Crafted with ❤️ in Chennai · <a href="/privacy">Privacy Policy</a></span>
        </div>
      </div>
    </footer>
  );
}
