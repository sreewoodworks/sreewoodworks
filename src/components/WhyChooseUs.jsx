import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Hammer, Sparkles, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consult',
    description: 'Understanding your needs',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description: 'Conceptualize and finalize',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Execute',
    description: 'Production and installation',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Deliver',
    description: 'Spaces ready to inspire',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const WhyChooseUs = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <section id="process" className="relative py-24 md:py-32 bg-primary overflow-hidden noise-overlay">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Process</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-6 leading-tight">
              Thoughtful Design.
              <br />
              <span className="italic text-gradient">Seamless Experience.</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              We follow a collaborative approach to ensure the
              finest outcome for you, from start to finish.
            </p>

            <motion.button
              onClick={scrollToContact}
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Project
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Right Process Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 gap-5"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.07] transition-all duration-400"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 font-heading text-3xl font-bold text-white/[0.06]">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <step.icon size={22} strokeWidth={1.5} className="text-accent" />
                </div>

                <h3 className="font-heading text-sm font-bold text-white tracking-[0.1em] uppercase mb-2 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-5 h-[1.5px] w-0 bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
