'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
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
    image: '/images/emmanuel-ikwuegbu-zWOgsj3j0wA-unsplash.jpg',
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
    image: '/images/anton-dmitriev-kBKOaghy8mU-unsplash.jpg',
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
    image: '/images/tetiana-shyshkina-yn7R3DLA-ik-unsplash.jpg',
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
    image: '/images/kaleidico-7lryofJ0H9s-unsplash.jpg',
    verified: true,
    available: true,
    tags: ['Full-Stack', 'React/Node']
  },
]

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeInUp">
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
        </ScrollAnimationWrapper>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link
                href={`/services/${service.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-linear-to-br from-fibem-primary to-fibem-secondary overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                   
                  />
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

                <div className="p-4 flex flex-col flex-grow">
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

                  <div className="pt-3 border-t mt-auto">
                    <p className="font-bold text-fibem-primary">{service.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )


}
