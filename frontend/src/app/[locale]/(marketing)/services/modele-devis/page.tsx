'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, Download, Calculator, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ModeleDevisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-secondary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FileText className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Modèle de Devis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Créez des devis professionnels conformes aux standards B2B
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Devis professionnels en quelques clics
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre modèle de devis FIBEM vous permet de créer rapidement des propositions commerciales
              professionnelles et conformes aux normes en vigueur.
            </p>
            <ul className="space-y-4">
              {[
                'Modèle conforme aux normes légales',
                'Calculs automatiques (HT, TVA, TTC)',
                'Conditions générales personnalisables',
                'Logo et identité visuelle',
                'Export PDF professionnel',
                'Suivi des devis envoyés',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Contenu du devis</h3>
            <div className="space-y-4">
              {[
                { title: 'En-tête', items: ['Logo', 'Coordonnées', 'N° de devis', 'Date'] },
                { title: 'Client', items: ['Raison sociale', 'Adresse', 'Contact'] },
                { title: 'Prestations', items: ['Désignation', 'Quantité', 'Prix unitaire', 'Total'] },
                { title: 'Totaux', items: ['Total HT', 'TVA', 'Total TTC'] },
                { title: 'Conditions', items: ['Validité', 'Paiement', 'CGV'] },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-fibem-primary pl-4"
                >
                  <h4 className="font-bold text-fibem-dark mb-2">{section.title}</h4>
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
            { title: 'Calculs automatiques', desc: 'TVA et totaux calculés automatiquement', icon: Calculator, color: 'bg-blue-100', iconColor: 'text-fibem-primary' },
            { title: 'Personnalisable', desc: 'Adaptez le modèle à votre image', icon: FileText, color: 'bg-green-100', iconColor: 'text-green-600' },
            { title: 'Suivi', desc: 'Suivez l\'état de vos devis', icon: TrendingUp, color: 'bg-orange-100', iconColor: 'text-fibem-accent' },
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
        <div className="bg-gradient-to-r from-fibem-primary to-fibem-secondary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Créez vos devis professionnels</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Utilisez notre modèle pour gagner du temps et professionnaliser vos propositions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3"
            >
              <FileText className="w-6 h-6" />
              Créer un devis
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