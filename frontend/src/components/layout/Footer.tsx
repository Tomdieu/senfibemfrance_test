'use client'

import { useState } from 'react'
import Link from 'next/link'
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

const footerLinks = {
  accueil: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
    { label: 'Blog', href: '/blog' },
    { label: 'Actualités', href: '/actualites' },
  ],
  services: [
    { label: 'Prestations', href: '/services/prestations' },
    { label: 'Tarifs', href: '/services/tarifs' },
    { label: 'Devis & Factures', href: '/services/devis-factures' },
    { label: 'Plaquette', href: '/services/plaquette' },
  ],
  emploi: [
    { label: 'Espace Candidat', href: '/emploi/candidat' },
    { label: 'Espace Recruteur', href: '/emploi/recruteur' },
    { label: 'Offres d\'emploi', href: '/emploi/offres' },
    { label: 'Abonnements', href: '/emploi/abonnements' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'CGV', href: '/cgv' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/senfibem', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/senfibem', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/senfibem', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/senfibem', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/senfibem', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to an API
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-fibem-primary text-white">
      {/* Newsletter section */}
      {/* <div className="bg-fibem-primary py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Inscrivez-vous à notre newsletter</h3>
              <p className="text-blue-100">Recevez nos dernières offres et actualités</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-fibem-accent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-fibem-accent text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">S'inscrire</span>
              </button>
            </form>
            {subscribed && (
              <p className="text-green-300 text-sm">Merci pour votre inscription !</p>
            )}
          </div>
        </div>
      </div> */}

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-fibem-primary font-bold text-lg">FB</span>
              </div>
              <div>
                <h2 className="font-bold text-xl">SEN FIBEM</h2>
                <p className="text-sm text-solid-500">FRANCE</p>
              </div>
            </div>
            <p className="text-solid-500 mb-4 text-sm">
              Plateforme de mise en relation professionnelle, recrutement et services aux entreprises en France et au Sénégal.
            </p>

            {/* Contact France */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-50 mb-2">🇨🇵France</h4>
              <div className="space-y-1 text-sm text-solid-500">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Paris, France
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +33 1 XX XX XX XX
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@senfibem.fr
                </p>
              </div>
            </div>

            {/* Contact Sénégal */}
            <div>
              <h4 className="font-semibold text-slate-50 mb-2">🇸🇳Sénégal</h4>
              <div className="space-y-1 text-sm text-solid-500">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dakar, Sénégal
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +221 XX XXX XX XX
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@senfibem.sn
                </p>
              </div>
            </div>
          </div>

          {/* Accueil links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Accueil</h3>
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
            <h3 className="font-semibold text-lg mb-4">Services</h3>
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
            <h3 className="font-semibold text-lg mb-4">Emploi</h3>
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
            <h3 className="font-semibold text-lg mb-4">Informations</h3>
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
              <span className="text-solid-500 text-sm">Suivez-nous :</span>
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
              © {new Date().getFullYear()} SEN FIBEM FRANCE. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
