'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import {
    Plus,
    Briefcase,
    MapPin,
    DollarSign,
    Calendar,
    Loader2,
    ArrowRight,
    Edit,
    Trash2,
    Users,
    Eye,
    MoreVertical,
    CheckCircle2,
    Power
} from 'lucide-react'
import Link from 'next/link'
import { fetchJobOffers } from '@/actions/jobs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useJobOfferStore } from '@/stores/jobOfferStore'
import JobOfferModal from './_components/JobOfferModal'

export default function OffresDashboardPage() {
    const { data: session } = useSession()
    const { onAdd, setJobOffer, setMode } = useJobOfferStore()

    const { data: jobs = [], isLoading: loading, error } = useQuery({
        queryKey: ['jobOffers'],
        queryFn: () => fetchJobOffers(),
        enabled: !!session?.user,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement de vos offres...</p>
            </div>
        )
    }

    const userRole = session?.user?.role as string

    const handleCreateJobOffer = () => {
        setMode('create')
        onAdd()
    }

    const handleEditJobOffer = (job: JobOffer) => {
        setJobOffer(job, 'update')
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {userRole === 'CANDIDAT' ? 'Opportunités d\'Emploi' : 'Mes Offres d\'Emploi'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {userRole === 'CANDIDAT'
                            ? 'Découvrez les dernières offres qui correspondent à votre profil.'
                            : 'Gérez vos publications et trouvez les meilleurs candidats pour vos postes.'}
                    </p>
                </div>
                {userRole !== 'CANDIDAT' ? (
                    <Button onClick={handleCreateJobOffer} className="bg-fibem-primary hover:bg-fibem-primary/90 shadow-md h-12 px-8 rounded-xl font-bold">
                        <Plus className="w-5 h-5 mr-2" />
                        Publier une offre
                    </Button>
                ) : (
                    <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 shadow-md h-12 px-8 rounded-xl font-bold">
                        <Link href="/emploi/offres">
                            <Briefcase className="w-5 h-5 mr-2" />
                            Chercher un emploi
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid gap-6">
                {jobs.map((job) => (
                    <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-none uppercase text-[10px] font-bold">
                                            {job.contract_type}
                                        </Badge>
                                        <Badge variant={job.is_active ? 'default' : 'destructive'} className="text-[10px] uppercase font-bold">
                                            {job.is_active ? 'Publiée' : 'Désactivée'}
                                        </Badge>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-fibem-primary transition-colors">{job.title}</h2>
                                    <p className="text-sm text-gray-600 font-medium">{job.company_name}</p>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            {job.salary_range}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Postée le {new Date(job.created_at).toLocaleDateString()}
                                        </span>
                                        
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {userRole !== 'CANDIDAT' && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-gray-400 hover:text-fibem-primary hover:bg-blue-50 rounded-xl"
                                                onClick={() => handleEditJobOffer(job)}
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-45">
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                        <CheckCircle2 className="w-4 h-4 mr-2" /> Clôturer le poste
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium">
                                                        <Power className="w-4 h-4 mr-2" /> Suspendre
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="py-2 cursor-pointer font-medium text-destructive">
                                                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 border-none shadow-none font-bold rounded-xl h-10 px-6">
                                                <Link href={`/dashboard/offres/${job.id}`}>
                                                    Gérer
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                    {userRole === 'CANDIDAT' && (
                                        <Button asChild className="bg-fibem-primary hover:bg-fibem-primary/90 border-none shadow-none font-bold rounded-xl h-10 px-6">
                                            <Link href={`/emploi/offres/${job.id}`}>
                                                Voir l'offre
                                                <ArrowRight className="w-4 h-4 ml-3" />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {jobs.length === 0 && (
                    <div className="py-32 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-100">
                        <Briefcase className="w-20 h-20 text-gray-100 mx-auto mb-6 opacity-20" />
                        <p className="text-xl font-bold text-gray-600">
                            {userRole === 'CANDIDAT' ? 'Aucune offre disponible pour le moment.' : 'Vous n\'avez pas encore publié d\'offre.'}
                        </p>
                        <p className="text-sm mt-1 mb-8">
                            {userRole === 'CANDIDAT' ? 'Revenez plus tard pour voir les nouvelles opportunités.' : 'Commencez à recruter dès maintenant sur senfibem.'}
                        </p>
                        {userRole !== 'CANDIDAT' && (
                            <Button onClick={handleCreateJobOffer} className="bg-fibem-primary hover:bg-fibem-primary/90 h-11 px-8 rounded-xl font-bold">
                                Créer ma première offre
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <JobOfferModal />
        </div>
    )
}
