import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio')
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <motion.img
          src="/hero-bg.png"
          alt="SreeWoodWorks Premium Interiors"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2218]/70 via-[#2a2218]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2218]/50 via-transparent to-[#2a2218]/20" />
      </div>

      {/* Content overlay — bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 md:pb-28 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-[1.15] mb-5 font-normal"
          >
            Crafting Spaces,
            <br />
            <span className="italic">Elevating Lives.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-md"
          >
            We create functional, beautiful spaces
            tailored to your lifestyle.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={scrollToPortfolio}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 text-xs font-medium tracking-[0.15em] uppercase rounded-sm hover:bg-white/20 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
              <ArrowRight size={14} />
            </motion.button>

            <motion.button
              onClick={() => navigate('/services#quick-repairs')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-medium tracking-[0.15em] uppercase rounded-sm hover:bg-primary-light transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Carpentry Service
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
