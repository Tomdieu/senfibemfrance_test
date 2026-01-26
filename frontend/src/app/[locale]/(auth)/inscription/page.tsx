'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, Building, Users, Phone, Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { createAccount } from '@/actions/auth'
import { useI18n } from '@/locales/client'

type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR'

export default function InscriptionPage() {
  const t = useI18n()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form fields - only what's in Register interface
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!selectedType) {
        throw new Error(t('auth.inscription.pleaseSelectAccountType'))
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error(t('auth.inscription.passwordMismatch'))
      }

      const registrationData: Register = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: selectedType,
      }

      await createAccount(registrationData)

      // Redirect to login on success
      router.push('/connexion')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const canProceedStep1 = selectedType !== null
  const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
  const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-fibem-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <div className="text-left">
              <h1 className="text-fibem-primary font-bold text-xl">{t('common.fibem')}</h1>
              <p className="text-xs text-gray-500">{t('common.france')}</p>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">{t('auth.inscription.title')}</h2>
          <p className="text-gray-600 mt-2">{t('auth.inscription.subtitle')}</p>
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
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Step 1: Choose account type */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step1.title')}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {([
                    { id: 'PARTICULIER' as UserType, label: t('auth.userType.particulier'), icon: User, description: t('auth.inscription.step1.particulier.description') },
                    { id: 'CANDIDAT' as UserType, label: t('auth.userType.candidat'), icon: Users, description: t('auth.inscription.step1.candidat.description') },
                    { id: 'PROFESSIONNEL' as UserType, label: t('auth.userType.professionnel'), icon: Building, description: t('auth.inscription.step1.professionnel.description') },
                    { id: 'RECRUTEUR' as UserType, label: t('auth.userType.recruteur'), icon: Shield, description: t('auth.inscription.step1.recruteur.description') },
                  ]).map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
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

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('common.continue')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal information */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step2.title')}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.firstName')} *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      placeholder={t('auth.inscription.step2.firstNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.lastName')} *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                      placeholder={t('auth.inscription.step2.lastNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.email')} *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        placeholder={t('auth.inscription.step2.emailPlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.phone')} *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        placeholder={t('auth.inscription.step2.phonePlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('common.back')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('common.continue')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password and confirmation */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step3.title')}</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.password')} *</label>
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
                        placeholder={t('auth.inscription.step3.passwordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t('auth.inscription.step3.passwordMinLength')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.confirmPassword')} *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
                        placeholder={t('auth.inscription.step3.confirmPasswordPlaceholder')}
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
                      <p className="text-xs text-red-500 mt-1">{t('auth.inscription.passwordMismatch')}</p>
                    )}
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary"
                      />
                      <span className="text-sm text-gray-600">
                        {t('auth.inscription.step3.termsAgreement', {
                          terms: (
                            <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline">
                              {t('auth.inscription.step3.terms')}
                            </Link>
                          ),
                          privacy: (
                            <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline">
                              {t('auth.inscription.step3.privacy')}
                            </Link>
                          )
                        })}
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
                    {t('common.back')}
                  </button>
                  <button
                    type="submit"
                    disabled={!canProceedStep3 || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t('auth.inscription.step3.creatingAccount') : t('auth.inscription.step3.createAccount')}
                    {!loading && <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6 pt-6 border-t">
            {t('auth.inscription.alreadyHaveAccount')}{' '}
            <Link href="/connexion" className="text-fibem-primary font-semibold hover:underline">
              {t('auth.inscription.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}