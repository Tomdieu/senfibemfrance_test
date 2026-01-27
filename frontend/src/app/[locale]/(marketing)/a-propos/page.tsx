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
      icon: Shield,
      title: t('values.trust.title'),
      description: t('values.trust.description'),
      color: 'bg-fibem-primary/10',
      iconColor: 'text-fibem-primary'
    },
    {
      icon: Target,
      title: t('values.excellence.title'),
      description: t('values.excellence.description'),
      color: 'bg-fibem-secondary/10',
      iconColor: 'text-fibem-secondary'
    },
    {
      icon: Users,
      title: t('values.innovation.title'),
      description: t('values.innovation.description'),
      color: 'bg-fibem-accent/10',
      iconColor: 'text-fibem-accent'
    },
    {
      icon: Globe,
      title: t('values.impact.title'),
      description: t('values.impact.description'),
      color: 'bg-fibem-secondary/20',
      iconColor: 'text-fibem-secondary'
    }
  ]

  const milestones = [
    { year: '2018', title: t('milestones.foundation.title'), description: t('milestones.foundation.description') },
    { year: '2019', title: t('milestones.expansion.title'), description: t('milestones.expansion.description') },
    { year: '2020', title: t('milestones.innovation.title'), description: t('milestones.innovation.description') },
    { year: '2022', title: t('milestones.growth.title'), description: t('milestones.growth.description') },
    { year: '2023', title: t('milestones.recognition.title'), description: t('milestones.recognition.description') }
  ]

  const team = [
    { name: 'Sophie Martin', role: t('team.ceo.role'), expertise: t('team.ceo.expertise'), image: '/team/ceo.jpg' },
    { name: 'Thomas Dubois', role: t('team.cto.role'), expertise: t('team.cto.expertise'), image: '/team/cto.jpg' },
    { name: 'Fatou Diop', role: t('team.africa.role'), expertise: t('team.africa.expertise'), image: '/team/africa.jpg' },
    { name: 'Pierre Lemoine', role: t('team.sales.role'), expertise: t('team.sales.expertise'), image: '/team/sales.jpg' }
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
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Image src="/logo.png" alt="FIBEM" width={20} height={20} className="w-5 h-5" />
              <span className="text-sm font-medium text-white">{t('badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('title')} <span className="text-fibem-secondary">{t('subtitle')}</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              {t('description')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-fibem-primary hover:bg-gray-100">
                {t('cta.team')} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('cta.values')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold">
              <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
              {t('mission.title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary">
              {t('mission.heading')}<br />
              <span className="text-fibem-primary">{t('mission.highlight')}</span>
            </h2>
            <p className="text-lg text-fibem-textSecondary leading-relaxed">
              {t('mission.description')}
            </p>
            <div className="space-y-4">
              {[
                t('mission.points.expertise'),
                t('mission.points.platform'),
                t('mission.points.network'),
                t('mission.points.support')
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-fibem-accent" />
                  <span className="text-fibem-textPrimary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-fibem-primary/5 to-fibem-dark/5 border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-fibem-primary to-fibem-dark rounded-xl flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      {t('vision.title')}
                      <p className="text-fibem-textSecondary">{t('vision.subtitle')}</p>
                    </div>
                  </div>
                  <p className="text-fibem-textSecondary text-lg leading-relaxed">
                    {t('vision.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="bg-gradient-to-b from-white to-fibem-surface/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold mb-4">
              <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
              {t('values.title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary mb-4">
              {t('values.heading')}
            </h2>
            <p className="text-fibem-textSecondary max-w-2xl mx-auto">
              {t('values.description')}
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

      {/* Notre Histoire */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold mb-4">
            <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
            {t('history.title')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary mb-4">
            {t('history.heading')}
          </h2>
          <p className="text-fibem-textSecondary max-w-2xl mx-auto">
            {t('history.description')}
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-fibem-primary via-fibem-secondary to-fibem-primary"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2">
                  <div className={`p-6 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`inline-flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 bg-fibem-primary rounded-full"></div>
                      <span className="text-sm font-semibold text-fibem-primary">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-fibem-textPrimary mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-fibem-textSecondary">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-white border-4 border-fibem-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Notre Équipe */}
      <div className="bg-gradient-to-b from-fibem-surface to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold mb-4">
              <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
              {t('team.title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary mb-4">
              {t('team.heading')}
            </h2>
            <p className="text-fibem-textSecondary max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
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

      {/* Call-to-action */}
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

<div className="max-w-7xl mx-auto px-4 py-16">
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold mb-4">
      <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
      {t('history.title')}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary mb-4">
      {t('history.heading')}
    </h2>
    <p className="text-fibem-textSecondary max-w-2xl mx-auto">
      {t('history.description')}
    </p>
  </div>
  
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-fibem-primary via-fibem-secondary to-fibem-primary"></div>
    
    <div className="space-y-12">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <div className="w-1/2">
            <div className={`p-6 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className={`inline-flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-3 h-3 bg-fibem-primary rounded-full"></div>
                <span className="text-sm font-semibold text-fibem-primary">{milestone.year}</span>
              </div>
              <h3 className="text-xl font-bold text-fibem-textPrimary mb-2">
                {milestone.title}
              </h3>
              <p className="text-fibem-textSecondary">
                {milestone.description}
              </p>
            </div>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-white border-4 border-fibem-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
            </div>
          </div>
          
          <div className="w-1/2"></div>
        </motion.div>
      ))}
    </div>
  </div>
</div>

<div className="bg-gradient-to-b from-fibem-surface to-white py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 text-fibem-primary font-semibold mb-4">
        <div className="w-2 h-2 bg-fibem-primary rounded-full"></div>
        {t('team.title')}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-fibem-textPrimary mb-4">
        {t('team.heading')}
      </h2>
      <p className="text-fibem-textSecondary max-w-2xl mx-auto">
        {t('team.description')}
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, index) => (
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