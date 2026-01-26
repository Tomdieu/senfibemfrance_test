'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Briefcase, Clock, Building, Filter, BookmarkPlus, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchJobOffers } from '@/actions/jobs'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Il y a 1 jour'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 14) return 'Il y a 1 semaine'
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}

const contractTypeLabels: Record<string, string> = {
  CDI: 'CDI',
  CDD: 'CDD',
  STAGE: 'Stage',
  FREELANCE: 'Freelance',
  INTERIM: 'Intérim',
}

type ContractType = 'CDI' | 'CDD' | 'STAGE' | 'FREELANCE' | 'INTERIM'

const contractTypes: { value: ContractType; label: string }[] = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'INTERIM', label: 'Intérim' },
  { value: 'STAGE', label: 'Stage' },
  { value: 'FREELANCE', label: 'Freelance' },
]

const locations = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Dakar']

export default function CandidatPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedContractType, setSelectedContractType] = useState<ContractType | ''>('')
  const [showFilters, setShowFilters] = useState(false)

  // Build query params
  const queryParams = {
    ...(searchQuery && { search: searchQuery }),
    ...(selectedLocation && { location: selectedLocation }),
    ...(selectedContractType && { contract_type: selectedContractType }),
  }

  const {
    data: jobOffers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['jobOffers', queryParams],
    queryFn: () => fetchJobOffers(queryParams),
    select: (data) => data.filter((job) => job.is_active),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedLocation('')
    setSelectedContractType('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-r from-fibem-primary to-fibem-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Candidat</h1>
          <p className="text-blue-100 text-lg mb-8">Trouvez le poste qui vous correspond parmi nos offres d'emploi</p>

          {/* Search */}
          <form onSubmit={handleSearch} className="bg-white rounded-xl p-4 shadow-lg">
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
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-fibem-accent text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
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
                    {contractTypes.map((type) => (
                      <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contract_type"
                          checked={selectedContractType === type.value}
                          onChange={() => setSelectedContractType(type.value)}
                          className="text-fibem-primary focus:ring-fibem-secondary"
                        />
                        <span className="text-sm text-gray-600">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Localisation</h4>
                  <div className="space-y-2">
                    {locations.map((loc) => (
                      <label key={loc} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="location"
                          checked={selectedLocation === loc}
                          onChange={() => setSelectedLocation(loc)}
                          className="text-fibem-primary focus:ring-fibem-secondary"
                        />
                        <span className="text-sm text-gray-600">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-fibem-primary font-medium hover:underline"
                >
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-fibem-primary" />
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center">
                Erreur lors du chargement des offres
              </div>
            ) : jobOffers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-500">Aucune offre disponible pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobOffers.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 bg-fibem-light rounded-xl flex items-center justify-center shrink-0">
                          <Building className="w-7 h-7 text-fibem-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {job.num_of_place > 1 && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                {job.num_of_place} postes
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-gray-800 hover:text-fibem-primary">
                            <Link href={`/emploi/offres/${job.id}`}>{job.title}</Link>
                          </h3>
                          <p className="text-fibem-primary font-medium">{job.company_name}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {contractTypeLabels[job.contract_type] || job.contract_type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(job.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-bold text-lg text-gray-800">{job.salary_range}</p>
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
                    <p className="text-gray-600 mt-4 text-sm line-clamp-2">{job.description}</p>
                  </div>
                ))}
              </div>
            )}

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
