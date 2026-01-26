'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchStore } from '@/stores/searchStore'
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle } from '../ui/credenza'
import { Search, FileText, Briefcase, Users, Receipt, Building2, Home, Phone, Settings, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface SearchPage {
    title: string
    description: string
    href: string
    icon: any
    category: string
}

const searchablePages: SearchPage[] = [
    // Home & Info
    { title: 'Accueil', description: 'Page d\'accueil FIBEM', href: '/', icon: Home, category: 'Navigation' },
    { title: 'À Propos', description: 'Découvrez l\'histoire et les valeurs de FIBEM', href: '/a-propos', icon: Users, category: 'Navigation' },
    { title: 'Actualités', description: 'Dernières nouvelles et actualités', href: '/actualites', icon: TrendingUp, category: 'Navigation' },
    { title: 'Contact', description: 'Contactez notre équipe', href: '/contact', icon: Phone, category: 'Navigation' },

    // Services
    { title: 'Services', description: 'Tous nos services professionnels', href: '/services', icon: Briefcase, category: 'Services' },
    { title: 'Prestations', description: 'Nos prestations de services', href: '/services/prestations', icon: Briefcase, category: 'Services' },
    { title: 'Tarifs', description: 'Grille tarifaire et plans', href: '/services/tarifs', icon: Receipt, category: 'Services' },
    { title: 'Plaquette', description: 'Télécharger notre brochure', href: '/services/plaquette', icon: FileText, category: 'Services' },

    // Human Capital
    { title: 'Formulaire CV', description: 'Créer un CV professionnel', href: '/services/formulaire-cv', icon: FileText, category: 'Gestion RH' },
    { title: 'Fiche Candidat', description: 'Gérer les candidatures', href: '/services/fiche-candidat', icon: Users, category: 'Gestion RH' },
    { title: 'Feuille d\'heures', description: 'Suivi du temps de travail', href: '/services/feuille-heures', icon: Receipt, category: 'Gestion RH' },

    // Administrative
    { title: 'Modèle Devis', description: 'Créer des devis professionnels', href: '/services/modele-devis', icon: FileText, category: 'Administratif' },
    { title: 'Modèle Facture', description: 'Générer des factures', href: '/services/modele-facture', icon: Receipt, category: 'Administratif' },
    { title: 'Modèle Avoir', description: 'Créer des avoirs', href: '/services/modele-avoir', icon: FileText, category: 'Administratif' },
    { title: 'Fiche Établissement', description: 'Documenter vos partenaires', href: '/services/fiche-etablissement', icon: Building2, category: 'Administratif' },
    { title: 'Devis & Factures', description: 'Hub devis et facturation', href: '/services/devis-factures', icon: Receipt, category: 'Administratif' },

    // Ecosystem
    { title: 'Autres Sites', description: 'Nos plateformes partenaires', href: '/services/autres-sites', icon: TrendingUp, category: 'Écosystème' },

    // Employment
    { title: 'Emploi', description: 'Offres d\'emploi et recrutement', href: '/emploi', icon: Briefcase, category: 'Emploi' },
    { title: 'Espace Candidat', description: 'Espace pour les candidats', href: '/emploi/candidat', icon: Users, category: 'Emploi' },
    { title: 'Espace Recruteur', description: 'Espace pour les recruteurs', href: '/emploi/recruteur', icon: Building2, category: 'Emploi' },
    { title: 'Espace Stagiaire', description: 'Espace pour les stagiaires', href: '/emploi/stagiaire', icon: Users, category: 'Emploi' },

    // Auth
    { title: 'Connexion', description: 'Se connecter à votre compte', href: '/connexion', icon: Settings, category: 'Compte' },
    { title: 'Inscription', description: 'Créer un nouveau compte', href: '/inscription', icon: Users, category: 'Compte' },
    { title: 'Dashboard', description: 'Tableau de bord', href: '/dashboard', icon: Home, category: 'Compte' },
]

function SearchModal() {
    const { open, close, search, setSearch } = useSearchStore()
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const filteredPages = useMemo(() => {
        if (!search.trim()) return searchablePages

        const query = search.toLowerCase()
        return searchablePages.filter(page =>
            page.title.toLowerCase().includes(query) ||
            page.description.toLowerCase().includes(query) ||
            page.category.toLowerCase().includes(query)
        )
    }, [search])

    const handleNavigate = (href: string) => {
        router.push(href)
        setSearch('')
        close()
    }

    useEffect(() => {
        setSelectedIndex(0)
    }, [search])

    useEffect(() => {
        if (!open) {
            setSearch('')
            setSelectedIndex(0)
        }
    }, [open, setSearch])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => (prev + 1) % filteredPages.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => (prev - 1 + filteredPages.length) % filteredPages.length)
            } else if (e.key === 'Enter' && filteredPages[selectedIndex]) {
                e.preventDefault()
                handleNavigate(filteredPages[selectedIndex].href)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, selectedIndex, filteredPages])

    const groupedPages = useMemo(() => {
        const groups: Record<string, SearchPage[]> = {}
        filteredPages.forEach(page => {
            if (!groups[page.category]) {
                groups[page.category] = []
            }
            groups[page.category].push(page)
        })
        return groups
    }, [filteredPages])

    return (
        <Credenza open={open} onOpenChange={close}>
            <CredenzaContent className="max-w-2xl">
                <CredenzaHeader className="border-b pb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une page... (tapez pour filtrer)"
                            className="pl-10 pr-4 h-12 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            autoFocus
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">↑↓</kbd>
                        <span>Naviguer</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">Enter</kbd>
                        <span>Sélectionner</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">Esc</kbd>
                        <span>Fermer</span>
                    </div>
                </CredenzaHeader>

                <CredenzaBody className="max-h-[60vh] overflow-y-auto">
                    {filteredPages.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Aucun résultat trouvé</p>
                            <p className="text-sm">Essayez avec d'autres mots-clés</p>
                        </div>
                    ) : (
                        <div className="space-y-6 py-4">
                            {Object.entries(groupedPages).map(([category, pages]) => (
                                <div key={category}>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                                        {category}
                                    </h3>
                                    <div className="space-y-1">
                                        {pages.map((page, idx) => {
                                            const globalIndex = filteredPages.indexOf(page)
                                            const isSelected = globalIndex === selectedIndex
                                            const Icon = page.icon

                                            return (
                                                <button
                                                    key={page.href}
                                                    onClick={() => handleNavigate(page.href)}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                    className={cn(
                                                        "w-full flex items-start gap-4 p-3 rounded-xl transition-all text-left",
                                                        isSelected
                                                            ? "bg-fibem-primary text-white shadow-md"
                                                            : "hover:bg-gray-100"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                                        isSelected ? "bg-white/20" : "bg-fibem-light"
                                                    )}>
                                                        <Icon className={cn(
                                                            "w-5 h-5",
                                                            isSelected ? "text-white" : "text-fibem-primary"
                                                        )} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={cn(
                                                            "font-bold mb-1",
                                                            isSelected ? "text-white" : "text-fibem-dark"
                                                        )}>
                                                            {page.title}
                                                        </h4>
                                                        <p className={cn(
                                                            "text-sm line-clamp-1",
                                                            isSelected ? "text-blue-100" : "text-gray-600"
                                                        )}>
                                                            {page.description}
                                                        </p>
                                                    </div>
                                                    {isSelected && (
                                                        <kbd className="px-2 py-1 bg-white/20 rounded text-xs shrink-0">
                                                            Enter
                                                        </kbd>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    )
}

export default SearchModal