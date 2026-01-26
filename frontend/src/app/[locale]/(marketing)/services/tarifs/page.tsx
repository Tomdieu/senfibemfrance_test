'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function TarifsPage() {
  const plans = [
    {
      name: 'Particulier',
      price: 'Gratuit',
      period: '',
      description: 'Pour les particuliers recherchant des services ponctuels',
      features: [
        { text: 'Accès aux services', included: true },
        { text: 'Demandes de devis illimitées', included: true },
        { text: 'Support par email', included: true },
        { text: 'Profil professionnel', included: false },
        { text: 'Gestion de projets', included: false },
        { text: 'Support prioritaire', included: false },
      ],
      cta: 'Commencer gratuitement',
      href: '/inscription?type=particulier',
      popular: false,
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Professionnel',
      price: '49€',
      period: '/mois',
      description: 'Pour les professionnels et freelances',
      features: [
        { text: 'Tout du plan Particulier', included: true },
        { text: 'Profil professionnel vérifié', included: true },
        { text: 'Gestion illimitée de projets', included: true },
        { text: 'Outils de devis et facturation', included: true },
        { text: 'Statistiques avancées', included: true },
        { text: 'Support prioritaire 24/7', included: false },
      ],
      cta: 'Démarrer l\'essai gratuit',
      href: '/inscription?type=professionnel',
      popular: true,
      color: 'from-fibem-primary to-fibem-secondary'
    },
    {
      name: 'Entreprise',
      price: '149€',
      period: '/mois',
      description: 'Pour les entreprises et partenaires stratégiques',
      features: [
        { text: 'Tout du plan Professionnel', included: true },
        { text: 'Équipe multi-utilisateurs', included: true },
        { text: 'API et intégrations', included: true },
        { text: 'Gestionnaire de compte dédié', included: true },
        { text: 'Support prioritaire 24/7', included: true },
        { text: 'Formation personnalisée', included: true },
      ],
      cta: 'Nous contacter',
      href: '/contact',
      popular: false,
      color: 'from-fibem-dark to-slate-900'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fibem-primary to-fibem-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          >
            Tarifs Transparents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed"
          >
            Choisissez le plan qui correspond à vos besoins. Pas de frais cachés, pas d'engagement.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${plan.popular ? 'ring-4 ring-fibem-accent scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-fibem-accent text-white px-4 py-1 text-sm font-bold rounded-bl-xl flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Populaire
                </div>
              )}

              <div className={`bg-gradient-to-r ${plan.color} text-white p-8`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="text-blue-100">{plan.period}</span>}
                </div>
                <p className="text-blue-100 text-sm">{plan.description}</p>
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full py-4 px-6 rounded-xl font-bold text-center transition-all ${plan.popular
                      ? 'bg-fibem-accent text-white hover:bg-orange-500 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-fibem-dark hover:bg-gray-200'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-fibem-dark mb-12">
          Pourquoi choisir FIBEM ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: 'Croissance garantie',
              description: 'Développez votre activité avec notre réseau de professionnels qualifiés',
              color: 'text-green-600',
              bg: 'bg-green-50'
            },
            {
              icon: Users,
              title: 'Communauté active',
              description: 'Rejoignez des milliers de professionnels et particuliers satisfaits',
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            {
              icon: Zap,
              title: 'Outils performants',
              description: 'Gestion de devis, facturation et suivi de projets en un seul endroit',
              color: 'text-purple-600',
              bg: 'bg-purple-50'
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-fibem-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-fibem-light py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-fibem-dark mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je changer de plan à tout moment ?',
                a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.'
              },
              {
                q: 'Y a-t-il des frais cachés ?',
                a: 'Non, tous nos tarifs sont transparents. Le prix affiché est le prix que vous payez, sans surprise.'
              },
              {
                q: 'Proposez-vous une période d\'essai ?',
                a: 'Oui, tous les plans payants incluent une période d\'essai gratuite de 14 jours, sans engagement.'
              },
              {
                q: 'Comment fonctionne la facturation ?',
                a: 'La facturation est mensuelle et automatique. Vous recevez une facture détaillée par email chaque mois.'
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-fibem-dark mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fibem-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Rejoignez FIBEM aujourd'hui et développez votre activité
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inscription"
              className="px-10 py-5 bg-fibem-accent text-white font-bold rounded-xl hover:bg-orange-500 transform hover:-translate-y-1 transition-all shadow-xl"
            >
              Créer un compte gratuit
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-fibem-dark font-bold rounded-xl hover:bg-gray-100 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}