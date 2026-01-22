'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Users, FileText, Target, TrendingUp, Plus, Eye, Edit, Trash2, BarChart3 } from 'lucide-react'

const myOffers = [
  { id: 1, title: 'Développeur Full-Stack', candidates: 24, views: 156, status: 'active', created: '12/01/2026' },
  { id: 2, title: 'Chef de Projet Digital', candidates: 12, views: 89, status: 'active', created: '10/01/2026' },
  { id: 3, title: 'Commercial B2B', candidates: 8, views: 45, status: 'paused', created: '05/01/2026' },
  { id: 4, title: 'Électricien Qualifié', candidates: 15, views: 78, status: 'closed', created: '01/01/2026' },
]

const candidateProfiles = [
  { id: 1, name: 'Marie Dupont', title: 'Développeuse Full-Stack', experience: '5 ans', location: 'Paris', match: 95 },
  { id: 2, name: 'Jean Martin', title: 'Chef de Projet', experience: '8 ans', location: 'Lyon', match: 88 },
  { id: 3, name: 'Sophie Bernard', title: 'Commerciale B2B', experience: '3 ans', location: 'Paris', match: 82 },
]

export default function RecruteurPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Recruteur</h1>
          <p className="text-green-100 text-lg mb-8">Trouvez les meilleurs talents pour votre entreprise</p>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/emploi/recruteur/nouvelle-offre"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Publier une offre
            </Link>
            <Link
              href="/emploi/recruteur/cvtheque"
              className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Rechercher un profil
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-500" />
              <span className="text-green-500 text-sm font-medium">+3</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">4</h3>
            <p className="text-gray-500 text-sm">Offres actives</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-500" />
              <span className="text-green-500 text-sm font-medium">+12</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">59</h3>
            <p className="text-gray-500 text-sm">Candidatures</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-orange-500" />
              <span className="text-green-500 text-sm font-medium">+25%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">368</h3>
            <p className="text-gray-500 text-sm">Vues ce mois</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">85%</h3>
            <p className="text-gray-500 text-sm">Taux de réponse</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My offers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800">Mes offres d'emploi</h2>
                <Link href="/emploi/recruteur/offres" className="text-fibem-primary text-sm hover:underline">
                  Voir tout
                </Link>
              </div>
              <div className="divide-y">
                {myOffers.map((offer) => (
                  <div key={offer.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                        <p className="text-sm text-gray-500">Créée le {offer.created}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        offer.status === 'active' ? 'bg-green-100 text-green-700' :
                        offer.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {offer.status === 'active' ? 'Active' : offer.status === 'paused' ? 'En pause' : 'Fermée'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {offer.candidates} candidats
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {offer.views} vues
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-fibem-primary">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-fibem-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Link
                  href="/emploi/recruteur/nouvelle-offre"
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Créer une nouvelle offre
                </Link>
              </div>
            </div>
          </div>

          {/* Suggested profiles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="font-bold text-lg text-gray-800">Profils suggérés</h2>
                <p className="text-sm text-gray-500">Basés sur vos offres actives</p>
              </div>
              <div className="divide-y">
                {candidateProfiles.map((profile) => (
                  <div key={profile.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-fibem-primary rounded-full flex items-center justify-center text-white font-bold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            {profile.match}% match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{profile.title}</p>
                        <p className="text-xs text-gray-500">{profile.experience} • {profile.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex-1 py-1.5 text-sm border border-fibem-primary text-fibem-primary rounded hover:bg-fibem-light transition-colors">
                        Voir profil
                      </button>
                      <button className="flex-1 py-1.5 text-sm bg-fibem-primary text-white rounded hover:bg-fibem-dark transition-colors">
                        Contacter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Link
                  href="/emploi/recruteur/cvtheque"
                  className="block text-center text-fibem-primary font-medium hover:underline"
                >
                  Accéder à la CVthèque
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Outils recruteur</h2>
              <div className="space-y-3">
                <Link href="/emploi/recruteur/simulateur" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Simulateur d'entretien</h4>
                    <p className="text-xs text-gray-500">Préparez vos entretiens</p>
                  </div>
                </Link>
                <Link href="/emploi/recruteur/fiches-metier" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Fiches métier</h4>
                    <p className="text-xs text-gray-500">Référentiel des métiers</p>
                  </div>
                </Link>
                <Link href="/emploi/recruteur/statistiques" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Statistiques</h4>
                    <p className="text-xs text-gray-500">Analyses et rapports</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
