import { motion } from 'framer-motion'
import { Palette, Layers, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const About = () => {
  // Removed scrollToContact as we now link to the new About page

  return (
    <section id="about" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className="lg:col-span-3"
          >
            <div className="rounded-xl overflow-hidden h-[320px] lg:h-[380px]">
              <img
                src="/portfolio-1.png"
                alt="SreeWoodWorks Interior Design"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 lg:px-4"
          >
            <motion.span variants={fadeInUp} className="section-label">
              Who We Are
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] text-primary leading-[1.2] mb-5"
            >
              Designing spaces
              <br />
              that feel like <span className="italic">you.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-warm-gray text-sm leading-relaxed mb-6 max-w-md"
            >
              At SreeWoodWorks, we believe every space has the potential
              to tell a story. Our designs reflect your personality
              and lifestyle with passion and precision.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              custom={3}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-[0.12em] uppercase hover:text-accent transition-colors duration-300 group"
              >
                Learn More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Feature Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-4 space-y-5"
          >
            <motion.div
              variants={fadeInUp}
              custom={1}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0 mt-0.5">
                <Palette size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-primary tracking-[0.12em] uppercase mb-1">
                  Bespoke Designs
                </h4>
                <p className="text-warm-gray text-xs leading-relaxed">
                  Tailored to your unique style
                </p>
              </div>
            </motion.div>

            <div className="border-b border-cream-dark/40" />

            <motion.div
              variants={fadeInUp}
              custom={2}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0 mt-0.5">
                <Layers size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-primary tracking-[0.12em] uppercase mb-1">
                  End to End Solution
                </h4>
                <p className="text-warm-gray text-xs leading-relaxed">
                  From concept to completion.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
