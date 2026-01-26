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
  Send
} from 'lucide-react'
import { useI18n, useScopedI18n } from '@/locales/client'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const t = useI18n()
  const tFooter = useScopedI18n('footer')

  const footerLinks = {
    accueil: [
      { label: tFooter('links.about'), href: '/a-propos' },
      { label: tFooter('links.whoAreWe'), href: '/qui-sommes-nous' },
      { label: tFooter('links.blog'), href: '/blog' },
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
  }

  return (
    <footer className="bg-fibem-primary text-white">
      {/* Newsletter section */}
      <div className="bg-fibem-primary py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">{tFooter('newsletter.title')}</h3>
              <p className="text-blue-100">{tFooter('newsletter.subtitle')}</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={tFooter('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 bg-white rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-fibem-accent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-fibem-accent text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{tFooter('newsletter.button')}</span>
              </button>
            </form>
            {subscribed && (
              <p className="text-green-300 text-sm">{tFooter('newsletter.success')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={"/logo.png"} width={100} height={60} alt={t('header.searchOnFibem')} />
                </div>
              </div>
            </Link>
            <p className="text-solid-500 mb-4 text-sm">
              {tFooter('company.subtitle')}
            </p>

            {/* Contact France */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-50 mb-2">🇨🇵{tFooter('company.france')}</h4>
              <div className="space-y-1 text-sm text-solid-500">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {tFooter('company.franceAddress')}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {tFooter('company.francePhone')}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {tFooter('company.franceEmail')}
                </p>
              </div>
            </div>

            {/* Contact Sénégal */}
            <div>
              <h4 className="font-semibold text-slate-50 mb-2">🇸🇳{tFooter('company.senegal')}</h4>
              <div className="space-y-1 text-sm text-solid-500">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {tFooter('company.senegalAddress')}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {tFooter('company.senegalPhone')}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {tFooter('company.senegalEmail')}
                </p>
              </div>
            </div>
          </div>

          {/* Accueil links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('common.home')}</h3>
            <ul className="space-y-2">
              {footerLinks.accueil.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-solid-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('common.services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-solid-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emploi links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('common.jobs')}</h3>
            <ul className="space-y-2">
              {footerLinks.emploi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-solid-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{tFooter('links.legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-solid-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-solid-500 text-sm">{tFooter('social.followUs')}</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-fibem-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <p className="text-solid-500 text-sm text-center md:text-right">
              {tFooter('copyright', { year: new Date().getFullYear().toString() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
