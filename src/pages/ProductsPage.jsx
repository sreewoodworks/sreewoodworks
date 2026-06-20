import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Filter, MessageCircle, Star, Phone, ChevronDown, X, CheckCircle2 } from 'lucide-react'

import { categories, allProducts } from '../data/products'
import Checkbox from '../components/Checkbox'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const ProductsPage = () => {
  const [search, setSearch] = useState('')
  const [selectedCats, setSelectedCats] = useState([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = allProducts

    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (selectedCats.length > 0) {
      result = result.filter(p => selectedCats.includes(p.category))
    }

    return result
  }, [search, selectedCats])

  const handleCatToggle = (cat) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCats([])
  }

  return (
    <div className="pt-24 lg:pt-32 min-h-screen bg-[#faf9f6]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-cream-dark/30">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl text-primary mb-2">Our Collection</h1>
            <p className="text-warm-gray text-sm">Explore our premium crafted furniture and interior solutions.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="text-primary text-sm font-medium">
              <span className="text-accent">{filteredProducts.length}</span> Products Found
            </p>
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-cream text-primary text-xs font-medium tracking-wider uppercase rounded-sm"
            >
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-72 shrink-0 ${mobileFiltersOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="font-heading text-xl text-primary">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-warm-gray"><X size={24} /></button>
            </div>

            <div className="space-y-8 sticky top-32">
              
              {/* Search */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Search</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-cream-dark rounded-sm py-2.5 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                  <Search size={16} className="absolute left-3 top-3 text-warm-gray" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Category</h3>
                <div className="space-y-2.5">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center gap-3 group">
                      <Checkbox 
                        id={`cat-${cat}`}
                        checked={selectedCats.includes(cat)}
                        onChange={() => handleCatToggle(cat)}
                      />
                      <label htmlFor={`cat-${cat}`} className="text-sm text-warm-gray group-hover:text-primary transition-colors cursor-pointer">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Sort removed as per request */}

              {/* Actions */}
              <div className="pt-4 border-t border-cream-dark/30">
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full lg:hidden py-3 bg-primary text-white text-xs tracking-wider uppercase mb-3"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={clearFilters}
                  className="w-full py-2.5 text-warm-gray hover:text-primary text-xs tracking-wider uppercase transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    variants={fadeInUp}
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-cream hover:shadow-xl hover:border-cream-dark/30 transition-all duration-300 group flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-cream">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-sm">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Bottom Image Overlays */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <div className="flex flex-col gap-1.5">
                          {product.tags.map(tag => (
                            <span key={tag} className="w-fit px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] tracking-wider uppercase rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-sm flex items-center gap-1">
                          {product.photosCount} Photos
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-lg text-primary leading-snug mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-accent">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <span className="text-warm-gray text-[10px]">({product.reviews})</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-cream flex items-center justify-between gap-3">
                        <Link 
                          to={`/products/${product.id}`}
                          className="px-4 py-1.5 bg-cream text-primary text-[10px] tracking-wider uppercase rounded-sm hover:bg-cream-dark transition-colors"
                        >
                          View Product
                        </Link>
                        <a 
                          href={`https://wa.me/919840486789?text=I'm interested in the ${product.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 bg-[#25D366] text-white flex items-center gap-1.5 text-[10px] tracking-wider uppercase rounded-sm hover:bg-[#20b958] transition-colors"
                        >
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg> Inquire
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-primary text-lg mb-2">No products found</p>
                  <p className="text-warm-gray text-sm">Try adjusting your filters or search term.</p>
                  <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-cream text-primary text-xs uppercase tracking-wider rounded-sm">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA aligned with luxury aesthetic */}
      <div className="mt-32 bg-primary py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
            Custom Manufacturing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-5">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-10">
            We craft custom furniture to your exact specifications. Share your ideas and we'll bring it to life with precision and care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-accent-light transition-colors duration-300"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/919840486789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#20b958] transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
