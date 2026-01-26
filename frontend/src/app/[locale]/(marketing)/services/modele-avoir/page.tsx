'use client'

import { motion } from 'framer-motion'
import { FileCheck, CheckCircle, Download, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function ModeleAvoirPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-10 h-10" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6">Modèle d'Avoir</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 leading-relaxed">
            Gérez les retours et ajustements commerciaux professionnellement
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">Avoirs conformes et professionnels</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre modèle d'avoir FIBEM vous permet de gérer les retours, remboursements et ajustements
              de manière professionnelle et conforme.
            </p>
            <ul className="space-y-4">
              {['Référence à la facture d\'origine', 'Calculs automatiques', 'Mentions légales', 'Motif de l\'avoir', 'Traçabilité comptable', 'Export PDF'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Contenu de l'avoir</h3>
            <div className="space-y-4">
              {[
                { title: 'Référence', items: ['N° avoir', 'Date', 'Facture d\'origine'] },
                { title: 'Motif', items: ['Retour produit', 'Erreur facturation', 'Geste commercial'] },
                { title: 'Montants', items: ['Montant HT', 'TVA', 'Total TTC'] },
                { title: 'Utilisation', items: ['Remboursement', 'Crédit compte', 'Compensation'] },
              ].map((section, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="border-l-4 border-fibem-primary pl-4">
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

        <div className="bg-gradient-to-r from-fibem-primary to-fibem-dark rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Gérez vos avoirs simplement</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Utilisez notre modèle pour une gestion professionnelle des retours</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3">
              <FileCheck className="w-6 h-6" />
              Créer un avoir
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