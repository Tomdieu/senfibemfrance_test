'use client'

import { useEffect, useState, use } from 'react'
import { CheckCircle, Phone, Mail, Loader2, ArrowLeft, Star, ShieldCheck, Clock } from 'lucide-react'
import Link from 'next/link'
import { fetchServices } from '@/actions/services'
import RequestQuoteModal from '@/components/services/RequestQuoteModal'

interface ServiceDetailsPageProps {
    params: Promise<{
        id: string
        locale: string
    }>
}

export default function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
    const { id } = use(params)
    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadService = async () => {
            try {
                const services = await fetchServices()
                const found = services.find(s => s.id.toString() === id)
                setService(found || null)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadService()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin" />
            </div>
        )
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
                <Link href="/services/prestations" className="text-fibem-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux prestations
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Link href="/services/prestations" className="text-gray-500 hover:text-fibem-primary flex items-center gap-2 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux prestations
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-sm font-medium text-fibem-primary bg-blue-50 w-fit px-3 py-1 rounded-full">
                                <ShieldCheck className="w-4 h-4" />
                                Professionnel vérifié
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-6 mt-8">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                    <span className="ml-2 font-bold text-gray-900">4.9</span>
                                    <span className="text-gray-500 text-sm">(124 avis)</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Clock className="w-4 h-4" />
                                    Réponse moyenne en 2h
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="mb-6">
                                <p className="text-gray-500 text-sm mb-1">Prix indicatif</p>
                                <p className="text-4xl font-bold text-gray-900">
                                    {service.base_price} € <span className="text-lg font-normal text-gray-500">TTC</span>
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Devis gratuit et sans engagement</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Assurance responsabilité civile incluse</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Paiement sécurisé via la plateforme</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-4 bg-fibem-primary text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-xl active:scale-[0.98]"
                            >
                                Demander un devis personnalisé
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Service opéré par notre réseau de professionnels certifiés
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RequestQuoteModal
                service={service}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
