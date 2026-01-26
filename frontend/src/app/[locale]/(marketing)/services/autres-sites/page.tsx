'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Globe, Shield, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function AutresSitesPage() {
  const partners = [
    { name: 'SenAgenceB2B', url: 'https://senagenceb2b-fibem.com', desc: 'Plateforme B2B pour transactions sécurisées entre entreprises', color: 'from-fibem-primary to-fibem-secondary' },
    { name: 'Annonces Achat/Vente', url: 'https://annonce-achatvente-fibem.com', desc: 'Marketplace pour l\'achat et la vente de produits professionnels', color: 'from-fibem-accent to-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-fibem-dark to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-20 h-20 bg-fibem-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6">Nos Sites Partenaires</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 leading-relaxed">
            Découvrez l'écosystème FIBEM et nos plateformes partenaires
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-fibem-dark mb-6 text-center">Plateformes FIBEM</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className={`bg-gradient-to-r ${partner.color} p-8 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                  <p className="text-blue-100">{partner.desc}</p>
                </div>
                <div className="p-8">
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-md">
                    Visiter le site
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Shield, title: 'Sécurité', desc: 'Transactions sécurisées et vérifiées', color: 'text-green-600', bg: 'bg-green-50' },
            { icon: Users, title: 'Communauté', desc: 'Réseau de professionnels qualifiés', color: 'text-fibem-primary', bg: 'bg-blue-50' },
            { icon: TrendingUp, title: 'Croissance', desc: 'Développez votre activité B2B', color: 'text-fibem-accent', bg: 'bg-orange-50' },
          ].map((feature, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl p-8 shadow-md text-center">
              <div className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-fibem-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-fibem-dark to-slate-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Rejoignez l'écosystème FIBEM</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Accédez à toutes nos plateformes pour développer votre activité professionnelle</p>
          <Link href="/inscription" className="inline-flex items-center gap-3 px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl">
            Créer un compte
            <ExternalLink className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}