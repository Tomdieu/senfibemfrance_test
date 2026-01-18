'use client'

import Link from 'next/link'
import {
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  Home,
  Hammer,
  Truck,
  MonitorSmartphone,
  ChefHat,
  Scissors,
  Car,
  GraduationCap
} from 'lucide-react'

const categories = [
  {
    icon: Wrench,
    name: 'Plomberie',
    count: 156,
    color: 'bg-blue-500',
    href: '/services/plomberie'
  },
  {
    icon: Zap,
    name: 'Électricité',
    count: 203,
    color: 'bg-yellow-500',
    href: '/services/electricite'
  },
  {
    icon: Paintbrush,
    name: 'Peinture',
    count: 178,
    color: 'bg-purple-500',
    href: '/services/peinture'
  },
  {
    icon: Home,
    name: 'Rénovation',
    count: 245,
    color: 'bg-green-500',
    href: '/services/renovation'
  },
  {
    icon: Hammer,
    name: 'Maçonnerie',
    count: 89,
    color: 'bg-orange-500',
    href: '/services/maconnerie'
  },
  {
    icon: Droplets,
    name: 'Chauffage',
    count: 112,
    color: 'bg-red-500',
    href: '/services/chauffage'
  },
  {
    icon: MonitorSmartphone,
    name: 'Informatique',
    count: 167,
    color: 'bg-indigo-500',
    href: '/services/informatique'
  },
  {
    icon: Truck,
    name: 'Déménagement',
    count: 78,
    color: 'bg-teal-500',
    href: '/services/demenagement'
  },
  {
    icon: ChefHat,
    name: 'Restauration',
    count: 134,
    color: 'bg-pink-500',
    href: '/services/restauration'
  },
  {
    icon: Scissors,
    name: 'Couture',
    count: 45,
    color: 'bg-rose-500',
    href: '/services/couture'
  },
  {
    icon: Car,
    name: 'Transport',
    count: 98,
    color: 'bg-cyan-500',
    href: '/services/transport'
  },
  {
    icon: GraduationCap,
    name: 'Formation',
    count: 67,
    color: 'bg-amber-500',
    href: '/services/formation'
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nos catégories de services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez une large gamme de services professionnels pour tous vos besoins
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className={`${category.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.count} pros</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors"
          >
            Voir toutes les catégories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
