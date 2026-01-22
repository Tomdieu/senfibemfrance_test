'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Calendar,
  CheckCircle,
  FileText,
  Briefcase,
  Plus,
  Eye,
  Download,
  Edit
} from 'lucide-react'

const recentProjects = [
  { id: 1, name: 'Rénovation cuisine', client: 'Mr Mendy', status: 'en_cours', progress: 65, date: '15/01/2026' },
  { id: 2, name: 'Installation électrique', client: 'Mme Dupont', status: 'termine', progress: 100, date: '10/01/2026' },
  { id: 3, name: 'Plomberie SdB', client: 'Ets Tharreau', status: 'en_attente', progress: 0, date: '20/01/2026' },
  { id: 4, name: 'Peinture appartement', client: 'Mr Bernard', status: 'abandonne', progress: 30, date: '05/01/2026' },
]

const recentDocuments = [
  { id: 1, type: 'Devis', number: 'DE-0001', client: 'Mr Mendy', amount: '2 500 €', status: 'signe', date: '12/01/2026' },
  { id: 2, type: 'Facture', number: 'FA-0001', client: 'Mme Dupont', amount: '1 800 €', status: 'payee', date: '10/01/2026' },
  { id: 3, type: 'Devis', number: 'DE-0002', client: 'Ets Tharreau', amount: '4 200 €', status: 'en_attente', date: '18/01/2026' },
  { id: 4, type: 'Avoir', number: 'AV-0001', client: 'Mr Bernard', amount: '-350 €', status: 'emis', date: '08/01/2026' },
]

const getStatusBadge = (status: string) => {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    en_cours: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En cours' },
    termine: { bg: 'bg-green-100', text: 'text-green-700', label: 'Terminé' },
    en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En attente' },
    abandonne: { bg: 'bg-red-100', text: 'text-red-700', label: 'Abandonné' },
    signe: { bg: 'bg-green-100', text: 'text-green-700', label: 'Signé' },
    payee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Payée' },
    emis: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Émis' },
  }
  const style = styles[status] || styles.en_attente
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}

export default function DashboardPage() {
  return (
    <>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">24</h3>
          <p className="text-gray-500 text-sm">Projets en cours</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">156</h3>
          <p className="text-gray-500 text-sm">Projets terminés</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-gray-500 text-sm font-medium">Ce mois</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">12 450 €</h3>
          <p className="text-gray-500 text-sm">Devis en attente</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +25%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">45 800 €</h3>
          <p className="text-gray-500 text-sm">CA ce mois</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Projets récents</h3>
            <Link href="/dashboard/projets" className="text-fibem-primary text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="divide-y">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{project.name}</h4>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-fibem-primary rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span>{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-fibem-primary hover:text-fibem-primary transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau projet
            </button>
          </div>
        </div>

        {/* Recent documents */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Documents récents</h3>
            <Link href="/dashboard/documents" className="text-fibem-primary text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="divide-y">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === 'Devis' ? 'bg-blue-100 text-blue-600' :
                        doc.type === 'Facture' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                      }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{doc.type} {doc.number}</h4>
                      <p className="text-sm text-gray-500">{doc.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{doc.amount}</p>
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-sm text-gray-500">{doc.date}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-fibem-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-fibem-primary">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-fibem-primary">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-fibem-primary hover:text-fibem-primary transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau document
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
