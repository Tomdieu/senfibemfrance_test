'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Mail, Lock, Eye, EyeOff, User, Building, Users, Briefcase, GraduationCap, Shield } from 'lucide-react'
import { useI18n, useScopedI18n } from '@/locales/client'
import Image from 'next/image'

type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur'

export default function ConnexionPage() {
  const t = useI18n()
  const theader = useScopedI18n('header')
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<UserType>('particulier')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(t('auth.connexion.emailOrPasswordIncorrect'))
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(t('auth.connexion.errorOccurred'))
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <div className='flex items-center justify-center'>
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={"/logo.png"} width={100} height={60} alt={theader('searchOnFibem')} />
                </div>
              </div>

            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t('auth.connexion.title')}</h2>
          <p className="text-gray-600 mt-2">{t('auth.connexion.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('auth.connexion.selectProfile')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id: 'particulier' as UserType, label: t('auth.userType.particulier'), icon: User, description: t('auth.connexion.particulier.description') },
                { id: 'candidat' as UserType, label: t('auth.userType.candidat'), icon: Users, description: t('auth.connexion.candidat.description') },
                { id: 'partenaire' as UserType, label: t('auth.userType.partenaire'), icon: Building, description: t('auth.connexion.partenaire.description') },
                { id: 'administrateur' as UserType, label: t('auth.userType.administrateur'), icon: Shield, description: t('auth.connexion.administrateur.description') },
              ]).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${selectedType === type.id
                    ? 'border-fibem-primary bg-fibem-light'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-400'
                    }`} />
                  <p className={`font-medium text-sm ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-700'
                    }`}>
                    {type.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.connexion.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.connexion.emailPlaceholder')}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.connexion.passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.connexion.passwordPlaceholder')}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary focus:border-transparent disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary disabled:opacity-50"
                />
                <span className="text-sm text-gray-600">{t('auth.connexion.rememberMe')}</span>
              </label>
              <Link href="/mot-de-passe-oublie" className="text-sm text-fibem-primary hover:underline">
                {t('auth.connexion.forgotPassword')}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? t('auth.connexion.signingIn') : t('auth.connexion.signInButton')}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">{t('common.or')}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="space-y-3">
            <button type="button" className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors" disabled={isLoading}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-gray-700">{t('auth.connexion.continueWithGoogle')}</span>
            </button>

            <button type="button" className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors" disabled={isLoading}>
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-gray-700">{t('auth.connexion.continueWithFacebook')}</span>
            </button>

            <button type="button" className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors" disabled={isLoading}>
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-gray-700">{t('auth.connexion.continueWithLinkedIn')}</span>
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-gray-600 mt-6">
            {t('auth.connexion.noAccount')}{' '}
            <Link href="/inscription" className="text-fibem-primary font-semibold hover:underline">
              {t('auth.connexion.createAccount')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}