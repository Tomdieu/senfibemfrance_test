"use client";

import { useEffect, useState, use } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Loader2,
  ArrowLeft,
  Building2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { fetchJobOffer } from "@/actions/jobs";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import { useSession } from "next-auth/react";

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = use(params);
  const [job, setJob] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobOffer(parseInt(id));
        setJob(data);
    console.log("Session in JobDetailsPage:", session, "Data fetched:", data);

      } catch (err) {
        setError("Offre non trouvée");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-fibem-primary animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          {error || "Offre non trouvée"}
        </h1>
        <Link
          href="/emploi/offres"
          className="text-fibem-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux offres
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto bg-gray-50 pb-20">
      <div className="bg-white border-b mb-8">
        <div className=" px-4 py-8">
          <Link
            href="/emploi/offres"
            className="text-gray-500 hover:text-fibem-primary flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux offres
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full uppercase">
                  {job.contract_type}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-full">
                  Poste Ouvert
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  {job.recruiter_name}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  {job.salary_range}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              Publiée le {new Date(job.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className=" px-4 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Description du poste
            </h2>
            <div className="prose prose-blue max-w-none text-gray-600">
              {job.description.split("\n").map((para, i) => (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* <section className="bg-blue-900 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-fibem-accent">
                À propos de l'entreprise
              </h3>
              <p className="text-blue-100 mb-6">
                Rejoignez une équipe dynamique et innovante. Nous valorisons la
                diversité, l'initiative et le développement professionnel de nos
                collaborateurs.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  10-50 collaborateurs
                </span>
                <span className="flex items-center gap-1 text-fibem-accent">
                  ★ 4.5/5 Glassdoor
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0 -transtion-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </section> */}
        </div>

        <div>
          {job.recruiter !== session?.user.id && (
            <JobApplicationForm jobId={job.id} jobTitle={job.title} />
          )}

          <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-2">
              Conseil Recrutement
            </h4>
            <p className="text-sm text-amber-800">
              Assurez-vous que votre CV est à jour et que votre lettre de
              motivation souligne vos réalisations les plus pertinentes pour ce
              poste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
