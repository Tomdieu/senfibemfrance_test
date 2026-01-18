'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Briefcase, Clock, Building, Star, Filter, ChevronDown, BookmarkPlus, ExternalLink } from 'lucide-react'

const jobOffers = [
  {
    id: 1,
    title: 'Développeur Full-Stack',
    company: 'SEN FIBEM FRANCE',
    location: 'Paris, France',
    type: 'CDI',
    salary: '45 000 € - 55 000 €',
    posted: 'Il y a 2 jours',
    description: 'Nous recherchons un développeur Full-Stack expérimenté pour rejoindre notre équipe technique...',
    tags: ['React', 'Node.js', 'TypeScript'],
    urgent: true,
    remote: true,
  },
  {
    id: 2,
    title: 'Chef de Projet Digital',
    company: 'CALISTA Services',
    location: 'Lyon, France',
    type: 'CDI',
    salary: '50 000 € - 60 000 €',
    posted: 'Il y a 3 jours',
    description: 'Pilotez des projets digitaux ambitieux pour nos clients grands comptes...',
    tags: ['Gestion de projet', 'Agile', 'Digital'],
    urgent: false,
    remote: false,
  },
  {
    id: 3,
    title: 'Électricien Qualifié',
    company: 'Ets A&R COLY',
    location: 'Marseille, France',
    type: 'CDI',
    salary: '28 000 € - 35 000 €',
    posted: 'Il y a 5 jours',
    description: 'Rejoignez notre équipe d\'électriciens pour des interventions chez nos clients...',
    tags: ['NFC 15-100', 'Dépannage', 'Installation'],
    urgent: true,
    remote: false,
  },
  {
    id: 4,
    title: 'Commercial B2B',
    company: 'SEN FIBEM FRANCE',
    location: 'Paris, France',
    type: 'CDI',
    salary: '35 000 € + Variable',
    posted: 'Il y a 1 semaine',
    description: 'Développez notre portefeuille clients professionnels sur la région parisienne...',
    tags: ['Prospection', 'B2B', 'Services'],
    urgent: false,
    remote: false,
  },
]

const filters = {
  types: ['CDI', 'CDD', 'Intérim', 'Stage', 'Alternance', 'Freelance'],
  locations: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Dakar'],
  sectors: ['Informatique', 'BTP', 'Commerce', 'Services', 'Industrie', 'Santé'],
}

export default function CandidatPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-fibem-primary to-fibem-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Candidat</h1>
          <p className="text-blue-100 text-lg mb-8">Trouvez le poste qui vous correspond parmi nos offres d'emploi</p>

          {/* Search */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Poste, compétences, mots-clés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-gray-800"
                />
              </div>
              <div className="md:w-64 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ville ou région"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-gray-800"
                />
              </div>
              <button className="px-8 py-3 bg-fibem-accent text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Filtres</h3>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Type de contrat */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Type de contrat</h4>
                  <div className="space-y-2">
                    {filters.types.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-fibem-primary focus:ring-fibem-secondary" />
                        <span className="text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Localisation</h4>
                  <div className="space-y-2">
                    {filters.locations.map((loc) => (
                      <label key={loc} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-fibem-primary focus:ring-fibem-secondary" />
                        <span className="text-sm text-gray-600">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Secteur */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Secteur d'activité</h4>
                  <div className="space-y-2">
                    {filters.sectors.map((sector) => (
                      <label key={sector} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-fibem-primary focus:ring-fibem-secondary" />
                        <span className="text-sm text-gray-600">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2 text-fibem-primary font-medium hover:underline">
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </aside>

          {/* Job listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">{jobOffers.length}</span> offres trouvées
              </p>
              <select className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-fibem-secondary">
                <option>Plus récentes</option>
                <option>Salaire décroissant</option>
                <option>Salaire croissant</option>
              </select>
            </div>

            <div className="space-y-4">
              {jobOffers.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-fibem-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-7 h-7 text-fibem-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {job.urgent && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Urgent
                            </span>
                          )}
                          {job.remote && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Télétravail
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 hover:text-fibem-primary">
                          <Link href={`/emploi/offres/${job.id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-fibem-primary font-medium">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-bold text-lg text-gray-800">{job.salary}</p>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-fibem-primary transition-colors">
                          <BookmarkPlus className="w-5 h-5" />
                        </button>
                        <Link
                          href={`/emploi/offres/${job.id}`}
                          className="px-4 py-2 bg-fibem-primary text-white text-sm rounded-lg hover:bg-fibem-dark transition-colors"
                        >
                          Postuler
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Précédent</button>
              <button className="px-4 py-2 bg-fibem-primary text-white rounded-lg">1</button>
              <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">2</button>
              <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">3</button>
              <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
