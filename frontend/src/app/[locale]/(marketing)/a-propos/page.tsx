'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/locales/client'
import { Target, Users, Shield, TrendingUp, Award, Globe, CheckCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AproposPage() {
  const t = useI18n()

  const values = [
    {
      icon: Target,
      title: t('about.ourValues.expertise.title'),
      description: t('about.ourValues.expertise.description'),
      color: 'from-fibem-primary to-fibem-secondary',
      iconBg: 'bg-blue-100',
      iconColor: 'text-fibem-primary'
    },
    {
      icon: Shield,
      title: t('about.ourValues.security.title'),
      description: t('about.ourValues.security.description'),
      color: 'from-green-600 to-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: t('about.ourValues.innovation.title'),
      description: t('about.ourValues.innovation.description'),
      color: 'from-fibem-accent to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-fibem-accent'
    },
  ]

  const stats = [
    { value: '10+', label: t('about.impact.stats.experience'), icon: Award },
    { value: '500+', label: t('about.impact.stats.companies'), icon: Briefcase },
    { value: '95%', label: t('about.impact.stats.satisfaction'), icon: CheckCircle },
    { value: '2', label: t('about.impact.stats.countries'), icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-6">
              {t('about.ourHistory.title')}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {t('about.ourHistory.paragraph1')}
              </p>
              <p>
                {t('about.ourHistory.paragraph2')}
              </p>
              <p>
                {t('about.ourHistory.paragraph3')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{t('about.ourVision.title')}</h3>
                    <p className="text-blue-100">{t('about.ourVision.subtitle')}</p>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {t('about.ourVision.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-fibem-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
              {t('about.ourValues.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('about.ourValues.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-fibem-dark mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* L'Impact FIBEM */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
            {t('about.impact.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('about.impact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-fibem-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-dark mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: t('about.team.roles.evaluation.title'), desc: t('about.team.roles.evaluation.description') },
              { role: t('about.team.roles.legal.title'), desc: t('about.team.roles.legal.description') },
              { role: t('about.team.roles.commercial.title'), desc: t('about.team.roles.commercial.description') },
            ].map((team, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-fibem-light rounded-2xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-fibem-dark mb-3">{team.role}</h3>
                <p className="text-gray-600">{team.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-fibem-dark to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl text-lg"
            >
              {t('about.cta.startButton')}
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
            >
              {t('about.cta.contactButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}