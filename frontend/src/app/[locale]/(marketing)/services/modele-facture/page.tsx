'use client'

import { motion } from 'framer-motion'
import { Receipt, CheckCircle, Download, CreditCard, FileCheck } from 'lucide-react'
import Link from 'next/link'

export default function ModeleFacturePage() {
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
            <Receipt className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Modèle de Facture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Factures conformes aux normes comptables pour une gestion rigoureuse
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Facturation professionnelle et conforme
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre modèle de facture FIBEM respecte toutes les obligations légales et comptables
              pour une facturation en toute sérénité.
            </p>
            <ul className="space-y-4">
              {[
                'Conforme aux normes comptables',
                'Mentions légales obligatoires',
                'Numérotation automatique',
                'Calculs TVA précis',
                'Conditions de paiement',
                'Export comptabilité',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Éléments de la facture</h3>
            <div className="space-y-4">
              {[
                { title: 'Identification', items: ['N° facture', 'Date émission', 'Date échéance'] },
                { title: 'Émetteur', items: ['Raison sociale', 'SIRET', 'TVA intracommunautaire'] },
                { title: 'Client', items: ['Nom/Société', 'Adresse facturation', 'N° client'] },
                { title: 'Prestations', items: ['Description', 'Quantité', 'Prix', 'TVA'] },
                { title: 'Paiement', items: ['Mode de paiement', 'Échéance', 'Pénalités retard'] },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-green-500 pl-4"
                >
                  <h4 className="font-bold text-fibem-dark mb-2">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
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
            { title: 'Légale', desc: 'Toutes les mentions obligatoires incluses', icon: FileCheck, color: 'bg-green-100', iconColor: 'text-green-600' },
            { title: 'Automatisée', desc: 'Numérotation et calculs automatiques', icon: Receipt, color: 'bg-blue-100', iconColor: 'text-fibem-primary' },
            { title: 'Paiement', desc: 'Intégration moyens de paiement', icon: CreditCard, color: 'bg-orange-100', iconColor: 'text-fibem-accent' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-fibem-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-fibem-primary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Facturez en toute conformité</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Utilisez notre modèle pour une facturation professionnelle et légale
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3"
            >
              <Receipt className="w-6 h-6" />
              Créer une facture
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