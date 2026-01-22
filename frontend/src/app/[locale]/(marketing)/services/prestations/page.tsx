'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'

const services = [
  {
    category: 'BTP & Construction',
    items: [
      { name: 'Plomberie', description: 'Installation, dépannage, rénovation sanitaire' },
      { name: 'Électricité', description: 'Mise aux normes, installation, dépannage' },
      { name: 'Peinture', description: 'Peinture intérieure et extérieure, décoration' },
      { name: 'Maçonnerie', description: 'Construction, rénovation, aménagement' },
      { name: 'Chauffage', description: 'Installation, entretien, dépannage' },
      { name: 'Carrelage', description: 'Pose de carrelage, faïence, mosaïque' },
    ]
  },
  {
    category: 'Services Numériques',
    items: [
      { name: 'Développement Web', description: 'Sites vitrine, e-commerce, applications' },
      { name: 'Développement Mobile', description: 'Applications iOS et Android' },
      { name: 'Infographie', description: 'Design graphique, logos, supports visuels' },
      { name: 'Marketing Digital', description: 'SEO, réseaux sociaux, publicité en ligne' },
      { name: 'Maintenance IT', description: 'Support technique, infogérance' },
    ]
  },
  {
    category: 'Services aux Entreprises',
    items: [
      { name: 'Assistance Technique', description: 'Mise à disposition d\'ingénieurs et techniciens' },
      { name: 'Gestion Administrative', description: 'Secrétariat, comptabilité, RH' },
      { name: 'Conseil', description: 'Stratégie, organisation, transformation' },
      { name: 'Formation', description: 'Formation professionnelle sur mesure' },
    ]
  },
  {
    category: 'Services aux Particuliers',
    items: [
      { name: 'Déménagement', description: 'Transport, emballage, installation' },
      { name: 'Ménage', description: 'Nettoyage régulier ou ponctuel' },
      { name: 'Jardinage', description: 'Entretien espaces verts, aménagement' },
      { name: 'Bricolage', description: 'Petits travaux, montage, réparations' },
    ]
  },
]

export default function PrestationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-fibem-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos Prestations de Services</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Découvrez l'ensemble des services proposés par notre réseau de professionnels qualifiés
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Services grid */}
        <div className="space-y-12">
          {services.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((service) => (
                  <Link
                    key={service.name}
                    href={`/services/${service.name.toLowerCase().replace(/ /g, '-')}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-fibem-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-fibem-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center gap-4">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Devis gratuit
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Pros vérifiés
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-fibem-primary to-fibem-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Contactez-nous pour discuter de votre projet. Nous trouverons le professionnel adapté à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+33100000000" className="flex items-center gap-2 px-6 py-3 bg-white text-fibem-primary rounded-lg hover:bg-blue-50 transition-colors">
              <Phone className="w-5 h-5" />
              Nous appeler
            </a>
            <Link href="/contact" className="flex items-center gap-2 px-6 py-3 bg-fibem-accent text-white rounded-lg hover:bg-amber-600 transition-colors">
              <Mail className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
