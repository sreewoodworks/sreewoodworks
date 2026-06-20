import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hammer, CheckCircle2, ArrowRight } from 'lucide-react'

const QuickRepairsTeaser = () => {
  return (
    <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent">
                <Hammer size={14} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Expert Carpentry</span>
            </div>
            
            <h2 className="font-heading text-2xl md:text-4xl mb-4">
              Quick & Reliable <br/> <span className="text-accent italic font-light">Everyday Repairs</span>
            </h2>
            
            <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-6 max-w-lg">
              From squeaky doors and wobbly beds to intricate lock installations—our master carpenters are equipped to handle all your daily repair needs with precision and upfront pricing.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'Door & Window Repairs', 
                'Bed Service & Assembly', 
                'Wardrobe & Drawer Fixes', 
                'Drilling & Mounting'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-[11px] md:text-xs text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/services#quick-repairs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              Book a Repair <ArrowRight size={12} />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md lg:w-5/12 shrink-0 relative"
          >
            <div className="aspect-video sm:aspect-[4/3] lg:aspect-[4/3] rounded-xl overflow-hidden relative shadow-2xl">
              <img 
                src="/cat_door_repair_1781922653894.png" 
                alt="Expert Carpentry Repair" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <p className="text-white/80 text-[10px] font-medium uppercase tracking-wider mb-0.5">Services starting from</p>
                <p className="text-white font-heading text-2xl">₹49</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default QuickRepairsTeaser
