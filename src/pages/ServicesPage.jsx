import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown, MessageCircle, Phone } from 'lucide-react'
import ServiceCatalog from '../components/ServiceCatalog'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const servicesList = [
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen',
    subtitle: 'Most Popular',
    desc: "A well-designed kitchen is the heart of every home. Our modular kitchens combine intelligent storage, durable materials, and stunning aesthetics to create a cooking space you'll love every day.",
    price: 'Starting ₹1.2L',
    image: '/service-kitchen.png',
    features: [
      'L-shaped, U-shaped, straight & island layouts',
      'Soft-close hinges & drawer systems',
      'Premium laminate, acrylic & membrane finishes',
      'Granite, quartz & engineered stone countertops',
      'Built-in chimney, sink & appliance integration',
      '10-year structural warranty',
    ]
  },
  {
    id: 'wardrobes',
    title: 'Wardrobes',
    subtitle: 'Our Service',
    desc: "From walk-in closets to sliding door wardrobes — every wardrobe we build is a masterclass in organisation. Custom compartments, pull-out trays, and premium hardware for a seamless experience.",
    price: 'Starting ₹55,000',
    image: '/service-wardrobe.png',
    features: [
      'Sliding, hinged & walk-in configurations',
      'Custom internal layouts — shelves, drawers, racks',
      'Mirror panels & backlit interiors available',
      'Anti-rust fittings & soft-close mechanisms',
      'Floor-to-ceiling design for maximum space',
      '8-year hardware warranty',
    ]
  },
  {
    id: 'tv-units',
    title: 'TV Units',
    subtitle: 'Trending',
    desc: "Your living room deserves a focal point that's both functional and beautiful. Our TV units are crafted to house your entertainment setup while doubling as statement furniture.",
    price: 'Starting ₹25,000',
    image: '/service-tvunit.png',
    features: [
      'Wall-mounted & floor-standing options',
      'Cable management built-in',
      'Open shelving, cabinets & display niches',
      'Backlit panel options',
      'Custom widths from 4ft to full wall',
      'Matching side tables available',
    ]
  },
  {
    id: 'doors-windows',
    title: 'Doors & Windows',
    subtitle: 'Our Service',
    desc: "First impressions start at the door. We craft solid wood and engineered wood doors and windows that combine security, insulation, and beauty — built to last decades.",
    price: 'Starting ₹8,000/door',
    image: '/service-doors.png',
    features: [
      'Solid teak, mango & engineered wood',
      'Panel, flush & carved designs',
      'PU finish, enamel & natural polish',
      'UPVC & aluminium windows available',
      'Custom sizes for any opening',
      'Anti-termite treatment included',
    ]
  },
  {
    id: 'office-furniture',
    title: 'Office Furniture',
    subtitle: 'Our Service',
    desc: "A productive workspace starts with the right furniture. We design and build office interiors that reflect your brand — from reception desks to collaborative workstations.",
    price: 'Starting ₹80,000/workspace',
    image: '/service-office.png',
    features: [
      'Executive desks, workstations & cabins',
      'Reception counters & front desks',
      'Conference tables (6 to 24 seater)',
      'Storage walls & filing units',
      'Cable-managed workstation clusters',
      'Corporate branding integration',
    ]
  },
  {
    id: 'custom-carpentry',
    title: 'Custom Carpentry',
    subtitle: 'New',
    desc: "Have a vision that doesn't fit a standard category? Our custom carpentry service brings any idea to life — from heirloom furniture to architectural millwork.",
    price: 'Custom quote',
    image: '/service-custom.png',
    features: [
      'Bespoke dining tables & beds',
      'Staircases, panelling & ceilings',
      'Pooja mandirs & display units',
      "Children's furniture & study units",
      '3D design visualisation before production',
      'Any wood species, any finish',
    ]
  }
]

const materials = [
  { name: 'Teak Wood', desc: 'Premium hardwood with natural grain. Termite-resistant and built for generations.' },
  { name: 'Marine Plywood', desc: 'BWR-grade moisture-resistant ply. The backbone of long-lasting kitchen & bath units.' },
  { name: 'MDF Board', desc: 'Ultra-smooth surface for flawless high-gloss & matte finishes. Cost-effective choice.' },
  { name: 'High-Gloss Laminates', desc: 'Scratch-resistant in 100+ colours. Easy to clean, impossible to ignore.' },
  { name: 'WPC Boards', desc: 'Wood-plastic composite — fully waterproof, eco-friendly, and dimensionally stable.' },
]

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'We visit your space, take measurements, and understand your requirements and budget in detail.' },
  { step: '02', title: '3D Design', desc: 'Our designers create a photorealistic 3D render so you can visualise the result before a single nail is driven.' },
  { step: '03', title: 'Material Selection', desc: 'Choose from our curated range of premium woods, laminates, and European hardware fittings at our showroom.' },
  { step: '04', title: 'Manufacturing', desc: 'All cutting, drilling and finishing happens in our own 8,000 sq.ft workshop. No outsourcing, no surprises.' },
  { step: '05', title: 'Clean Installation', desc: 'Our team installs on-site with minimal disruption to your routine. Site cleaned before we leave.' },
]

const ServicesPage = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
    }
  }

  return (
    <div className="pt-24 lg:pt-32 pb-20 md:pb-28 min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-20 md:mb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl"
        >
          <span className="section-label">Expert Solutions</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.1] mb-6">
            Our Craft. <span className="italic">Your Space.</span>
          </h1>
          <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-10 max-w-lg">
            Custom carpentry & furnishing solutions built to last — designed for the way you live.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-primary-light transition-colors duration-300"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => scrollToSection('categories')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cream text-primary text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#e8dfcf] transition-colors duration-300"
            >
              Browse Services
              <ChevronDown size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Category Jump Grid */}
      <div id="categories" className="bg-cream py-20 md:py-28 mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14"
          >
            <span className="section-label">Six Ways We Transform Spaces</span>
            <p className="text-warm-gray text-xs tracking-wide">Click any category to jump to full details below.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {servicesList.map((service, i) => (
              <motion.button
                key={service.id}
                variants={fadeInUp}
                custom={i}
                onClick={() => scrollToSection(service.id)}
                className="group relative h-40 md:h-48 rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl text-white mb-2">{service.title}</h3>
                  <span className="inline-flex items-center gap-2 text-white/70 text-[10px] tracking-wider uppercase group-hover:text-white transition-colors">
                    View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Repairs & Services Catalog */}
      <div id="quick-repairs" className="bg-white mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center mb-10">
           <span className="section-label">Quick Fixes</span>
           <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1">Book a Carpentry Service</h2>
           <p className="text-warm-gray text-sm mt-3">Affordable, transparent pricing for everyday repairs.</p>
        </div>
        <ServiceCatalog />
      </div>

      {/* Service Details (Zig-Zag) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-24 md:mb-32 space-y-24 md:space-y-40">
        <div className="text-center mb-16">
          <span className="section-label">Service Details</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1">Everything You Need to Know</h2>
        </div>

        {servicesList.map((service, i) => (
          <div key={service.id} id={service.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 !== 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: i % 2 !== 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 w-full"
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
                {service.subtitle}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-5">
                {service.title}
              </h2>
              <p className="text-warm-gray text-sm leading-relaxed mb-6">
                {service.desc}
              </p>
              
              <div className="bg-cream/50 border border-cream-dark/50 rounded-lg py-3 px-5 mb-8 inline-block">
                <p className="text-primary font-medium text-sm">
                  💰 <span className="ml-1">{service.price}</span>
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-warm-gray text-xs lg:text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-[0.12em] uppercase hover:text-accent transition-colors duration-300 group"
              >
                Request a Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Premium Materials */}
      <div className="bg-primary py-20 md:py-28 mb-12 md:mb-16 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14"
          >
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
              Premium Materials
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl mt-1">Built with the Best</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                variants={fadeInUp}
                custom={i}
                className="border-t border-white/10 pt-6"
              >
                <h3 className="font-heading text-xl mb-3">{mat.name}</h3>
                <p className="text-white/50 text-[11px] lg:text-xs leading-relaxed">{mat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Work */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-24 md:mb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">How We Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1">From Vision to Reality</h2>
          <p className="text-warm-gray text-sm mt-3">A transparent 5-step process — no surprises, no delays.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 lg:gap-8">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line for desktop */}
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-full h-[1px] bg-cream-dark" />
              )}
              
              <div className="bg-cream w-12 h-12 rounded-full flex items-center justify-center font-heading text-accent text-lg mb-6 relative z-10">
                {step.step}
              </div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-warm-gray text-[11px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="bg-cream rounded-2xl p-10 md:p-16 text-center"
        >
          <span className="section-label">Get Started</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1 mb-5">
            Let's Build Your Dream Space
          </h2>
          <p className="text-warm-gray text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            Book a free home visit and receive a detailed design + quote within 24 hours. No hidden charges — ever.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-primary-light transition-colors duration-300"
            >
              Book Free Visit
            </Link>
            <a
              href="tel:+919840486789"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary border border-primary/10 text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:border-primary/30 transition-colors duration-300"
            >
              <Phone size={14} /> Call Now
            </a>
            <a
              href="https://wa.me/919840486789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#20b958] transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServicesPage
