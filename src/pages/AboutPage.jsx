import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Target, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const AboutPage = () => {
  return (
    <div className="pt-24 lg:pt-32 pb-20 md:pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header / Stats Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="section-label">About Us</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.1] mb-6">
              A legacy of
              <br />
              <span className="italic">craftsmanship.</span>
            </h1>
            <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              SreeWoodWorks is an interior design studio crafting timeless, functional spaces. We believe that every space has the potential to tell a unique story.
            </p>

            <div className="flex gap-10 md:gap-16">
              <div>
                <h3 className="font-heading text-4xl md:text-5xl text-accent mb-2">25+</h3>
                <p className="text-[11px] font-semibold text-primary tracking-[0.12em] uppercase">
                  Years in Business
                </p>
              </div>
              <div>
                <h3 className="font-heading text-4xl md:text-5xl text-accent mb-2">1200+</h3>
                <p className="text-[11px] font-semibold text-primary tracking-[0.12em] uppercase">
                  Projects Completed
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl overflow-hidden h-[400px] lg:h-[500px]"
          >
            <img 
              src="/about-workshop.png" 
              alt="SreeWoodWorks Workshop" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-24 md:mb-32"
        >
          <div className="text-center mb-14">
            <motion.span variants={fadeInUp} className="section-label">
              What We Stand For
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={1} className="font-heading text-3xl sm:text-4xl text-primary mt-1">
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'Quality First', desc: 'We source the finest materials and employ master craftsmen to ensure every piece stands the test of time.', icon: ShieldCheck },
              { title: 'Client Trust', desc: 'Transparency and integrity are at the heart of everything we do. We build relationships as strong as our woodwork.', icon: CheckCircle2 },
              { title: 'Precision Work', desc: 'From exact measurements to flawless finishes, our attention to detail guarantees exceptional results every time.', icon: Target },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={i + 2}
                className="bg-cream rounded-xl p-8 lg:p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <value.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-primary tracking-[0.1em] uppercase mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray text-xs leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="bg-primary rounded-2xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden"
        >
          {/* Subtle background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="section-label !text-white/40">Let's Work Together</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mt-1 mb-5">
              Start Your Project with Us
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10">
              Book a free consultation today. Our designers will visit your space, understand your needs, and deliver a detailed design + quote within 24 hours.
            </p>
            
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-accent-light transition-colors duration-300"
            >
              Book Free Visit
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default AboutPage
