'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useChangeLocale, useCurrentLocale, useI18n, useScopedI18n } from '@/locales/client'
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
import { useSearchStore } from '@/stores/searchStore'

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
    label: 'home',
    href: '/',
  },
  {
    label: 'about',
    href: '/a-propos',
  },
  {
    label: 'news',
    href: '/actualites',
  },
  {
    label: 'services',
    href: '/services',
    submenu: [
      { label: 'serviceOfferings', href: '/services/prestations' },
      { label: 'rates', href: '/services/tarifs' },
      { label: 'brochure', href: '/services/plaquette' },
      { label: 'cvForm', href: '/services/formulaire-cv' },
      { label: 'timesheet', href: '/services/feuille-heures' },
      { label: 'candidateSheet', href: '/services/fiche-candidat' },
      { label: 'establishmentSheet', href: '/services/fiche-etablissement' },
      { label: 'quoteTemplate', href: '/services/modele-devis' },
      { label: 'invoiceTemplate', href: '/services/modele-facture' },
      { label: 'creditNoteTemplate', href: '/services/modele-avoir' },
      { label: 'otherSites', href: '/services/autres-sites' },
    ]
  },
  {
    label: 'jobs',
    href: '/emploi',
    submenu: [
      { label: 'candidateSpace', href: '/emploi/candidat' },
      { label: 'recruiterSpace', href: '/emploi/recruteur' },
      { label: 'internSpace', href: '/emploi/stagiaire' },
      { label: 'subscriptions', href: '/emploi/abonnements' },
      { label: 'internSubscription', href: '/emploi/abonnements/stagiaire' },
      { label: 'candidateSubscription', href: '/emploi/abonnements/candidat' },
      { label: 'individualSubscription', href: '/emploi/abonnements/particuliers' },
      { label: 'freelancerSubscription', href: '/emploi/abonnements/freelance' },
      { label: 'professionalSubscription', href: '/emploi/abonnements/professionnels' },
      { label: 'partnerSubscription', href: '/emploi/abonnements/partenaires' },
    ]
  },
  {
    label: 'contact',
    href: '/contact',
  },
]

// Connexion/Inscription user types
const userTypes = [
  { label: 'userType.stagiaire', href: '/connexion?type=stagiaire' },
  { label: 'userType.candidat', href: '/connexion?type=candidat' },
  { label: 'userType.particuliers', href: '/connexion?type=particuliers' },
  { label: 'userType.freelance', href: '/connexion?type=freelance' },
  { label: 'userType.professionnels', href: '/connexion?type=professionnels' },
  { label: 'userType.partenaires', href: '/connexion?type=partenaires' },
  { label: 'userType.administrateur', href: '#' },
  { label: 'userType.adminRedacteur', href: '/connexion?type=admin-redacteur' },
  { label: 'userType.adminCommercial', href: '/connexion?type=admin-commercial' },
  { label: 'userType.adminDeveloppeur', href: '/connexion?type=admin-developpeur' },
  { label: 'userType.adminChefProjet', href: '/connexion?type=admin-chef-projet' },
  { label: 'userType.adminDirigeant', href: '/connexion?type=admin-dirigeant' },
]

// Dashboard user types
const dashboardTypes = [
  { label: 'dashboard', href: '/dashboard' },
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
  { label: 'cart', href: '/panier' },
  { label: 'paymentSpace', href: '/panier/paiement' },
  { label: 'delivery', href: '/panier/livraison' },
  { label: 'orderHistory', href: '/panier/historique' },
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
  const router = useRouter()
  const { setOpen } = useSearchStore()
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()
  const t = useScopedI18n('header')
  const tAuth = useScopedI18n('auth')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
                href={`tel:${t('utilityBar.phone').replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('utilityBar.phone')}</span>
              </a>
              <a
                href={`mailto:${t('utilityBar.email')}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t('utilityBar.email')}</span>
              </a>
            </div>
            {/* Mobile simplified tagline */}
            <div className="md:hidden flex items-center gap-2">
              <span className="w-2 h-2 bg-fibem-primary rounded-full animate-pulse"></span>
              <span className="text-white">{t('utilityBar.tagline')}</span>
            </div>
          </div>

          {/* Right Side: Language & Extras */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-slate-400">
              {t('utilityBar.description')}
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
                  <span className="text-sm shadow-sm rounded-sm overflow-hidden">{languages.find(lang => lang.code === currentLocale)?.flag}</span>
                  <span className="hidden sm:inline font-normal">{languages.find(lang => lang.code === currentLocale)?.name}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-37.5">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLocale(lang.code as any)}
                    className={cn(
                      "cursor-pointer",
                      currentLocale === lang.code && "bg-slate-100 font-medium"
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
                <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={"/logo.png"} width={100} height={60} alt={t('searchOnFibem')} />
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
                          <NavigationMenuTrigger
                            className="text-gray-700 hover:text-fibem-primary font-medium bg-transparent hover:bg-gray-50/80 data-[state=open]:bg-gray-50/80 focus:bg-gray-50/80 transition-all rounded-md px-3 py-2 h-auto text-[15px]"
                            onClick={() => router.push(item.href)}
                          >
                            {t(`menu.${item.label}` as any)}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-xl border-none">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.href} className={subItem.label.startsWith('subscriptions') ? 'col-span-2' : ''}>
                                  {subItem.label.startsWith('subscriptions') ? (
                                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
                                      {t(`menu.${subItem.label}` as any)}
                                    </div>
                                  ) : (
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={subItem.href}
                                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-fibem-primary focus:bg-slate-50 focus:text-fibem-primary group"
                                      >
                                        <div className="text-sm font-medium leading-none group-hover:translate-x-1 transition-transform">{t(`menu.${subItem.label}` as any)}</div>
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
                            {t(`menu.${item.label}` as any)}
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

              {/* Search Icon Button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(true)}
                className="h-9 w-9 text-gray-600 hover:text-fibem-primary hover:bg-fibem-primary/5 rounded-full transition-all"
              >
                <Search className="w-5 h-5" />
              </Button>

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
                          {session.user?.first_name || t('account')}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            {t('dashboard')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/profil" className="cursor-pointer flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {t('profile')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/parametres" className="cursor-pointer flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            {t('settings')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer flex items-center gap-2 text-red-600">
                          <LogOut className="w-4 h-4" />
                          {t('logout')}
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuLabel>{t('account')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {userTypes.map((type) => (
                          <DropdownMenuItem key={type.href} asChild>
                            <Link href={type.href} className="cursor-pointer">{tAuth(type.label as any)}</Link>
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
                    <DropdownMenuLabel>{t('dashboard')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">{t('dashboard')}</Link>
                    </DropdownMenuItem>
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
                    <DropdownMenuLabel>{t('cart')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/panier" className="cursor-pointer">{t('cart')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/panier/paiement" className="cursor-pointer">{t('paymentSpace')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/panier/livraison" className="cursor-pointer">{t('delivery')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/panier/historique" className="cursor-pointer">{t('orderHistory')}</Link>
                    </DropdownMenuItem>
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
                      <span className="hidden lg:inline font-bold">{t('signup')}</span>
                    </Link>
                  </Button>
                )}
              </div>

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
                    {t(`menu.${item.label}` as any)}
                    {item.submenu && <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-fibem-primary transition-colors" />}
                  </Link>
                  {item.submenu && (
                    <ul className="bg-gray-50/50 px-6 pb-3 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href}>
                          {subItem.label.startsWith('subscriptions') ? (
                            <div className="px-2 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase">{t(`menu.${subItem.label}` as any)}</div>
                          ) : (
                            <Link
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-fibem-primary hover:bg-white rounded-md transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {t(`menu.${subItem.label}` as any)}
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
                  <Link href="/connexion">{t('login')}</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/inscription">{t('signup')}</Link>
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
