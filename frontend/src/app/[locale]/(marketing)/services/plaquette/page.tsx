'use client'

import { motion } from 'framer-motion'
import { Download, FileText, Briefcase, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

export default function PlaquettePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-fibem-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FileText className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Plaquette FIBEM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Découvrez notre brochure officielle présentant l'écosystème FIBEM
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Tout savoir sur FIBEM
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre plaquette commerciale présente de manière détaillée l'ensemble de nos services,
              notre vision et notre engagement envers les professionnels et les entreprises.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Présentation complète de FIBEM',
                'Nos services et prestations',
                'Témoignages clients',
                'Grille tarifaire',
                'Coordonnées et contacts',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-lg inline-flex items-center gap-3">
                <Download className="w-6 h-6" />
                Télécharger la plaquette (PDF)
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white border-2 border-fibem-primary text-fibem-primary font-bold rounded-xl hover:bg-fibem-light transition-all inline-flex items-center gap-3"
              >
                Demander par email
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Contenu de la plaquette</h3>
            <div className="space-y-6">
              {[
                { title: 'À propos de FIBEM', pages: '2 pages', icon: Briefcase },
                { title: 'Nos Services', pages: '4 pages', icon: Star },
                { title: 'Tarifs & Formules', pages: '2 pages', icon: FileText },
                { title: 'Témoignages', pages: '1 page', icon: Star },
                { title: 'Contact', pages: '1 page', icon: Briefcase },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-fibem-light transition-colors"
                >
                  <div className="w-12 h-12 bg-fibem-primary/10 rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-fibem-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-fibem-dark">{section.title}</h4>
                    <p className="text-sm text-gray-500">{section.pages}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-fibem-light rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                <strong>Total:</strong> 10 pages • Format PDF • 2.5 MB
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-fibem-primary to-fibem-dark rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Besoin de plus d'informations ?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl"
            >
              Nous contacter
            </Link>
            <Link
              href="/services"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              Voir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}