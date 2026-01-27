'use client'

import { Globe, Target, Users, Shield, TrendingUp, Award, Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import { useScopedI18n } from '@/locales/client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function AboutPage() {
  const t = useScopedI18n('about')

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
    <div className="min-h-screen bg-gradient-to-b from-fibem-surface to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fibem-dark via-fibem-primary to-fibem-dark/90 py-24">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zM10 10c0-5.523-4.477-10-10-10S0 4.477 0 10s4.477 10 10 10 10-4.477 10-10zM80 10c0-5.523-4.477-10-10-10S60 4.477 60 10s4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
                  <p className="text-fibem-textSecondary text-lg leading-relaxed">
                    {t('vision.description')}
                  </p>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {t('about.ourVision.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="bg-gradient-to-b from-white to-fibem-surface/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-white border border-fibem-border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-fibem-textPrimary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-fibem-textSecondary">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
      </div>

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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="bg-white border border-fibem-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-fibem-primary/20 to-fibem-dark/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-20 h-20 text-fibem-primary/30" />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-fibem-textPrimary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-fibem-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-fibem-textSecondary">
                      {member.expertise}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
  </div>
</div>

<div className="bg-gradient-to-r from-fibem-dark to-fibem-primary py-20">
  <div className="max-w-4xl mx-auto px-4 text-center text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-white">
        {t('cta.title')}
      </h3>
      <p className="text-blue-100 text-lg max-w-2xl mx-auto">
        {t('cta.subtitle')}
      </p>
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button size="lg" className="bg-white text-fibem-primary hover:bg-gray-100">
          {t('cta.contact')} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
          {t('cta.jobs')}
        </Button>
      </div>
    </motion.div>
  </div>
</div>
</div>)
}