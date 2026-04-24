import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  /* Scroll-reveal observer */
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.prepend(bar);

    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(pct, 100).toFixed(1) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const observe = () => document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    observe();

    /* Re-observe after route change (small delay for render) */
    const timer = setTimeout(observe, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      clearTimeout(timer);
      bar.remove();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Mobile sticky CTA */}
      <div className="sticky-cta">
        <a href="tel:+919876543210" className="btn btn-primary btn-sm">📞 Call Now</a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">💬 WhatsApp</a>
      </div>
    </>
  );
}
