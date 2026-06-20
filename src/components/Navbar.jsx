import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      if (pathname === '/') {
        const sections = ['home', 'portfolio', 'testimonials', 'contact']
        let current = 'home'
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i])
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 120) {
              current = sections[i]
              break
            }
          }
        }
        setActiveSection(current)
      } else if (pathname === '/about') {
        setActiveSection('about')
      } else if (pathname === '/services') {
        setActiveSection('services')
      } else if (pathname === '/products') {
        setActiveSection('products')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on mount/path change
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <>
      <motion.div
        id="navbar-wrapper"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled || mobileOpen ? 'pt-4 px-4 lg:px-8' : 'pt-0 px-0'
        }`}
      >
        <nav
          className={`w-full max-w-7xl transition-all duration-500 ${
            scrolled || mobileOpen
              ? 'bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl'
              : 'bg-transparent border border-transparent shadow-none rounded-none'
          }`}
        >
          <div className="px-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/#home"
              className="flex items-center gap-0.5 group"
            >
              <span className="font-heading text-base md:text-lg tracking-[0.2em] text-primary font-light">
                SREE
              </span>
              <span className="font-heading text-base md:text-lg tracking-[0.2em] text-accent font-semibold ml-1">
                WOODWORKS
              </span>
            </Link>

            {/* Desktop Nav — centered */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isAbout = link.name === 'About'
                const isServices = link.name === 'Services'
                const isProducts = link.name === 'Products'
                const isActive = isAbout ? pathname === '/about' : isServices ? pathname === '/services' : isProducts ? pathname === '/products' : activeSection === link.href.replace('/#', '')
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-warm-gray hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-white shadow-xl"
            >
              <div className="flex flex-col pt-20 px-8">
                {navLinks.map((link, index) => {
                  const isAbout = link.name === 'About'
                  const isServices = link.name === 'Services'
                  const isProducts = link.name === 'Products'
                  const isActive = isAbout ? pathname === '/about' : isServices ? pathname === '/services' : isProducts ? pathname === '/products' : activeSection === link.href.replace('/#', '')
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3.5 text-xs font-medium tracking-[0.2em] uppercase border-b border-cream-dark/30 transition-colors ${
                          isActive
                            ? 'text-accent'
                            : 'text-primary/70 hover:text-accent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
