'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, Calendar, TrendingUp, Download } from 'lucide-react'
import Link from 'next/link'

export default function FeuilleHeuresPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-fibem-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Clock className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Feuille d'Heures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Suivez précisément le temps de travail de vos collaborateurs
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Gestion du temps simplifiée
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre feuille d'heures FIBEM vous permet de suivre avec précision le temps de travail,
              les heures supplémentaires et les absences de vos collaborateurs.
            </p>
            <ul className="space-y-4">
              {[
                'Suivi quotidien des heures',
                'Calcul automatique des heures supplémentaires',
                'Gestion des absences et congés',
                'Export pour la paie',
                'Validation hiérarchique',
                'Conforme au droit du travail',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Fonctionnalités</h3>
            <div className="space-y-4">
              {[
                { title: 'Pointage quotidien', icon: Calendar, desc: 'Heures d\'arrivée et de départ' },
                { title: 'Heures supplémentaires', icon: TrendingUp, desc: 'Calcul automatique et majoration' },
                { title: 'Absences', icon: Clock, desc: 'Congés, maladie, RTT' },
                { title: 'Export paie', icon: Download, desc: 'Format compatible logiciels RH' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-fibem-light transition-colors"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fibem-dark mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Gain de temps', desc: 'Automatisez la saisie et les calculs', color: 'from-green-500 to-green-600' },
            { title: 'Précision', desc: 'Éliminez les erreurs de calcul', color: 'from-fibem-primary to-fibem-secondary' },
            { title: 'Conformité', desc: 'Respectez la législation du travail', color: 'from-fibem-dark to-slate-800' },
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl mb-4`} />
              <h3 className="text-lg font-bold text-fibem-dark mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-fibem-primary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Simplifiez la gestion du temps</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Adoptez notre feuille d'heures pour un suivi précis et conforme
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3"
            >
              <Clock className="w-6 h-6" />
              Commencer maintenant
            </Link>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-3">
              <Download className="w-6 h-6" />
              Télécharger le modèle
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}