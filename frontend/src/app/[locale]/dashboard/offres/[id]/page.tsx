'use client'

import { use, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, Users, Loader2, Building2, FileText, X, Check, Eye, XCircle } from 'lucide-react'
import { getJobfferDetail, getJobOfferApplications, acceptJobApplication, reviewJobApplication, rejectJobApplication } from '@/actions/jobs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

interface OfferDetailsDashboardPageProps {
  params: Promise<{
    id: string
    locale: string
  }>
}

export default function OfferDetailsDashboardPage({ params }: OfferDetailsDashboardPageProps) {
  const { id } = use(params)
  const { data: session } = useSession()
  const jobId = parseInt(id)

  // State for document preview
  const [documentPreview, setDocumentPreview] = useState<{ url: string; type: 'cv' | 'cover_letter'; candidateName: string } | null>(null);

  // Query client for invalidating queries
  const queryClient = useQueryClient();

  // Fetch job offer details
  const { data: job, isLoading: jobLoading, error: jobError } = useQuery({
    queryKey: ['jobOffer', jobId],
    queryFn: () => getJobfferDetail(jobId),
    enabled: !!jobId,
  })

  // Fetch applications for this job
  const { data: applications = [], isLoading: applicationsLoading, error: applicationsError } = useQuery({
    queryKey: ['jobApplications', jobId],
    queryFn: () =>
      getJobOfferApplications({
        id: jobId,
        token: session?.user?.access_token || '',
      }),
    enabled: !!jobId && !!session?.user?.access_token,
  })

  // Mutation for accepting job application
  const acceptApplicationMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      acceptJobApplication({ id, token }),
    onSuccess: () => {
      toast.success('Candidature acceptée avec succès');
      queryClient.invalidateQueries({ queryKey: ['jobApplications', jobId] });
    },
    onError: (error) => {
      console.error('Error accepting application:', error);
      toast.error('Erreur lors de l\'acceptation de la candidature');
    }
  });

  // Mutation for reviewing job application
  const reviewApplicationMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      reviewJobApplication({ id, token }),
    onSuccess: () => {
      toast.success('Candidature mise en examen avec succès');
      queryClient.invalidateQueries({ queryKey: ['jobApplications', jobId] });
    },
    onError: (error) => {
      console.error('Error reviewing application:', error);
      toast.error('Erreur lors de la mise en examen de la candidature');
    }
  });

  // Mutation for rejecting job application
  const rejectApplicationMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      rejectJobApplication({ id, token }),
    onSuccess: () => {
      toast.success('Candidature rejetée avec succès');
      queryClient.invalidateQueries({ queryKey: ['jobApplications', jobId] });
    },
    onError: (error) => {
      console.error('Error rejecting application:', error);
      toast.error('Erreur lors du rejet de la candidature');
    }
  });

  const isLoading = jobLoading || applicationsLoading

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-fibem-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement des détails...</p>
      </div>
    )
  }

  if (jobError || !job) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Offre non trouvée</h1>
        <Link href="/dashboard/offres" className="text-fibem-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour aux offres
        </Link>
      </div>
    )
  }

  const statusMap: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'En attente', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    REVIEWING: { label: 'En examen', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    ACCEPTED: { label: 'Acceptée', color: 'bg-green-50 text-green-700 border-green-200' },
    REJECTED: { label: 'Rejetée', color: 'bg-red-50 text-red-700 border-red-200' },
  }

  // Function to handle document preview
  const handleDocumentPreview = (url: string, type: 'cv' | 'cover_letter', candidateName: string) => {
    setDocumentPreview({ url, type, candidateName });
  };

  // Function to close document preview
  const closeDocumentPreview = () => {
    setDocumentPreview(null);
  };

  // Handler functions for application actions
  const handleAcceptApplication = (applicationId: number) => {
    if (!session?.user?.access_token) {
      toast.error('Vous devez être connecté pour effectuer cette action');
      return;
    }
    acceptApplicationMutation.mutate({ id: applicationId, token: session.user.access_token });
  };

  const handleReviewApplication = (applicationId: number) => {
    if (!session?.user?.access_token) {
      toast.error('Vous devez être connecté pour effectuer cette action');
      return;
    }
    reviewApplicationMutation.mutate({ id: applicationId, token: session.user.access_token });
  };

  const handleRejectApplication = (applicationId: number) => {
    if (!session?.user?.access_token) {
      toast.error('Vous devez être connecté pour effectuer cette action');
      return;
    }
    rejectApplicationMutation.mutate({ id: applicationId, token: session.user.access_token });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/offres" className="text-gray-500 hover:text-fibem-primary flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      {/* Job Details Card */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-8 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-none uppercase text-[10px] font-bold">
                {job.contract_type}
              </Badge>
              <Badge variant={job.is_active ? 'default' : 'destructive'} className="text-[10px] uppercase font-bold">
                {job.is_active ? 'Publiée' : 'Désactivée'}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-lg text-gray-600 font-medium">{job.company_name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Emplacement</p>
                <p className="text-gray-900 font-semibold">{job.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Fourchette salariale</p>
                <p className="text-gray-900 font-semibold">{job.salary_range}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Nombre de places</p>
                <p className="text-gray-900 font-semibold">{job.num_of_place}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Date de publication</p>
                <p className="text-gray-900 font-semibold">{new Date(job.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Description du poste</h3>
            <div className="prose prose-blue max-w-none text-gray-600 whitespace-pre-wrap">{job.description}</div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Candidatures</h2>
          <Badge variant="outline" className="bg-fibem-primary/10 text-fibem-primary border-fibem-primary/20 text-lg px-3 py-1">
            {applications.length}
          </Badge>
        </div>

        {applications.length === 0 ? (
          <Card className="border-none shadow-sm">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-xl font-bold text-gray-600 mb-2">Aucune candidature reçue</p>
              <p className="text-gray-500">Les candidats qui postuleront apparaîtront ici.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {applications.map((application) => (
              <Card key={application.id} className="border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{application.candidate_name}</h3>
                        <Badge className={`${statusMap[application.status]?.color || ''} border`}>
                          {statusMap[application.status]?.label || application.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Candidature reçue le {new Date(application.applied_at).toLocaleDateString()}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 text-sm text-fibem-primary hover:underline font-medium p-0 h-auto"
                          onClick={() => handleDocumentPreview(application.cv_file, 'cv', application.candidate_name)}
                        >
                          <FileText className="w-4 h-4" />
                          Voir le CV
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 text-sm text-fibem-primary hover:underline font-medium p-0 h-auto"
                          onClick={() => handleDocumentPreview(application.cover_letter, 'cover_letter', application.candidate_name)}
                        >
                          <FileText className="w-4 h-4" />
                          Voir la lettre de motivation
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {application.status === 'PENDING' && (
                        <>
                          <Button
                            variant="outline"
                            className="rounded-lg"
                            onClick={() => handleReviewApplication(application.id)}
                            disabled={reviewApplicationMutation.isPending}
                          >
                            {reviewApplicationMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                En examen...
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Examiner
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50 rounded-lg"
                            onClick={() => handleAcceptApplication(application.id)}
                            disabled={acceptApplicationMutation.isPending}
                          >
                            {acceptApplicationMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Accepter...
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Accepter
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleRejectApplication(application.id)}
                            disabled={rejectApplicationMutation.isPending}
                          >
                            {rejectApplicationMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Rejeter...
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Rejeter
                              </>
                            )}
                          </Button>
                        </>
                      )}

                      {application.status === 'REVIEWING' && (
                        <>
                          <Button
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50 rounded-lg"
                            onClick={() => handleAcceptApplication(application.id)}
                            disabled={acceptApplicationMutation.isPending}
                          >
                            {acceptApplicationMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Accepter...
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Accepter
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleRejectApplication(application.id)}
                            disabled={rejectApplicationMutation.isPending}
                          >
                            {rejectApplicationMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Rejeter...
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Rejeter
                              </>
                            )}
                          </Button>
                        </>
                      )}

                      {(application.status === 'ACCEPTED' || application.status === 'REJECTED') && (
                        <Button
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-lg"
                          onClick={() => handleReviewApplication(application.id)}
                          disabled={reviewApplicationMutation.isPending}
                        >
                          {reviewApplicationMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Remettre en examen...
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Remettre en examen
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {documentPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full h-[90vh] max-w-6xl bg-white rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white text-gray-800"
                onClick={closeDocumentPreview}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="h-full w-full overflow-auto">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold">
                  {documentPreview.type === 'cv'
                    ? `CV de ${documentPreview.candidateName}`
                    : `Lettre de motivation de ${documentPreview.candidateName}`}
                </h3>
              </div>

              <div className="h-[calc(100%-60px)]">
                <DocViewer
                  documents={[{ uri: documentPreview.url }]}
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: {
                      disableHeader: true,
                      disableFileName: true,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}