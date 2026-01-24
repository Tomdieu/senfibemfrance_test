'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail, Loader2 } from 'lucide-react'
import { fetchServices, fetchServiceCategories } from '@/actions/services'

export default function PrestationsPage() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          fetchServices(),
          fetchServiceCategories()
        ])
        setServices(servicesData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Erreur lors du chargement des services')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const servicesByCategory = categories.map(cat => ({
    ...cat,
    items: services.filter(s => s.category === cat.id)
  })).filter(cat => cat.items.length > 0)

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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
            <p className="text-gray-500">Chargement des prestations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-fibem-primary hover:underline"
            >
              Réessayer
            </button>
          </div>
        ) : servicesByCategory.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Aucune prestation disponible pour le moment.
          </div>
        ) : (
          <div className="space-y-12">
            {servicesByCategory.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-fibem-primary transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                          <p className="text-fibem-primary font-bold mt-4">{service.price} €</p>
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
        )}

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

