'use client'

import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { Star, Quote } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'

export default function TestimonialsSection() {
  const t = useScopedI18n('home.testimonials')

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: t('marie.role' as any),
      avatar: 'MD',
      rating: 5,
      text: t('marie.text' as any),
      location: 'Paris'
    },
    {
      id: 2,
      name: 'Jean-Pierre Martin',
      role: t('jeanPierre.role' as any),
      avatar: 'JM',
      rating: 5,
      text: t('jeanPierre.text' as any),
      location: 'Lyon'
    },
    {
      id: 3,
      name: 'Fatou Diallo',
      role: t('fatou.role' as any),
      avatar: 'FD',
      rating: 5,
      text: t('fatou.text' as any),
      location: 'Dakar'
    },
    {
      id: 4,
      name: 'Thomas Bernard',
      role: t('thomas.role' as any),
      avatar: 'TB',
      rating: 4,
      text: t('thomas.text' as any),
      location: 'Marseille'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const testimonialVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-fibem-light" />

              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-fibem-primary rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role} - {testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Star
                      className={`w-4 h-4 ${i < testimonial.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                        }`}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
