'use client'

import Link from 'next/link'
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react'

const featuredServices = [
  {
    id: 1,
    title: 'Plombier Expert',
    provider: 'Ets A&R COLY',
    rating: 4.9,
    reviews: 127,
    location: 'Paris, France',
    price: 'À partir de 50€/h',
    image: '/images/plumber.jpg',
    verified: true,
    available: true,
    tags: ['Urgence 24h', 'Devis gratuit']
  },
  {
    id: 2,
    title: 'Électricien Certifié',
    provider: 'CALISTA Électricité',
    rating: 4.8,
    reviews: 89,
    location: 'Lyon, France',
    price: 'À partir de 45€/h',
    image: '/images/electrician.jpg',
    verified: true,
    available: true,
    tags: ['NFC 15-100', 'Diagnostic']
  },
  {
    id: 3,
    title: 'Peintre Décorateur',
    provider: 'DJCUE OUMARO',
    rating: 4.7,
    reviews: 56,
    location: 'Marseille, France',
    price: 'À partir de 35€/h',
    image: '/images/painter.jpg',
    verified: true,
    available: false,
    tags: ['Finitions', 'Rénovation']
  },
  {
    id: 4,
    title: 'Développeur Web',
    provider: 'EDEP Digital',
    rating: 5.0,
    reviews: 34,
    location: 'Paris, France',
    price: 'À partir de 400€/jour',
    image: '/images/developer.jpg',
    verified: true,
    available: true,
    tags: ['Full-Stack', 'React/Node']
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Services populaires
            </h2>
            <p className="text-gray-600 max-w-xl">
              Découvrez nos professionnels les mieux notés, prêts à intervenir pour vos projets
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 text-fibem-primary font-semibold hover:underline"
          >
            Voir tous les services →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-fibem-primary to-fibem-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-6xl opacity-30">
                    {service.title.charAt(0)}
                  </span>
                </div>
                {service.verified && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Vérifié
                  </div>
                )}
                {service.available ? (
                  <div className="absolute top-3 right-3 bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Disponible
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-white text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Occupé
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-sm">{service.rating}</span>
                  <span className="text-gray-400 text-sm">({service.reviews} avis)</span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 group-hover:text-fibem-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{service.provider}</p>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {service.location}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-fibem-light text-fibem-primary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <p className="font-bold text-fibem-primary">{service.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
