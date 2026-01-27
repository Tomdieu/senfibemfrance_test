'use client'

import { useI18n } from '@/locales/client'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

// Mock Data with Real Images
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Les opportunités d\'emploi au Sénégal en 2025',
    excerpt: 'Analyse approfondie des secteurs porteurs et des compétences les plus recherchées par les recruteurs cette année.',
    category: 'Emploi',
    date: '2025-01-20',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
    featured: true
  },
  {
    id: '2',
    title: 'Comment réussir son entretien d\'embauche en visio',
    excerpt: 'Nos conseils d\'experts pour maîtriser l\'art de l\'entretien à distance et convaincre les recruteurs.',
    category: 'Conseils RH',
    date: '2025-01-18',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Le télétravail : Norme ou exception ?',
    excerpt: 'État des lieux de la pratique du télétravail dans les entreprises françaises et sénégalaises.',
    category: 'Tendance',
    date: '2025-01-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'SEN FIBEM lance sa nouvelle plateforme',
    excerpt: 'Découvrez les nouvelles fonctionnalités conçues pour faciliter la mise en relation entre candidats et recruteurs.',
    category: 'News FIBEM',
    date: '2025-01-10',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Les soft skills indispensables pour les managers',
    excerpt: 'Au-delà des compétences techniques, quelles sont les qualités humaines qui font un bon leader ?',
    category: 'Management',
    date: '2025-01-05',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Droit du travail : Ce qui change cette année',
    excerpt: 'Un récapitulatif des nouvelles réformes législatives impactant les contrats de travail et les cotisations.',
    category: 'Juridique',
    date: '2024-12-28',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    title: 'L\'importance de la formation continue',
    excerpt: 'Pourquoi il est crucial de continuer à se former tout au long de sa carrière professionnelle.',
    category: 'Formation',
    date: '2024-12-20',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'Entreprendre au Sénégal : Guide pratique',
    excerpt: 'Les étapes clés pour créer son entreprise et les pièges à éviter pour les jeunes entrepreneurs.',
    category: 'Entrepreneuriat',
    date: '2024-12-15',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    title: 'La digitalisation des services RH',
    excerpt: 'Comment les outils numériques transforment la gestion des ressources humaines au quotidien.',
    category: 'Tech & RH',
    date: '2024-12-10',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    title: 'Événement : Salon de l\'emploi à Dakar',
    excerpt: 'Retour en images sur le dernier salon de l\'emploi organisé par SEN FIBEM.',
    category: 'Événement',
    date: '2024-12-05',
    readTime: '2 min',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  }
]

export default function ActualitesPage() {
  const t = useI18n()
  const featuredPost = MOCK_POSTS.find(p => p.featured) || MOCK_POSTS[0]
  const otherPosts = MOCK_POSTS.filter(p => p.id !== featuredPost.id)

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-fibem-primary/10 text-fibem-primary hover:bg-fibem-primary/20 transition-colors border-none px-4 py-1.5 text-sm font-medium rounded-full">
              Blog & News
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Actualités & <span className="text-fibem-primary">Insights</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Toutes les dernières nouvelles, analyses et tendances sur l'emploi,
              l'entrepreneuriat et le business entre la France et le Sénégal.
            </p>
          </div>

          {/* Featured Post */}
          <div className="max-w-6xl mx-auto">
            <Link href={`#`} className="group block relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2 h-full bg-slate-900">
                <div className="h-64 md:h-auto w-full relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center text-white relative z-10">
                  <div className="flex items-center gap-4 mb-6 text-sm font-medium text-slate-300">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white">
                      <Tag className="w-3.5 h-3.5" />
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-fibem-primary/90 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-slate-300 mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-fibem-primary font-bold uppercase tracking-wide text-sm group-hover:translate-x-1 transition-transform">
                    Lire l'article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              href={`#`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Image */}
              <div className="h-48 w-full relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-full text-slate-800 shadow-sm uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-fibem-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-fibem-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                    Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-300 text-slate-600 hover:text-fibem-primary hover:border-fibem-primary transition-all">
            Charger plus d'articles
          </Button>
        </div>
      </section>
    </div>
  )
}