'use client'

import { motion } from 'framer-motion'
import { Building2, CheckCircle, Download, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function FicheEtablissementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-fibem-accent to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6">Fiche Établissement</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-orange-100 leading-relaxed">
            Documentez vos partenaires et fournisseurs avec des fiches complètes
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">Centralisez vos informations partenaires</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              La fiche établissement FIBEM vous permet de documenter et gérer toutes les informations
              de vos partenaires, fournisseurs et clients professionnels.
            </p>
            <ul className="space-y-4">
              {['Informations légales complètes', 'Contacts et coordonnées', 'Données bancaires', 'Certifications et agréments', 'Historique des transactions', 'Documents associés'].map((item, idx) => (
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
                { title: 'Identification', icon: Building2, items: ['Raison sociale', 'SIRET', 'Code NAF', 'TVA intra.'] },
                { title: 'Coordonnées', icon: MapPin, items: ['Adresse siège', 'Adresse facturation', 'Adresse livraison'] },
                { title: 'Contacts', icon: Phone, items: ['Téléphone', 'Email', 'Site web', 'Responsables'] },
                { title: 'Bancaire', icon: Mail, items: ['IBAN', 'BIC', 'Conditions paiement'] },
              ].map((section, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-4 p-4 rounded-xl hover:bg-fibem-light transition-colors">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-fibem-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fibem-dark mb-1">{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-fibem-accent to-orange-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Organisez vos relations B2B</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">Centralisez toutes les informations de vos partenaires professionnels</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="px-10 py-5 bg-fibem-dark text-white font-bold rounded-xl hover:bg-slate-800 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              Créer une fiche
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