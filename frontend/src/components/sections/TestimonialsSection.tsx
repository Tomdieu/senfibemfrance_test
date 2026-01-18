'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    role: 'Particulier',
    avatar: 'MD',
    rating: 5,
    text: 'Service impeccable ! J\'ai trouvé un plombier en moins d\'une heure pour une urgence. Très professionnel et tarif transparent.',
    location: 'Paris'
  },
  {
    id: 2,
    name: 'Jean-Pierre Martin',
    role: 'Chef d\'entreprise',
    avatar: 'JM',
    rating: 5,
    text: 'La plateforme nous a permis de recruter rapidement des développeurs qualifiés. Le processus de sélection est très efficace.',
    location: 'Lyon'
  },
  {
    id: 3,
    name: 'Fatou Diallo',
    role: 'Artisan',
    avatar: 'FD',
    rating: 5,
    text: 'En tant qu\'artisan, SEN FIBEM m\'a aidé à développer ma clientèle. Les outils de gestion de devis sont vraiment pratiques.',
    location: 'Dakar'
  },
  {
    id: 4,
    name: 'Thomas Bernard',
    role: 'Freelance',
    avatar: 'TB',
    rating: 4,
    text: 'Excellente plateforme pour les freelances. J\'ai pu trouver des missions régulières et gérer mes factures facilement.',
    location: 'Marseille'
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des milliers de professionnels et particuliers nous font confiance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-fibem-light" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-fibem-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role} - {testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
