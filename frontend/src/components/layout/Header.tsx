'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  User,
  UserPlus,
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Settings,
  Home
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SubMenuItem {
  label: string
  href: string
  children?: SubMenuItem[]
}

interface MenuItem {
  label: string
  href: string
  submenu?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    label: 'Accueil',
    href: '/',
    submenu: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
      { label: 'Blog', href: '/blog' },
      { label: 'Actualités', href: '/actualites' },
    ]
  },
  {
    label: 'Services',
    href: '/services',
    submenu: [
      { label: 'Prestation Service', href: '/services/prestations' },
      { label: 'Tarifs', href: '/services/tarifs' },
      { label: 'Plaquette', href: '/services/plaquette' },
      { label: 'Formulaire CV', href: '/services/formulaire-cv' },
      { label: 'Feuille d\'heures', href: '/services/feuille-heures' },
      { label: 'Fiche Candidat', href: '/services/fiche-candidat' },
      { label: 'Fiche Établissement', href: '/services/fiche-etablissement' },
      { label: 'Modèle Devis', href: '/services/modele-devis' },
      { label: 'Modèle Facture', href: '/services/modele-facture' },
      { label: 'Modèle Avoir', href: '/services/modele-avoir' },
      { label: 'Autres sites', href: '/services/autres-sites' },
    ]
  },
  {
    label: 'Emploi',
    href: '/emploi',
    submenu: [
      { label: 'Espace Candidat', href: '/emploi/candidat' },
      { label: 'Espace Recruteur', href: '/emploi/recruteur' },
      { label: 'Espace Stagiaire', href: '/emploi/stagiaire' },
      { label: '── Abonnements ──', href: '/emploi/abonnements' },
      { label: 'Abonnement Stagiaire', href: '/emploi/abonnements/stagiaire' },
      { label: 'Abonnement Candidat', href: '/emploi/abonnements/candidat' },
      { label: 'Abonnement Particuliers', href: '/emploi/abonnements/particuliers' },
      { label: 'Abonnement Freelance', href: '/emploi/abonnements/freelance' },
      { label: 'Abonnement Professionnels', href: '/emploi/abonnements/professionnels' },
      { label: 'Abonnement Partenaires', href: '/emploi/abonnements/partenaires' },
    ]
  },
  {
    label: 'Contact',
    href: '/contact',
    submenu: [
      { label: 'Formulaire d\'inscription', href: '/contact/inscription' },
      { label: 'Adresse France', href: '/contact#france' },
      { label: 'Adresse Sénégal', href: '/contact#senegal' },
      { label: 'Email France', href: 'mailto:contact@senfibem.fr' },
      { label: 'Email Sénégal', href: 'mailto:contact@senfibem.sn' },
      { label: 'Carte / Localisation', href: '/contact#map' },
    ]
  },
]

// Connexion/Inscription user types
const userTypes = [
  { label: 'Stagiaire', href: '/connexion?type=stagiaire' },
  { label: 'Candidat', href: '/connexion?type=candidat' },
  { label: 'Particuliers', href: '/connexion?type=particuliers' },
  { label: 'Freelance', href: '/connexion?type=freelance' },
  { label: 'Professionnels', href: '/connexion?type=professionnels' },
  { label: 'Partenaires', href: '/connexion?type=partenaires' },
  { label: '── Administrateurs ──', href: '#' },
  { label: 'Admin Rédacteur', href: '/connexion?type=admin-redacteur' },
  { label: 'Admin Commercial', href: '/connexion?type=admin-commercial' },
  { label: 'Admin Développeur', href: '/connexion?type=admin-developpeur' },
  { label: 'Admin Chef de Projet', href: '/connexion?type=admin-chef-projet' },
  { label: 'Admin Dirigeant', href: '/connexion?type=admin-dirigeant' },
]

// Dashboard user types
const dashboardTypes = [
  { label: 'Dashboard', href: '/dashboard' },
  // { label: 'Candidat', href: '/dashboard/candidat' },
  // { label: 'Particuliers', href: '/dashboard/particuliers' },
  // { label: 'Freelance', href: '/dashboard/freelance' },
  // { label: 'Professionnels', href: '/dashboard/professionnels' },
  // { label: 'Partenaires', href: '/dashboard/partenaires' },
  // { label: '── Administrateurs ──', href: '#' },
  // { label: 'Rédacteur', href: '/dashboard/redacteur' },
  // { label: 'Commercial', href: '/dashboard/commercial' },
  // { label: 'Développeur', href: '/dashboard/developpeur' },
  // { label: 'Chef de Projet', href: '/dashboard/chef-projet' },
  // { label: 'Dirigeant', href: '/dashboard/dirigeant' },
]

// Cart/Panier submenu
const panierSubmenu = [
  { label: 'Mon Panier', href: '/panier' },
  { label: 'Espace Paiement', href: '/panier/paiement' },
  { label: 'Livraison', href: '/panier/livraison' },
  { label: 'Historique Commandes', href: '/panier/historique' },
]

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
]

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [cartCount] = useState(0)

  return (
    <header className="sticky top-0 z-50 flex flex-col font-sans">
      {/* Level 1: Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs font-medium transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          {/* Left Side: Contact & Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+221775914406"
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+221 77 591 44 06</span>
              </a>
              <a
                href="mailto:ds.senagenceb2b99@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ds.senagenceb2b99@gmail.com</span>
              </a>
            </div>
            {/* Mobile simplified tagline */}
            <div className="md:hidden flex items-center gap-2">
              <span className="w-2 h-2 bg-fibem-primary rounded-full animate-pulse"></span>
              <span className="text-white">Plateforme PRO</span>
            </div>
          </div>

          {/* Right Side: Language & Extras */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-slate-400">
              La référence pour vos projets B2B & B2C
            </span>
            <div className="h-3 w-[1px] bg-slate-700 hidden lg:block"></div>

            {/* Language Selector - Compact Dark Mode */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-1.5 text-slate-200 hover:text-white hover:bg-slate-800 data-[state=open]:bg-slate-800 flex items-center gap-1.5 rounded"
                >
                  <span className="text-sm shadow-sm rounded-sm overflow-hidden">{selectedLanguage.flag}</span>
                  <span className="hidden sm:inline font-normal">{selectedLanguage.name}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-37.5">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang)}
                    className={cn(
                      "cursor-pointer",
                      selectedLanguage.code === lang.code && "bg-slate-100 font-medium"
                    )}
                  >
                    <span className="text-lg mr-3 drop-shadow-sm">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Level 2: Main Navigation Bar */}
      <div className="bg-white shadow-md border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 lg:gap-8">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-full h-full border-2 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={"/logo.png"} width={100} height={60} alt="FIBEM Logo" />
                </div>
              </div>
              
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden xl:flex flex-1 justify-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.submenu ? (
                        <>
                          <NavigationMenuTrigger className="text-gray-700 hover:text-fibem-primary font-medium bg-transparent hover:bg-gray-50/80 data-[state=open]:bg-gray-50/80 focus:bg-gray-50/80 transition-all rounded-md px-3 py-2 h-auto text-[15px]">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-xl border-none">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.href} className={subItem.label.startsWith('──') ? 'col-span-2' : ''}>
                                  {subItem.label.startsWith('──') ? (
                                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
                                      {subItem.label.replace(/─/g, '').trim()}
                                    </div>
                                  ) : (
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={subItem.href}
                                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-fibem-primary focus:bg-slate-50 focus:text-fibem-primary group"
                                      >
                                        <div className="text-sm font-medium leading-none group-hover:translate-x-1 transition-transform">{subItem.label}</div>
                                      </Link>
                                    </NavigationMenuLink>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="text-gray-700 hover:text-fibem-primary font-medium bg-transparent hover:bg-gray-50/80 px-4 py-2 rounded-md transition-all text-[15px] flex items-center"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Actions: Search & Tools */}
            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* Search Bar (Desktop) */}
              <div className="hidden lg:flex w-52 xl:w-60 relative group">
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-full bg-gray-50 border-gray-200 pl-4 pr-10 focus:bg-white focus:ring-2 focus:ring-fibem-primary/20 transition-all h-10 text-sm"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-10 w-10 text-gray-400 hover:text-fibem-primary rounded-full hover:bg-transparent"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {/* Right Icons Group */}
              <div className="flex items-center border-l border-gray-200 pl-2 lg:pl-6 ml-2 lg:ml-4 gap-1 sm:gap-2">

                {/* Connexion User */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-600 hover:text-fibem-primary hover:bg-fibem-primary/5 rounded-full transition-all">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    {session ? (
                      <>
                        <DropdownMenuLabel>
                          {session.user?.first_name || 'Mon Compte'}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Tableau de bord
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/profil" className="cursor-pointer flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Mon profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/parametres" className="cursor-pointer flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Paramètres
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer flex items-center gap-2 text-red-600">
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {userTypes.slice(0, 6).map((type) => (
                          <DropdownMenuItem key={type.href} asChild>
                            <Link href={type.href} className="cursor-pointer">{type.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Dashboard Link */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 text-gray-600 hover:text-fibem-primary hover:bg-fibem-primary/5 rounded-full transition-all">
                      <LayoutDashboard className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel>Tableau de bord</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dashboardTypes.slice(0, 6).map((type) => (
                      <DropdownMenuItem key={type.href} asChild>
                        <Link href={type.href} className="cursor-pointer">{type.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-600 hover:text-fibem-primary hover:bg-fibem-primary/5 rounded-full transition-all relative">
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel>Mon Panier</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {panierSubmenu.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="cursor-pointer">{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden h-10 w-10 text-gray-700 hover:bg-gray-100 rounded-full ml-1"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>

              </div>

              {/* Desktop CTA */}
              <div className="hidden sm:block ml-2">
                {!session && (
                  <Button asChild className="rounded-full px-6 bg-fibem-primary hover:bg-fibem-primary/90 shadow-md hover:shadow-lg transition-all">
                    <Link href="/inscription" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden lg:inline font-bold">Inscription</span>
                    </Link>
                  </Button>
                )}
              </div>

            </div>
          </div>

          {/* Mobile Search Bar (Expandable or always visible on very small screens) */}
          <div className="lg:hidden mt-3 pb-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher sur FIBEM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full bg-gray-50 border-gray-200 pl-10 pr-4 focus:bg-white focus:ring-2 focus:ring-fibem-primary/20 transition-all h-10 w-full text-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <nav className="xl:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto absolute w-full top-full left-0 z-40 animate-in slide-in-from-top-2 duration-200">
          <ul className="py-2 divide-y divide-gray-50">
            {menuItems.map((item) => (
              <li key={item.label}>
                <div className="group">
                  <Link
                    href={item.href}
                    className="block px-6 py-3.5 text-gray-800 hover:bg-gray-50 hover:text-fibem-primary font-semibold text-base flex justify-between items-center"
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-fibem-primary transition-colors" />}
                  </Link>
                  {item.submenu && (
                    <ul className="bg-gray-50/50 px-6 pb-3 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href}>
                          {subItem.label.startsWith('──') ? (
                            <div className="px-2 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase">{subItem.label.replace(/─/g, '').trim()}</div>
                          ) : (
                            <Link
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-fibem-primary hover:bg-white rounded-md transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}

            <li className="p-4 bg-gray-50/50">
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" className="w-full bg-white">
                  <Link href="/connexion">Connexion</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/inscription">Inscription</Link>
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
