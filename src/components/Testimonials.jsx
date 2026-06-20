import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Raghunathan',
    role: 'Homeowner, Adyar',
    text: 'SreeWoodWorks transformed our kitchen beyond imagination. The attention to detail in every cabinet, the soft-close drawers, the perfect finish — it\'s like living in a magazine spread.',
    project: 'Modular Kitchen',
  },
  {
    id: 2,
    name: 'Karthik Subramanian',
    role: 'CEO, TechVentures',
    text: 'We hired them for our entire office interior. The executive desks and conference table they built are stunning. Our clients always compliment the woodwork. Truly professional team.',
    project: 'Office Interior',
  },
  {
    id: 3,
    name: 'Lakshmi Narayanan',
    role: 'Homeowner, Anna Nagar',
    text: 'The walk-in wardrobe they designed for our master bedroom is a dream come true. Every shelf, every compartment is perfectly planned. The LED lighting inside adds such a luxury feel.',
    project: 'Custom Wardrobe',
  },
  {
    id: 4,
    name: 'Arjun Venkatesh',
    role: 'Interior Designer',
    text: 'As an interior designer, I\'ve worked with many carpenters. SreeWoodWorks stands out for their precision and reliability. They understand design intent perfectly and execute flawlessly.',
    project: 'Multiple Projects',
  },
  {
    id: 5,
    name: 'Deepa Krishnan',
    role: 'Homeowner, Velachery',
    text: 'From the pooja room with intricate carvings to the entertainment unit — everything was delivered on time and on budget. Their project manager kept us informed at every step.',
    project: 'Complete Home Woodwork',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [current])

  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative py-16 md:py-20 bg-cream overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
        >
          {/* Quote icon */}
          <div className="shrink-0">
            <Quote
              size={40}
              className="text-warm-gray/20"
              fill="currentColor"
            />
          </div>

          {/* Testimonial text */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-primary text-sm md:text-base leading-relaxed"
              >
                {t.text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Author + Navigation */}
          <div className="shrink-0 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                <div className="text-xs font-semibold text-primary tracking-wide uppercase">
                  {t.name}
                </div>
                <div className="text-[10px] text-warm-gray mt-0.5">
                  {t.role}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-8 h-8 rounded-full border border-warm-gray/20 flex items-center justify-center text-warm-gray hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={goNext}
                className="w-8 h-8 rounded-full border border-warm-gray/20 flex items-center justify-center text-warm-gray hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
