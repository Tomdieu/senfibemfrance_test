'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Download, Plus, Search, Filter, Eye, Edit, Trash2, Send, CheckCircle } from 'lucide-react'

type DocumentType = 'devis' | 'facture' | 'avoir'

const documents = [
  { id: 1, type: 'devis' as DocumentType, number: 'DE-0001', client: 'Mr Mendy Charles', project: 'Rénovation SdB', amount: 2500, status: 'signe', date: '12/01/2026' },
  { id: 2, type: 'facture' as DocumentType, number: 'FA-0001', client: 'Mme Dupont Marie', project: 'Installation électrique', amount: 1800, status: 'payee', date: '10/01/2026' },
  { id: 3, type: 'devis' as DocumentType, number: 'DE-0002', client: 'Ets Tharreau', project: 'Plomberie bureaux', amount: 4200, status: 'en_attente', date: '18/01/2026' },
  { id: 4, type: 'avoir' as DocumentType, number: 'AV-0001', client: 'Mr Bernard Pierre', project: 'Remboursement partiel', amount: -350, status: 'emis', date: '08/01/2026' },
  { id: 5, type: 'facture' as DocumentType, number: 'FA-0002', client: 'SARL Martin', project: 'Développement site web', amount: 3500, status: 'en_attente', date: '15/01/2026' },
]

const getStatusBadge = (status: string) => {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En attente' },
    signe: { bg: 'bg-green-100', text: 'text-green-700', label: 'Signé' },
    payee: { bg: 'bg-green-100', text: 'text-green-700', label: 'Payée' },
    emis: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Émis' },
    refuse: { bg: 'bg-red-100', text: 'text-red-700', label: 'Refusé' },
  }
  const style = styles[status] || styles.en_attente
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  )
}

const getTypeIcon = (type: DocumentType) => {
  const colors: Record<DocumentType, string> = {
    devis: 'bg-blue-100 text-blue-600',
    facture: 'bg-green-100 text-green-600',
    avoir: 'bg-red-100 text-red-600',
  }
  return colors[type]
}

export default function DevisFacturesPage() {
  const [filter, setFilter] = useState<'all' | DocumentType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = documents.filter(doc => {
    if (filter !== 'all' && doc.type !== filter) return false
    if (searchQuery && !doc.client.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doc.number.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    devisEnAttente: documents.filter(d => d.type === 'devis' && d.status === 'en_attente').reduce((sum, d) => sum + d.amount, 0),
    facturesEnAttente: documents.filter(d => d.type === 'facture' && d.status === 'en_attente').reduce((sum, d) => sum + d.amount, 0),
    totalPaye: documents.filter(d => d.status === 'payee').reduce((sum, d) => sum + d.amount, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-fibem-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Devis, Factures & Avoirs</h1>
          <p className="text-blue-100">Gérez tous vos documents commerciaux en un seul endroit</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Devis en attente</p>
                <p className="text-2xl font-bold text-gray-800">{stats.devisEnAttente.toLocaleString()} €</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Factures à encaisser</p>
                <p className="text-2xl font-bold text-gray-800">{stats.facturesEnAttente.toLocaleString()} €</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total encaissé</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalPaye.toLocaleString()} €</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-fibem-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilter('devis')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'devis' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Devis
              </button>
              <button
                onClick={() => setFilter('facture')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'facture' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Factures
              </button>
              <button
                onClick={() => setFilter('avoir')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'avoir' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Avoirs
              </button>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary text-sm"
                />
              </div>
              <button className="px-4 py-2 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nouveau</span>
              </button>
            </div>
          </div>
        </div>

        {/* Documents list */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Document</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Projet</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Montant</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Statut</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeIcon(doc.type)}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{doc.number}</p>
                          <p className="text-xs text-gray-500 capitalize">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{doc.client}</td>
                    <td className="px-6 py-4 text-gray-600">{doc.project}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${doc.amount < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {doc.amount.toLocaleString()} €
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(doc.status)}</td>
                    <td className="px-6 py-4 text-center text-gray-500 text-sm">{doc.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-fibem-primary transition-colors" title="Voir">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-fibem-primary transition-colors" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Envoyer">
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="Télécharger">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun document trouvé</p>
            </div>
          )}
        </div>

        {/* Quick create buttons */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link
            href="/services/devis-factures/nouveau-devis"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Nouveau Devis</h3>
              <p className="text-sm text-gray-500">Créer un devis client</p>
            </div>
          </Link>
          <Link
            href="/services/devis-factures/nouvelle-facture"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Nouvelle Facture</h3>
              <p className="text-sm text-gray-500">Créer une facture</p>
            </div>
          </Link>
          <Link
            href="/services/devis-factures/nouvel-avoir"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
          >
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Nouvel Avoir</h3>
              <p className="text-sm text-gray-500">Créer un avoir</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
