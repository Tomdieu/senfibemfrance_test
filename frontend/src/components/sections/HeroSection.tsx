'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Users, Building } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  // const [searchType, setSearchType] = useState<'services' | 'emploi' | 'professionnels'>('services')
  // const [searchQuery, setSearchQuery] = useState('')
  // const [location, setLocation] = useState('')

  return (
    <section className="relative bg-gradient-to-br from-fibem-primary via-fibem-secondary to-fibem-primary min-h-[600px] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre partenaire pour
              <span className="text-fibem-accent"> réussir</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Services professionnels, recrutement et mise en relation d'experts en France et au Sénégal
            </p>

            {/* Search tabs */}
            {/* <div className="bg-white rounded-t-xl p-1 inline-flex gap-1">
              <button
                onClick={() => setSearchType('services')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchType === 'services'
                    ? 'bg-fibem-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-1" />
                Services
              </button>
              <button
                onClick={() => setSearchType('emploi')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchType === 'emploi'
                    ? 'bg-fibem-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4 inline mr-1" />
                Emploi
              </button>
              <button
                onClick={() => setSearchType('professionnels')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchType === 'professionnels'
                    ? 'bg-fibem-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Building className="w-4 h-4 inline mr-1" />
                Professionnels
              </button>
            </div> */}

            {/* Search box */}
            {/* <div className="bg-white rounded-b-xl rounded-tr-xl p-4 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={
                      searchType === 'services'
                        ? 'Quel service recherchez-vous ?'
                        : searchType === 'emploi'
                        ? 'Quel emploi recherchez-vous ?'
                        : 'Quel professionnel recherchez-vous ?'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-gray-800"
                  />
                </div>
                <div className="md:w-48 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Localisation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-gray-800"
                  />
                </div>
                <button className="px-8 py-3 bg-fibem-accent text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors">
                  Rechercher
                </button>
              </div>
            </div> */}

            {/* Quick stats */}
            {/* <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <p className="text-3xl font-bold text-white">5000+</p>
                <p className="text-blue-200">Professionnels</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">1200+</p>
                <p className="text-blue-200">Entreprises</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-blue-200">Satisfaction</p>
              </div>
            </div> */}
          </div>

          {/* Right content - Feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <Link href="/emploi/candidat" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors group">
              <div className="w-14 h-14 bg-fibem-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Espace Candidat</h3>
              <p className="text-blue-200 text-sm">Trouvez votre prochain emploi parmi des centaines d'offres</p>
            </Link>

            <Link href="/emploi/recruteur" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors group">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Espace Recruteur</h3>
              <p className="text-blue-200 text-sm">Recrutez les meilleurs talents pour votre entreprise</p>
            </Link>

            <Link href="/services/prestations" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors group">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Services Pro</h3>
              <p className="text-blue-200 text-sm">Accédez à nos prestations de services professionnels</p>
            </Link>

            <Link href="/services/devis-factures" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors group">
              <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Devis & Factures</h3>
              <p className="text-blue-200 text-sm">Gérez vos devis et factures en toute simplicité</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
