'use client'

const partners = [
  { name: 'France Travail', logo: 'FT' },
  { name: 'APEC', logo: 'AP' },
  { name: 'Indeed', logo: 'IN' },
  { name: 'LinkedIn', logo: 'LI' },
  { name: 'HelloWork', logo: 'HW' },
  { name: 'Pole Emploi', logo: 'PE' },
]

export default function PartnersSection() {
  return (
    <section className="py-12 border-t border-b">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 mb-8">Ils nous font confiance</p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center w-24 h-12 bg-gray-100 rounded-lg text-gray-400 font-bold text-xl hover:bg-fibem-light hover:text-fibem-primary transition-colors cursor-pointer"
              title={partner.name}
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
