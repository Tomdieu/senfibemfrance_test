'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-fibem-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-1 space-y-6">
            {/* France */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🇫🇷</span> France
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Adresse</p>
                    <p className="text-gray-600 text-sm">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Téléphone</p>
                    <p className="text-gray-600 text-sm">+33 1 XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm">contact@senfibem.fr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Horaires</p>
                    <p className="text-gray-600 text-sm">Lun - Ven : 9h - 18h<br />Sam : 10h - 14h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sénégal */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🇸🇳</span> Sénégal
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Adresse</p>
                    <p className="text-gray-600 text-sm">Avenue Cheikh Anta Diop<br />Dakar, Sénégal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Téléphone</p>
                    <p className="text-gray-600 text-sm">+221 XX XXX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-fibem-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm">contact@senfibem.sn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Localisation</h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Carte Google Maps</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-fibem-light rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-fibem-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-800">Envoyez-nous un message</h2>
                  <p className="text-gray-500 text-sm">Nous vous répondrons dans les plus brefs délais</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-6">Nous avons bien reçu votre message et vous répondrons rapidement.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' })
                    }}
                    className="px-6 py-2 border border-fibem-primary text-fibem-primary rounded-lg hover:bg-fibem-light transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de demande</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                    >
                      <option value="general">Demande générale</option>
                      <option value="service">Demande de service</option>
                      <option value="emploi">Question emploi</option>
                      <option value="partenariat">Proposition de partenariat</option>
                      <option value="reclamation">Réclamation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sujet *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
