'use client'

import { useEffect, useState } from 'react'
import { Briefcase, MapPin, DollarSign, Calendar, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { fetchJobOffers } from '@/actions/jobs'

export default function JobOffersPage() {
  const [jobs, setJobs] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobOffers()
        setJobs(data)
      } catch (err) {
        setError('Erreur lors du chargement des offres d\'emploi')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Offres d'Emploi & Stages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez votre prochaine opportunité parmi nos offres sélectionnées.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
            <p className="text-gray-500">Chargement des offres...</p>
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
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Aucune offre d'emploi disponible pour le moment.
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase">
                        {job.contract_type}
                      </span>
                      {job.is_active ? (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                          Actif
                        </span>
                      ) : null}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.recruiter_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary_range}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/emploi/offres/${job.id}`}
                      className="px-6 py-2 bg-fibem-primary text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                    >
                      Détails
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}