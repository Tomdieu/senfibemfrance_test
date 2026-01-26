'use client'

import { motion } from 'framer-motion'
import { FileText, Receipt, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function DevisFacturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6">Devis & Factures</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 leading-relaxed">
            Gérez vos devis et factures professionnellement
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { title: 'Modèle de Devis', icon: FileText, desc: 'Créez des devis professionnels conformes aux standards B2B', href: '/services/modele-devis', color: 'from-fibem-primary to-fibem-secondary' },
            { title: 'Modèle de Facture', icon: Receipt, desc: 'Factures conformes aux normes comptables', href: '/services/modele-facture', color: 'from-green-600 to-fibem-primary' },
          ].map((service, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                <service.icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-blue-100">{service.desc}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  {['Calculs automatiques', 'Mentions légales', 'Export PDF'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="block w-full py-4 px-6 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-all text-center">
                  En savoir plus
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-fibem-primary to-fibem-dark rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Simplifiez votre gestion commerciale</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Utilisez nos modèles pour professionnaliser vos documents commerciaux</p>
          <Link href="/inscription" className="inline-flex items-center gap-3 px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl">
            Commencer gratuitement
          </Link>
        </div>
      </section>
    </div>
  )
}
