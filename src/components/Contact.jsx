import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98404 86789'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['sreewoodworks25@gmail.com'],
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['5/129, Elango nagar,', 'Kottivakkam, Chennai - 600041'],
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Mon - Sat: 9 AM - 7 PM'],
  },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email || 'N/A'}%0A*Service Required:* ${formData.service}%0A*Project Details:* ${formData.message}`
    
    // Open WhatsApp link in a new tab
    window.open(`https://wa.me/919840486789?text=${whatsappMessage}`, '_blank')

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormData({ name: '', phone: '', email: '', service: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mt-1 mb-3">
            Start your project
          </h2>
          <p className="text-warm-gray text-sm max-w-md mx-auto">
            Ready to transform your space? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="flex gap-3 items-start"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-cream flex items-center justify-center">
                  <item.icon size={16} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-0.5">{item.title}</h4>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-warm-gray text-[11px]">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="rounded-lg overflow-hidden h-40 mt-4"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7775.909817270122!2d80.2528561!3d12.974735899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d69be2d0009%3A0x74aa93593b69fe95!2sSree%20Wood%20Works!5e0!3m2!1sen!2sin!4v1781925823566!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SreeWoodWorks Location"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-6 md:p-8 rounded-xl bg-cream">
              <h3 className="font-heading text-lg font-semibold text-primary mb-1">
                Request a Free Quote
              </h3>
              <p className="text-warm-gray text-[11px] mb-6">
                Fill in your details and we'll get back within 24 hours.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 mb-5 rounded-lg bg-green-50 border border-green-200 text-green-700"
                >
                  <CheckCircle size={16} />
                  <span className="text-[11px] font-medium">
                    Thank you! We'll respond shortly.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-medium text-primary mb-1 tracking-wider uppercase">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-beige-dark/60 text-primary text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-accent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-[10px] font-medium text-primary mb-1 tracking-wider uppercase">
                      Phone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-beige-dark/60 text-primary text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-accent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-medium text-primary mb-1 tracking-wider uppercase">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-beige-dark/60 text-primary text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-accent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="block text-[10px] font-medium text-primary mb-1 tracking-wider uppercase">
                      Service *
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-beige-dark/60 text-primary text-sm focus:outline-none focus:border-accent transition-all duration-300 appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="residential">Residential Interior</option>
                      <option value="commercial">Commercial Interior</option>
                      <option value="renovation">Renovation</option>
                      <option value="custom">Custom Furniture</option>
                      <option value="complete">Complete Home Interior</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-medium text-primary mb-1 tracking-wider uppercase">
                    Your Project *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe your requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-beige-dark/60 text-primary text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-accent transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-[10px] font-medium tracking-[0.18em] uppercase rounded-sm hover:bg-primary-light transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={12} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
