'use client'

import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { Search, UserCheck, FileText, ThumbsUp } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'

export default function HowItWorksSection() {
  const t = useScopedI18n('home.howItWorks')

  const steps = [
    {
      icon: Search,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: 'bg-blue-500'
    },
    {
      icon: UserCheck,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: 'bg-green-500'
    },
    {
      icon: FileText,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: 'bg-purple-500'
    },
    {
      icon: ThumbsUp,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: 'bg-fibem-accent'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16 bg-fibem-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={stepVariants} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ originX: 0 }}
                />
              )}

              <motion.div
                className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <step.icon className="w-10 h-10 text-white" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-fibem-dark rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
              </motion.div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )


}
