import { motion } from 'framer-motion'
import { Home, Building2, RefreshCw, Armchair, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 1,
    icon: Home,
    title: 'Residential',
    description: 'Homes that reflect comfort and elegance',
  },
  {
    id: 2,
    icon: Building2,
    title: 'Commercial',
    description: 'Functional spaces that inspire success',
  },
  {
    id: 3,
    icon: RefreshCw,
    title: 'Renovation',
    description: 'Transforming spaces with a fresh perspective',
  },
  {
    id: 4,
    icon: Armchair,
    title: 'Custom Furniture',
    description: 'Bespoke pieces, crafted with care',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const Services = () => {
  // Removed scrollToContact as we now link to the new Services page

  return (
    <section id="services" className="relative py-20 md:py-28 bg-cream overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Our Services</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1">
            How we can help
          </h2>
        </motion.div>

        {/* Services Grid — 4 cards with dividers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-beige-dark/50 rounded-xl overflow-hidden bg-white"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={`group text-center py-10 px-6 transition-colors duration-300 hover:bg-cream/60 ${
                index < services.length - 1 ? 'lg:border-r border-beige-dark/50' : ''
              } ${index < 2 ? 'border-b lg:border-b-0 border-beige-dark/50' : ''}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full border border-warm-gray/20 flex items-center justify-center mx-auto mb-5 group-hover:border-accent/50 transition-colors duration-300">
                <service.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-primary/70 group-hover:text-accent transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-[11px] font-semibold text-primary tracking-[0.12em] uppercase mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-warm-gray text-xs leading-relaxed max-w-[160px] mx-auto">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-[10px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-primary-light transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View All Services
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
