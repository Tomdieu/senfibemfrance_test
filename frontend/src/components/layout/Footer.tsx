// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import {
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Youtube,
//   Mail,
//   Phone,
//   MapPin,
//   Send
// } from 'lucide-react'
// import { useI18n, useScopedI18n } from '@/locales/client'

// export default function Footer() {
//   const [email, setEmail] = useState('')
//   const [subscribed, setSubscribed] = useState(false)
//   const t = useI18n()
//   const tFooter = useScopedI18n('footer')

//   const footerLinks = {
//     accueil: [
//       { label: tFooter('links.about'), href: '/a-propos' },
//       { label: tFooter('links.whoAreWe'), href: '/qui-sommes-nous' },
//       { label: tFooter('links.blog'), href: '/blog' },
//       { label: tFooter('links.news'), href: '/actualites' },
//     ],
//     services: [
//       { label: tFooter('links.serviceOfferings'), href: '/services/prestations' },
//       { label: tFooter('links.rates'), href: '/services/tarifs' },
//       { label: tFooter('links.quotesInvoices'), href: '/services/devis-factures' },
//       { label: tFooter('links.brochure'), href: '/services/plaquette' },
//     ],
//     emploi: [
//       { label: tFooter('links.candidateSpace'), href: '/emploi/candidat' },
//       { label: tFooter('links.recruiterSpace'), href: '/emploi/recruteur' },
//       { label: tFooter('links.jobOffers'), href: '/emploi/offres' },
//       { label: tFooter('links.subscriptions'), href: '/emploi/abonnements' },
//     ],
//     legal: [
//       { label: tFooter('links.legalNotice'), href: '/mentions-legales' },
//       { label: tFooter('links.termsOfService'), href: '/cgv' },
//       { label: tFooter('links.privacyPolicy'), href: '/confidentialite' },
//       { label: tFooter('links.cookiePolicy'), href: '/cookies' },
//     ],
//   }

//   const socialLinks = [
//     { icon: Facebook, href: 'https://facebook.com/senfibem', label: tFooter('social.facebook') },
//     { icon: Twitter, href: 'https://twitter.com/senfibem', label: tFooter('social.twitter') },
//     { icon: Linkedin, href: 'https://linkedin.com/company/senfibem', label: tFooter('social.linkedin') },
//     { icon: Instagram, href: 'https://instagram.com/senfibem', label: tFooter('social.instagram') },
//     { icon: Youtube, href: 'https://youtube.com/senfibem', label: tFooter('social.youtube') },
//   ]

//   const handleNewsletterSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically send to an API
//     setSubscribed(true)
//     setEmail('')
//   }

//   return (
//     <footer className="bg-fibem-primary text-white">
//       {/* Newsletter section */}
//       <div className="bg-fibem-primary py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div>
//               <h3 className="text-xl font-bold">{tFooter('newsletter.title')}</h3>
//               <p className="text-blue-100">{tFooter('newsletter.subtitle')}</p>
//             </div>
//             <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
//               <input
//                 type="email"
//                 placeholder={tFooter('newsletter.placeholder')}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="px-4 py-2 bg-white rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-fibem-accent"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-fibem-accent text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 <span className="hidden sm:inline">{tFooter('newsletter.button')}</span>
//               </button>
//             </form>
//             {subscribed && (
//               <p className="text-green-300 text-sm">{tFooter('newsletter.success')}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main footer content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
//           {/* Company info */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center gap-3 shrink-0 group">
//               <div className="relative">
//                 <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
//                   <Image src={"/logo.png"} width={100} height={60} alt={t('header.searchOnFibem')} />
//                 </div>
//               </div>
//             </Link>
//             <p className="text-solid-500 mb-4 text-sm">
//               {tFooter('company.subtitle')}
//             </p>

//             {/* Contact France */}
//             <div className="mb-4">
//               <h4 className="font-semibold text-slate-50 mb-2">🇨🇵{tFooter('company.france')}</h4>
//               <div className="space-y-1 text-sm text-solid-500">
//                 <p className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4" />
//                   {tFooter('company.franceAddress')}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" />
//                   {tFooter('company.francePhone')}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   {tFooter('company.franceEmail')}
//                 </p>
//               </div>
//             </div>

//             {/* Contact Sénégal */}
//             <div>
//               <h4 className="font-semibold text-slate-50 mb-2">🇸🇳{tFooter('company.senegal')}</h4>
//               <div className="space-y-1 text-sm text-solid-500">
//                 <p className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4" />
//                   {tFooter('company.senegalAddress')}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" />
//                   {tFooter('company.senegalPhone')}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   {tFooter('company.senegalEmail')}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Accueil links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">{t('common.home')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.accueil.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-solid-500 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">{t('common.services')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.services.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-solid-500 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Emploi links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">{t('common.jobs')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.emploi.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-solid-500 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">{tFooter('links.legal')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-solid-500 hover:text-white transition-colors text-sm"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Social links */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <span className="text-solid-500 text-sm">{tFooter('social.followUs')}</span>
//               <div className="flex items-center gap-3">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-fibem-primary transition-colors"
//                     aria-label={social.label}
//                   >
//                     <social.icon className="w-5 h-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//             <p className="text-solid-500 text-sm text-center md:text-right">
//               {tFooter('copyright', { year: new Date().getFullYear().toString() })}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronRight,
  Globe,
  Shield,
  FileText,
  HelpCircle,
  Home,
  Briefcase
} from 'lucide-react'
import { useI18n, useScopedI18n } from '@/locales/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const t = useI18n()
  const tFooter = useScopedI18n('footer')

  const footerLinks = {
    accueil: [
      { label: tFooter('links.about'), href: '/a-propos' },
      // { label: tFooter('links.whoAreWe'), href: '/qui-sommes-nous' },
      // { label: tFooter('links.blog'), href: '/blog' },
      { label: tFooter('links.news'), href: '/actualites' },
    ],
    services: [
      { label: tFooter('links.serviceOfferings'), href: '/services/prestations' },
      { label: tFooter('links.rates'), href: '/services/tarifs' },
      { label: tFooter('links.quotesInvoices'), href: '/services/devis-factures' },
      { label: tFooter('links.brochure'), href: '/services/plaquette' },
    ],
    emploi: [
      { label: tFooter('links.candidateSpace'), href: '/emploi/candidat' },
      { label: tFooter('links.recruiterSpace'), href: '/emploi/recruteur' },
      { label: tFooter('links.jobOffers'), href: '/emploi/offres' },
      { label: tFooter('links.subscriptions'), href: '/emploi/abonnements' },
    ],
    legal: [
      { label: tFooter('links.legalNotice'), href: '/mentions-legales' },
      { label: tFooter('links.termsOfService'), href: '/cgv' },
      { label: tFooter('links.privacyPolicy'), href: '/confidentialite' },
      { label: tFooter('links.cookiePolicy'), href: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/senfibem', label: tFooter('social.facebook') },
    { icon: Twitter, href: 'https://twitter.com/senfibem', label: tFooter('social.twitter') },
    { icon: Linkedin, href: 'https://linkedin.com/company/senfibem', label: tFooter('social.linkedin') },
    { icon: Instagram, href: 'https://instagram.com/senfibem', label: tFooter('social.instagram') },
    { icon: Youtube, href: 'https://youtube.com/senfibem', label: tFooter('social.youtube') },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to an API
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-fibem-dark text-white">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-fibem-primary via-fibem-secondary to-fibem-accent" />
      
      {/* Newsletter section */}
      <div className="bg-fibem-dark/95 pt-12 pb-0 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-3">
                {tFooter('newsletter.title')}
              </h3>
              <p className="text-gray-300 max-w-md mx-auto lg:mx-0">
                {tFooter('newsletter.subtitle')}
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
                <Input
                  type="email"
                  placeholder={tFooter('newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow bg-white/10 border-gray-700 text-white placeholder:text-gray-400 focus:border-fibem-primary focus:ring-fibem-primary rounded-lg px-4 py-3"
                />
                <Button
                  type="submit"
                  className="bg-fibem-accent hover:bg-fibem-accent/90 text-white font-semibold rounded-lg px-6 py-3 whitespace-nowrap"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {tFooter('newsletter.button')}
                </Button>
              </div>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 right-0 text-center"
                >
                  <p className="text-green-400 text-sm bg-green-900/20 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {tFooter('newsletter.success')}
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company info - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-flex items-start gap-3 group">
                <div className="relative w-auto h-auto bg-white rounded-xl p-2 group-hover:scale-105 transition-transform">
                  <Image 
                    src="/logo.png" 
                    width={300} 
                    height={300} 
                    alt={t('header.searchOnFibem')}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold block">FIBEM</span>
                  <span className="text-sm text-gray-400">{tFooter('company.subtitle')}</span>
                </div>
              </Link>
            </div>

            {/* Contact info grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* France */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇫🇷</span>
                  <h4 className="font-semibold text-lg">{tFooter('company.france')}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 mt-0.5 text-fibem-secondary flex-shrink-0" />
                    {tFooter('company.franceAddress')}
                  </p>
                  <p className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-fibem-secondary flex-shrink-0" />
                    <a href={`tel:${tFooter('company.francePhone').replace(/\s/g, '')}`} 
                       className="hover:text-white transition-colors">
                      {tFooter('company.francePhone')}
                    </a>
                  </p>
                  <p className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-fibem-secondary flex-shrink-0" />
                    <a href={`mailto:${tFooter('company.franceEmail')}`}
                       className="hover:text-white transition-colors break-all">
                      {tFooter('company.franceEmail')}
                    </a>
                  </p>
                </div>
              </div>

              {/* Sénégal */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇸🇳</span>
                  <h4 className="font-semibold text-lg">{tFooter('company.senegal')}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 mt-0.5 text-fibem-secondary flex-shrink-0" />
                    {tFooter('company.senegalAddress')}
                  </p>
                  <p className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-fibem-secondary flex-shrink-0" />
                    <a href={`tel:${tFooter('company.senegalPhone').replace(/\s/g, '')}`}
                       className="hover:text-white transition-colors">
                      {tFooter('company.senegalPhone')}
                    </a>
                  </p>
                  <p className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-fibem-secondary flex-shrink-0" />
                    <a href={`mailto:${tFooter('company.senegalEmail')}`}
                       className="hover:text-white transition-colors break-all">
                      {tFooter('company.senegalEmail')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {[
            { title: t('common.home'), links: footerLinks.accueil, icon: Home },
            { title: t('common.services'), links: footerLinks.services, icon: FileText },
            { title: t('common.jobs'), links: footerLinks.emploi, icon: Briefcase },
            { title: tFooter('links.legal'), links: footerLinks.legal, icon: Shield },
          ].map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {column.icon && <column.icon className="w-4 h-4 text-fibem-primary" />}
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-fibem-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social links */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-gray-400 text-sm whitespace-nowrap">
                {tFooter('social.followUs')}
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-fibem-primary rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link 
                href="/aide" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
                {tFooter('help')}
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                {tFooter('sitemap')}
              </Link>
              <Link 
                href="/accessibilite" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                {tFooter('accessibility')}
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-right">
              © {new Date().getFullYear()} FIBEM. {tFooter('copyright', { year: new Date().getFullYear().toString() })}
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-gray-800/50">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              {tFooter('securePayment')}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {tFooter('guaranteedService')}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {tFooter('customerSatisfaction')}
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {tFooter('backToTop')}
          </button>
        </div>
      </div>
    </footer>
  )
}