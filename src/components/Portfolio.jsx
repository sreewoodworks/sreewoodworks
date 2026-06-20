import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Portfolio = ({ images, onImageClick }) => {
  // Show first 5 images for varied grid
  const displayImages = images.slice(0, 5)

  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1">
            Spaces we've created
          </h2>
        </motion.div>

        {/* Gallery Grid — varied layout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4"
        >
          {/* Row 1: 3 images */}
          <div
            className="col-span-3 lg:col-span-4 group relative rounded-lg overflow-hidden cursor-pointer h-52 md:h-64"
            onClick={() => onImageClick(0)}
          >
            <img
              src={displayImages[0]?.src}
              alt={displayImages[0]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          <div
            className="col-span-3 lg:col-span-4 group relative rounded-lg overflow-hidden cursor-pointer h-52 md:h-64"
            onClick={() => onImageClick(1)}
          >
            <img
              src={displayImages[1]?.src}
              alt={displayImages[1]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          <div
            className="col-span-6 lg:col-span-4 group relative rounded-lg overflow-hidden cursor-pointer h-52 md:h-64"
            onClick={() => onImageClick(2)}
          >
            <img
              src={displayImages[2]?.src}
              alt={displayImages[2]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          {/* Row 2: 2 images */}
          <div
            className="col-span-3 lg:col-span-6 group relative rounded-lg overflow-hidden cursor-pointer h-48 md:h-60"
            onClick={() => onImageClick(3)}
          >
            <img
              src={displayImages[3]?.src}
              alt={displayImages[3]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          <div
            className="col-span-3 lg:col-span-6 group relative rounded-lg overflow-hidden cursor-pointer h-48 md:h-60"
            onClick={() => onImageClick(4)}
          >
            <img
              src={displayImages[4]?.src}
              alt={displayImages[4]?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        </motion.div>

        {/* View All Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-10"
        >
          <button
            className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-[0.12em] uppercase hover:text-accent transition-colors duration-300 group"
            onClick={() => onImageClick(0)}
          >
            View All Projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-[0.12em] uppercase hover:text-accent transition-colors duration-300 group"
          >
            View Our Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
