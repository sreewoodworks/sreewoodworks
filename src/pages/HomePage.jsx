import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import QuickRepairsTeaser from '../components/QuickRepairsTeaser'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Lightbox from '../components/Lightbox'

const HomePage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const portfolioImages = [
    { src: '/modular-kitchen.png', title: 'Modern Modular Kitchen', category: 'Kitchens' },
    { src: '/wardrobe.png', title: 'Custom Walk-in Wardrobe', category: 'Wardrobes' },
    { src: '/service-office.png', title: 'Executive Office Suite', category: 'Office' },
    { src: '/custom-woodwork.png', title: 'Artisan Wood Carving', category: 'Custom' },
    { src: '/portfolio-1.png', title: 'Entertainment Unit', category: 'Living Room' },
    { src: '/portfolio-2.png', title: 'Dining Table Set', category: 'Dining' },
    { src: '/portfolio-3.png', title: 'Walk-in Closet', category: 'Wardrobes' },
    { src: '/about-workshop.png', title: 'Our Workshop', category: 'Behind the Scenes' },
  ]

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="w-full pt-16 lg:pt-20">
      <Hero />
      <About />
      <Services />
      <QuickRepairsTeaser />
      <Portfolio images={portfolioImages} onImageClick={openLightbox} />
      <Testimonials />
      <Contact />

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={portfolioImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
