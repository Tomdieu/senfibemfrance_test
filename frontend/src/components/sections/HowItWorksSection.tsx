'use client'

import { Search, UserCheck, FileText, ThumbsUp } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Recherchez',
    description: 'Trouvez le service ou le professionnel dont vous avez besoin parmi notre réseau qualifié.',
    color: 'bg-blue-500'
  },
  {
    icon: UserCheck,
    title: 'Sélectionnez',
    description: 'Comparez les profils, consultez les avis et choisissez le prestataire idéal.',
    color: 'bg-green-500'
  },
  {
    icon: FileText,
    title: 'Demandez un devis',
    description: 'Obtenez un devis détaillé et transparent adapté à vos besoins spécifiques.',
    color: 'bg-purple-500'
  },
  {
    icon: ThumbsUp,
    title: 'Validez & Payez',
    description: 'Confirmez la prestation et payez en toute sécurité via notre plateforme.',
    color: 'bg-fibem-accent'
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-fibem-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            En quelques étapes simples, trouvez le professionnel qu'il vous faut
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-600" />
              )}

              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}>
                <step.icon className="w-10 h-10 text-white" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-fibem-dark rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
