import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Brand Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h1 className="font-heading text-xl md:text-2xl tracking-[0.25em]">
            <span className="text-primary font-light">SREE</span>
            <span className="text-accent font-semibold ml-1">WOODWORKS</span>
          </h1>
        </motion.div>

        {/* Loading Bar */}
        <motion.div className="w-32 h-[1px] bg-warm-gray/15 overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Loader
