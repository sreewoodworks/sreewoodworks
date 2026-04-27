import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/',          label: 'Home' },
  { to: '/services',  label: 'Services' },
  { to: '/products',  label: 'Products' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="nav-logo" onClick={close}>
              <span className="logo-mark">🪵</span>
              WoodCraft
            </Link>

            <div className="nav-menu">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            <div className="nav-actions">
              <Link to="/contact" className="btn btn-primary btn-sm">Get Quote</Link>
              <button
                className={`hamburger${open ? ' open' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`nav-overlay${open ? ' show' : ''}`} onClick={close} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer${open ? ' open' : ''}`}>
        <button className="drawer-close" onClick={close} aria-label="Close menu">✕</button>
        <nav className="drawer-links">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={close}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer-cta">
          <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={close}>
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
