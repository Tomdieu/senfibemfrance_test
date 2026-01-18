'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, User, Building, Users, Phone, MapPin, Briefcase, GraduationCap, Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react'

type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur'
type PartnerSubType = 'freelance' | 'artisan' | 'entreprise'

const userTypes = [
  {
    id: 'particulier' as UserType,
    label: 'Particulier',
    icon: User,
    description: 'Je recherche des services ou un emploi'
  },
  {
    id: 'candidat' as UserType,
    label: 'Candidat',
    icon: Users,
    description: 'Je recherche un emploi ou un stage'
  },
  {
    id: 'partenaire' as UserType,
    label: 'Partenaire',
    icon: Building,
    description: 'Entreprise, Artisan ou Freelance'
  },
  {
    id: 'administrateur' as UserType,
    label: 'Administrateur',
    icon: Shield,
    description: 'Accès réservé aux équipes FIBEM'
  },
]

const partnerSubTypes = [
  {
    id: 'freelance' as PartnerSubType,
    label: 'Freelance',
    description: 'Travailleur indépendant'
  },
  {
    id: 'artisan' as PartnerSubType,
    label: 'Artisan',
    description: 'Entreprise artisanale'
  },
  {
    id: 'entreprise' as PartnerSubType,
    label: 'Entreprise',
    description: 'Société / PME / ETI'
  },
]

export default function InscriptionPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<UserType | null>(null)
  const [partnerSubType, setPartnerSubType] = useState<PartnerSubType | null>(null)

  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    siret: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    acceptTerms: false,
    acceptNewsletter: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic
    console.log({ selectedType, partnerSubType, formData })
  }

  const canProceedStep1 = selectedType !== null && (selectedType !== 'partenaire' || partnerSubType !== null)
  const canProceedStep2 = formData.firstName && formData.lastName && formData.email && formData.phone
  const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.acceptTerms

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-fibem-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <div className="text-left">
              <h1 className="text-fibem-primary font-bold text-xl">SEN FIBEM</h1>
              <p className="text-xs text-gray-500">FRANCE</p>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Créer un compte</h2>
          <p className="text-gray-600 mt-2">Rejoignez notre communauté</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-fibem-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-fibem-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Choose account type */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choisissez votre type de compte</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type.id)
                        if (type.id !== 'partenaire') setPartnerSubType(null)
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedType === type.id
                          ? 'border-fibem-primary bg-fibem-light'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className={`w-8 h-8 mb-2 ${
                        selectedType === type.id ? 'text-fibem-primary' : 'text-gray-400'
                      }`} />
                      <p className={`font-semibold ${
                        selectedType === type.id ? 'text-fibem-primary' : 'text-gray-700'
                      }`}>
                        {type.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>

                {/* Partner sub-type selection */}
                {selectedType === 'partenaire' && (
                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Précisez votre statut :</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {partnerSubTypes.map((subType) => (
                        <button
                          key={subType.id}
                          type="button"
                          onClick={() => setPartnerSubType(subType.id)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            partnerSubType === subType.id
                              ? 'border-fibem-primary bg-fibem-light'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className={`font-medium text-sm ${
                            partnerSubType === subType.id ? 'text-fibem-primary' : 'text-gray-700'
                          }`}>
                            {subType.label}
                          </p>
                          <p className="text-xs text-gray-500">{subType.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal information */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                    </div>
                  </div>
                </div>

                {/* Company info for partners */}
                {selectedType === 'partenaire' && (
                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Informations entreprise</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SIRET</label>
                        <input
                          type="text"
                          name="siret"
                          value={formData.siret}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password and confirmation */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sécurité et validation</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                    )}
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary"
                      />
                      <span className="text-sm text-gray-600">
                        J'accepte les{' '}
                        <Link href="/cgv" className="text-fibem-primary hover:underline">conditions générales</Link>
                        {' '}et la{' '}
                        <Link href="/confidentialite" className="text-fibem-primary hover:underline">politique de confidentialité</Link> *
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptNewsletter"
                        checked={formData.acceptNewsletter}
                        onChange={handleInputChange}
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary"
                      />
                      <span className="text-sm text-gray-600">
                        Je souhaite recevoir les actualités et offres par email
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={!canProceedStep3}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Créer mon compte
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6 pt-6 border-t">
            Déjà un compte ?{' '}
            <Link href="/connexion" className="text-fibem-primary font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
