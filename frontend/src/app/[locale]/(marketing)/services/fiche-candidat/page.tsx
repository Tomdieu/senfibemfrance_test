'use client'

import { motion } from 'framer-motion'
import { FileCheck, CheckCircle, Users, Building2, Mail } from 'lucide-react'
import Link from 'next/link'

export default function FicheCandidatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fibem-secondary to-fibem-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FileCheck className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Fiche Candidat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Centralisez toutes les informations de vos candidats dans un format structuré
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Gestion professionnelle des candidatures
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              La fiche candidat FIBEM vous permet de collecter, organiser et analyser toutes les informations
              essentielles de vos candidats de manière structurée et professionnelle.
            </p>
            <ul className="space-y-4">
              {[
                'Informations personnelles complètes',
                'Parcours professionnel détaillé',
                'Compétences et certifications',
                'Disponibilité et prétentions salariales',
                'Suivi des entretiens et évaluations',
                'Export et partage sécurisé',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Sections de la fiche</h3>
            <div className="space-y-4">
              {[
                { title: 'Identité', icon: Users, items: ['État civil', 'Contact', 'Mobilité'] },
                { title: 'Profil professionnel', icon: Building2, items: ['Expériences', 'Formation', 'Compétences'] },
                { title: 'Candidature', icon: FileCheck, items: ['Poste visé', 'Disponibilité', 'Salaire'] },
                { title: 'Suivi RH', icon: Mail, items: ['Entretiens', 'Évaluations', 'Décision'] },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-fibem-secondary pl-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <section.icon className="w-5 h-5 text-fibem-primary" />
                    <h4 className="font-bold text-fibem-dark">{section.title}</h4>
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-fibem-secondary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Structuré', desc: 'Format standardisé pour une comparaison facile', color: 'from-fibem-primary to-fibem-secondary' },
            { title: 'Complet', desc: 'Toutes les informations en un seul document', color: 'from-fibem-secondary to-fibem-primary' },
            { title: 'Sécurisé', desc: 'Données protégées et conformes RGPD', color: 'from-fibem-dark to-slate-800' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4`} />
              <h3 className="text-lg font-bold text-fibem-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-fibem-secondary to-fibem-primary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Optimisez votre recrutement</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Utilisez nos fiches candidat pour professionnaliser votre processus de recrutement
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/services/formulaire-cv"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              Voir le formulaire CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}