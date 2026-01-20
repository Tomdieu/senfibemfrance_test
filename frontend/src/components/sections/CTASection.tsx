'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import { ArrowRight, Users, Building } from 'lucide-react'

export default function CTASection() {
  const cardVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: (direction: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    }),
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* For Professionals */}
          <motion.div
            custom={-1}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-2xl p-8 text-white"
          >
            <motion.div
              className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Building className="w-8 h-8" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Vous êtes un professionnel ?</h3>
            <p className="text-blue-100 mb-6">
              Rejoignez notre réseau de professionnels et développez votre activité.
              Accédez à des centaines de demandes de services chaque jour.
            </p>
            <motion.ul
              className="space-y-2 mb-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                'Visibilité accrue',
                'Gestion simplifiée des devis',
                'Paiements sécurisés',
              ].map((benefit, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2"
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <svg className="w-5 h-5 text-fibem-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/inscription?type=professionnel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-fibem-primary font-semibold rounded-lg hover:bg-fibem-light transition-colors"
              >
                Devenir partenaire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* For Job Seekers */}
          <motion.div
            custom={1}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-fibem-accent to-orange-500 rounded-2xl p-8 text-white"
          >
            <motion.div
              className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="w-8 h-8" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Vous cherchez un emploi ?</h3>
            <p className="text-orange-100 mb-6">
              Créez votre profil et accédez à des centaines d'offres d'emploi.
              Nos recruteurs partenaires recherchent activement des talents.
            </p>
            <motion.ul
              className="space-y-2 mb-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                'CV FIBEM professionnel',
                'Alertes emploi personnalisées',
                'Accompagnement personnalisé',
              ].map((benefit, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2"
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/inscription?type=candidat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-fibem-accent font-semibold rounded-lg hover:bg-orange-50 transition-colors"
              >
                Créer mon profil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )


}
