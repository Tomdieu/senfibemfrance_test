'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Users, FileText, Target, TrendingUp, Plus, Eye, Edit, Trash2, BarChart3 } from 'lucide-react'
import { useScopedI18n, useI18n } from '@/locales/client'
import { motion } from 'framer-motion'

const myOffers = [
  { id: 1, title: 'Développeur Full-Stack', candidates: 24, views: 156, status: 'active', created: '12/01/2026' },
  { id: 2, title: 'Chef de Projet Digital', candidates: 12, views: 89, status: 'active', created: '10/01/2026' },
  { id: 3, title: 'Commercial B2B', candidates: 8, views: 45, status: 'paused', created: '05/01/2026' },
  { id: 4, title: 'Électricien Qualifié', candidates: 15, views: 78, status: 'closed', created: '01/01/2026' },
]

const candidateProfiles = [
  { id: 1, name: 'Marie Dupont', title: 'Développeuse Full-Stack', experience: '5 ans', location: 'Paris', match: 95 },
  { id: 2, name: 'Jean Martin', title: 'Chef de Projet', experience: '8 ans', location: 'Lyon', match: 88 },
  { id: 3, name: 'Sophie Bernard', title: 'Commerciale B2B', experience: '3 ans', location: 'Paris', match: 82 },
]

export default function RecruteurPage() {
  const t = useScopedI18n('home.emploi.recruteur')
  const [searchQuery, setSearchQuery] = useState('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as any, stiffness: 100 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/emploi/recruteur/nouvelle-offre"
              className="px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg flex items-center gap-3"
            >
              <Plus className="w-5 h-5" />
              {t('hero.actions.post')}
            </Link>
            <Link
              href="/emploi/recruteur/cvtheque"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              <Search className="w-5 h-5" />
              {t('hero.actions.search')}
            </Link>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-fibem-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FileText, label: t('stats.activeOffers'), value: '4', increment: '+3', color: 'text-fibem-primary', bg: 'bg-blue-50' },
            { icon: Users, label: t('stats.applications'), value: '59', increment: '+12', color: 'text-purple-500', bg: 'bg-purple-50' },
            { icon: Eye, label: t('stats.viewsMonth'), value: '368', increment: '+25%', color: 'text-orange-500', bg: 'bg-orange-50' },
            { icon: Target, label: t('stats.responseRate'), value: '85%', color: 'text-green-500', bg: 'bg-green-50' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-fibem-light hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.increment && (
                  <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">{stat.increment}</span>
                )}
              </div>
              <h3 className="text-3xl font-extrabold text-fibem-dark mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* My offers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-fibem-light overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-xl text-fibem-dark">{t('offers.title')}</h2>
                <Link href="/emploi/recruteur/offres" className="text-fibem-primary font-bold text-sm hover:text-fibem-secondary transition-colors underline decoration-2 underline-offset-4">
                  {t('offers.viewAll')}
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {myOffers.map((offer) => (
                  <div key={offer.id} className="px-8 py-6 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-fibem-dark group-hover:text-fibem-primary transition-colors">{offer.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{t('offers.created', { date: offer.created })}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${offer.status === 'active' ? 'bg-green-100 text-green-700' :
                          offer.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {offer.status === 'active' ? t('status.active') : offer.status === 'paused' ? t('status.paused') : t('status.closed')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-fibem-primary" />
                          {t('offers.candidates', { count: offer.candidates })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-fibem-primary" />
                          {t('offers.views', { count: offer.views })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 text-gray-400 hover:text-fibem-primary hover:bg-fibem-light rounded-lg transition-all">
                          <BarChart3 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-fibem-primary hover:bg-fibem-light rounded-lg transition-all">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6">
                <Link
                  href="/emploi/recruteur/nouvelle-offre"
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-fibem-primary hover:text-fibem-primary hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  {t('offers.new')}
                </Link>
              </div>
            </div>
          </div>

          {/* Suggested profiles */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-fibem-light overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100">
                <h2 className="font-bold text-xl text-fibem-dark">{t('suggestions.title')}</h2>
                <p className="text-sm text-gray-400 mt-1">{t('suggestions.subtitle')}</p>
              </div>
              <div className="divide-y divide-gray-50">
                {candidateProfiles.map((profile) => (
                  <div key={profile.id} className="px-8 py-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-fibem-primary to-fibem-secondary rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-fibem-dark">{profile.name}</h4>
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            {profile.match}% match
                          </span>
                        </div>
                        <p className="text-sm text-fibem-primary font-bold">{profile.title}</p>
                        <p className="text-xs text-gray-400 font-medium mt-1">{profile.experience} • {profile.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-2.5 text-xs font-bold border-2 border-fibem-primary text-fibem-primary rounded-xl hover:bg-fibem-light transition-all duration-300 uppercase tracking-wider">
                        {t('suggestions.viewProfile')}
                      </button>
                      <button className="flex-1 py-2.5 text-xs font-bold bg-fibem-dark text-white rounded-xl hover:bg-slate-700 transition-all duration-300 shadow-md uppercase tracking-wider text-center">
                        {t('suggestions.contact')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50/50">
                <Link
                  href="/emploi/recruteur/cvtheque"
                  className="block text-center text-fibem-primary font-bold hover:text-fibem-secondary transition-colors underline decoration-2 underline-offset-4"
                >
                  {t('suggestions.cvtheque')}
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-2xl shadow-sm border border-fibem-light p-8">
              <h2 className="font-bold text-xl text-fibem-dark mb-8">{t('tools.title')}</h2>
              <div className="space-y-6">
                <Link href="/emploi/recruteur/simulateur" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-200/50">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fibem-dark group-hover:text-fibem-primary transition-colors">{t('tools.simulator.title')}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{t('tools.simulator.desc')}</p>
                  </div>
                </Link>
                <Link href="/emploi/recruteur/fiches-metier" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-200/50">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fibem-dark group-hover:text-fibem-primary transition-colors">{t('tools.guides.title')}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{t('tools.guides.desc')}</p>
                  </div>
                </Link>
                <Link href="/emploi/recruteur/statistiques" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-200/50">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fibem-dark group-hover:text-fibem-primary transition-colors">{t('tools.stats.title')}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{t('tools.stats.desc')}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
