'use client'

import { motion } from 'framer-motion'
import { FileText, Download, CheckCircle, Users, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function FormulaireCVPage() {
  const cvSections = [
    { title: 'Informations personnelles', icon: Users, items: ['Nom et prénom', 'Coordonnées', 'Photo professionnelle', 'Profil LinkedIn'] },
    { title: 'Expérience professionnelle', icon: Briefcase, items: ['Postes occupés', 'Entreprises', 'Durées et responsabilités', 'Réalisations clés'] },
    { title: 'Formation', icon: GraduationCap, items: ['Diplômes', 'Certifications', 'Formations continues', 'Compétences techniques'] },
  ]

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
            Formulaire CV Professionnel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Créez des CV standardisés et professionnels pour faciliter le recrutement
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fibem-dark mb-6">
              Un CV structuré pour un recrutement efficace
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre formulaire CV FIBEM vous permet de créer des curriculum vitae standardisés,
              facilitant la comparaison des candidats et accélérant le processus de recrutement.
            </p>
            <ul className="space-y-4">
              {[
                'Format professionnel et standardisé',
                'Sections personnalisables',
                'Export PDF haute qualité',
                'Conforme aux standards du recrutement',
                'Intégration avec notre CVthèque',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fibem-light">
            <h3 className="text-2xl font-bold text-fibem-dark mb-6">Sections du CV</h3>
            <div className="space-y-6">
              {cvSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-4 border-fibem-primary pl-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="w-6 h-6 text-fibem-secondary" />
                    <h4 className="font-bold text-fibem-dark">{section.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-fibem-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'Facile à utiliser',
              description: 'Interface intuitive pour créer un CV en quelques minutes',
              color: 'from-fibem-primary to-fibem-secondary'
            },
            {
              title: 'Personnalisable',
              description: 'Adaptez les sections selon vos besoins spécifiques',
              color: 'from-fibem-secondary to-fibem-primary'
            },
            {
              title: 'Export professionnel',
              description: 'Téléchargez en PDF haute qualité prêt à l\'emploi',
              color: 'from-fibem-accent to-orange-600'
            },
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
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-fibem-primary to-fibem-dark rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Commencez dès maintenant</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Créez votre premier CV professionnel avec notre formulaire standardisé
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl inline-flex items-center gap-3"
            >
              <FileText className="w-6 h-6" />
              Créer un CV
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