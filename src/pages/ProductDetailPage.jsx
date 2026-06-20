import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Star, ChevronLeft, ChevronRight as ChevronRightIcon, ArrowLeft } from 'lucide-react'
import { allProducts } from '../data/products'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = allProducts.find(p => p.id === parseInt(id))

  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    if (product) {
      setMainImage(product.gallery[0])
      window.scrollTo(0, 0)
    }
  }, [product])

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center">
        <h2 className="font-heading text-3xl text-primary mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-cream text-primary text-xs uppercase tracking-wider rounded-sm"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const handleNextImage = () => {
    const currentIndex = product.gallery.indexOf(mainImage)
    const nextIndex = (currentIndex + 1) % product.gallery.length
    setMainImage(product.gallery[nextIndex])
  }

  const handlePrevImage = () => {
    const currentIndex = product.gallery.indexOf(mainImage)
    const prevIndex = (currentIndex - 1 + product.gallery.length) % product.gallery.length
    setMainImage(product.gallery[prevIndex])
  }

  return (
    <div className="pt-24 lg:pt-32 min-h-screen bg-[#faf9f6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] tracking-wider uppercase font-medium mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="text-warm-gray hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} className="text-cream-dark" />
          <Link to="/products" className="text-warm-gray hover:text-primary transition-colors">Products</Link>
          <ChevronRight size={12} className="text-cream-dark" />
          <span className="text-primary truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 pb-20">
          
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-cream aspect-[4/3] group flex items-center justify-center">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-contain p-4 bg-white"
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-105"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-105"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 sm:w-24 aspect-[4/3] shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    mainImage === img ? 'border-accent' : 'border-transparent hover:border-cream-dark'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain bg-white p-1" />
                  {mainImage !== img && <div className="absolute inset-0 bg-white/40" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            
            {/* Top Tags */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-semibold tracking-wider uppercase rounded-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-cream border border-cream-dark/50 text-accent text-[10px] font-semibold tracking-wider uppercase rounded-sm flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4"/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m2 22 5.5-1.5L21.1 6.9a2.83 2.83 0 0 0-4-4L3.5 16.5Z"/></svg>
                {product.tags[1] || 'Customizable'}
              </span>
            </div>

            {/* Title & Rating */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.1] mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-primary font-bold text-sm">{product.rating}</span>
              <span className="text-warm-gray text-xs">({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-warm-gray text-sm sm:text-base leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 pb-10 border-b border-cream-dark/30">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <span className="text-warm-gray text-xs block mb-0.5">{feature.label}:</span>
                    <span className="text-primary text-sm font-medium">{feature.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href={`https://wa.me/919840486789?text=I'm interested in the ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-[#20b958] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                Enquire on WhatsApp
              </a>
              <button 
                onClick={() => navigate('/products')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-cream text-primary text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-cream-dark transition-colors duration-300"
              >
                <ArrowLeft size={14} /> Back to Products
              </button>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-3">
              {product.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white border border-cream-dark rounded-full text-[10px] font-medium tracking-wider uppercase text-primary shadow-sm">
                  <span className="text-accent">✧</span>
                  {badge}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetailPage
