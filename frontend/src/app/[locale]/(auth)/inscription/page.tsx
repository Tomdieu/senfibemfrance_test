'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  Users, 
  Shield, 
  Phone,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Key,
  Smartphone,
  Globe,
  Star
} from 'lucide-react'
import { createAccount } from '@/actions/auth'
import { useI18n, useScopedI18n } from '@/locales/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR'

export default function InscriptionPage() {
  const t = useI18n()
  const tAuth = useScopedI18n('auth.inscription')
  const tCommon = useScopedI18n('common')
  const tHeader = useScopedI18n('header')
  const tUserType = useScopedI18n('auth.userType')

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form fields
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
        throw new Error(tAuth('pleaseSelectAccountType'))
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error(tAuth('passwordMismatch'))
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

  const features = [
    { 
      icon: Key, 
      text: t('home.howItWorks.step4Desc'), 
      color: 'text-fibem-secondary' 
    },
    { 
      icon: Smartphone, 
      text: t('home.hero.cta4Description'), 
      color: 'text-white' 
    },
    { 
      icon: Globe, 
      text: t('home.partners.trust'), 
      color: 'text-fibem-secondary' 
    },
    { 
      icon: Star, 
      text: t('home.testimonials.subtitle'), 
      color: 'text-white' 
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-fibem-dark via-fibem-primary/20 to-fibem-secondary/10 py-8 md:py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #379DE0 1px, transparent 1px),
                             linear-gradient(to bottom, #379DE0 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 lg:grid-cols-[2fr,1fr]">
              {/* Left column - Welcome section */}
              <div className="bg-gradient-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
                
                {/* Logo */}
                <div className="relative z-10 mb-8">
                  <Link href="/" className="inline-flex items-center gap-3 group">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      className="w-auto h-auto bg-white/100 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 border border-white/20 group-hover:border-white/40 transition-all"
                    >
                      <Image 
                        src="/logo.png" 
                        width={96} 
                        height={96} 
                        alt={tHeader('searchOnFibem')}
                        className="object-contain"
                      />
                    </motion.div>
                    <div>
                      <span className="text-2xl font-bold block">FIBEM</span>
                      <span className="text-white/70 text-sm">{t('home.hero.subtitle')}</span>
                    </div>
                  </Link>
                </div>

                {/* Welcome content */}
                <div className="relative z-10 space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                      {tAuth('title')}
                    </h1>
                    <p className="text-lg text-white/80">
                      {tAuth('subtitle')}
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                          <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Progress steps */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <div className="flex items-center justify-center gap-4 mb-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${step >= s ? 'bg-white text-fibem-primary' : 'bg-white/20 text-white/70'
                            }`}>
                            {step > s ? <Check className="w-6 h-6" /> : s}
                          </div>
                          {s < 3 && (
                            <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-white' : 'bg-white/30'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-white/70 text-sm">
                      {step === 1 && tAuth('step1.title')}
                      {step === 2 && tAuth('step2.title')}
                      {step === 3 && tAuth('step3.title')}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right column - Registration form */}
              <div className="p-8 md:p-12 w-full">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-fibem-textPrimary mb-2">
                    {tCommon('createAccount')}
                  </h2>
                  <p className="text-fibem-textSecondary">
                    {tAuth('subtitle')}
                  </p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Choose account type */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {([
                          { id: 'PARTICULIER' as UserType, label: tUserType('particulier'), icon: User, description: tAuth('step1.particulier.description') },
                          { id: 'CANDIDAT' as UserType, label: tUserType('candidat'), icon: Users, description: tAuth('step1.candidat.description') },
                          { id: 'PROFESSIONNEL' as UserType, label: tUserType('professionnel'), icon: Building, description: tAuth('step1.professionnel.description') },
                          { id: 'RECRUTEUR' as UserType, label: tUserType('recruteur'), icon: Shield, description: tAuth('step1.recruteur.description') },
                        ]).map((type) => (
                          <motion.button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${selectedType === type.id
                              ? 'border-fibem-primary bg-fibem-primary/5 shadow-md'
                              : 'border-fibem-border hover:border-fibem-primary/50 hover:bg-fibem-surface'
                              }`}
                          >
                            <type.icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-textSecondary'
                              }`} />
                            <p className={`font-semibold ${selectedType === type.id ? 'text-fibem-primary' : 'text-fibem-textPrimary'
                              }`}>
                              {type.label}
                            </p>
                            <p className="text-sm text-fibem-textSecondary mt-1">{type.description}</p>
                          </motion.button>
                        ))}
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!canProceedStep1}
                          className="w-full py-3.5 bg-fibem-primary hover:bg-fibem-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {tCommon('continue')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Step 2: Personal information */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                            {tAuth('step2.firstName')} *
                          </label>
                          <Input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step2.firstNamePlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                            {tAuth('step2.lastName')} *
                          </label>
                          <Input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                            className="border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step2.lastNamePlaceholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                          {tAuth('step2.email')} *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step2.emailPlaceholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                          {tAuth('step2.phone')} *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="pl-10 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step2.phonePlaceholder')}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {tCommon('back')}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={() => setStep(3)}
                            disabled={!canProceedStep2}
                            className="bg-fibem-primary hover:bg-fibem-dark text-white font-semibold shadow-lg hover:shadow-xl"
                          >
                            {tCommon('continue')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Password and confirmation */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                          {tAuth('step3.password')} *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={8}
                            className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step3.passwordPlaceholder')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-fibem-textSecondary mt-2">
                          {tAuth('step3.passwordMinLength')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-fibem-textPrimary mb-2">
                          {tAuth('step3.confirmPassword')} *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="pl-10 pr-12 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                            placeholder={tAuth('step3.confirmPasswordPlaceholder')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500 mt-2">{tAuth('passwordMismatch')}</p>
                        )}
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={true}
                            readOnly
                            className="w-5 h-5 mt-0.5 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20"
                          />
                          <span className="text-sm text-fibem-textSecondary">
                            {tAuth('step3.termsAgreement', {
                              terms: (
                                <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline">
                                  {tAuth('step3.terms')}
                                </Link>
                              ),
                              privacy: (
                                <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline">
                                  {tAuth('step3.privacy')}
                                </Link>
                              )
                            })}
                          </span>
                        </label>
                      </div>

                      <div className="flex justify-between pt-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            variant="outline"
                            className="border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {tCommon('back')}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={!canProceedStep3 || loading}
                            className="bg-fibem-primary hover:bg-fibem-dark text-white font-semibold shadow-lg hover:shadow-xl"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {tAuth('step3.creatingAccount')}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                {tAuth('step3.createAccount')}
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </form>

                {/* Login link */}
                <div className="mt-8 pt-8 border-t border-fibem-border text-center">
                  <p className="text-fibem-textSecondary mb-4">
                    {tAuth('alreadyHaveAccount')}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                      href="/connexion"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface text-fibem-textPrimary font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <span>{tCommon('signIn')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  {/* Additional info */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
                      <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-4 h-4 text-fibem-primary" />
                      </div>
                      <div className="text-xs text-fibem-textSecondary">{t('footer.securePayment')}</div>
                    </div>
                    <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
                      <div className="w-8 h-8 bg-fibem-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check className="w-4 h-4 text-fibem-secondary" />
                      </div>
                      <div className="text-xs text-fibem-textSecondary">{t('footer.customerSatisfaction')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}




// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { Mail, Lock, Eye, EyeOff, User, Building, Users, Phone, Shield, ArrowLeft, ArrowRight, Check } from 'lucide-react'
// import { createAccount } from '@/actions/auth'
// import { useI18n, useScopedI18n } from '@/locales/client'
// import Image from 'next/image'

// type UserType = 'PARTICULIER' | 'CANDIDAT' | 'PROFESSIONNEL' | 'RECRUTEUR'

// export default function InscriptionPage() {
//   const t = useI18n()
//   const theader = useScopedI18n('header')

//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const [selectedType, setSelectedType] = useState<UserType | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   // Form fields - only what's in Register interface
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       if (!selectedType) {
//         throw new Error(t('auth.inscription.pleaseSelectAccountType'))
//       }

//       if (formData.password !== formData.confirmPassword) {
//         throw new Error(t('auth.inscription.passwordMismatch'))
//       }

//       const registrationData: Register = {
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         role: selectedType,
//       }

//       await createAccount(registrationData)

//       // Redirect to login on success
//       router.push('/connexion')
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Une erreur est survenue')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const canProceedStep1 = selectedType !== null
//   const canProceedStep2 = formData.first_name && formData.last_name && formData.email && formData.phone
//   const canProceedStep3 = formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <div className='flex items-center justify-center'>
//             <Link href="/" className="flex items-center gap-3 shrink-0 group">
//               <div className="relative">
//                 <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
//                   <Image src={"/logo.png"} width={100} height={60} alt={theader('searchOnFibem')} />
//                 </div>
//               </div>

//             </Link>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">{t('auth.inscription.title')}</h2>
//           <p className="text-gray-600 mt-2">{t('auth.inscription.subtitle')}</p>
//         </div>

//         {/* Progress steps */}
//         <div className="flex items-center justify-center gap-2 mb-8">
//           {[1, 2, 3].map((s) => (
//             <div key={s} className="flex items-center">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-fibem-primary text-white' : 'bg-gray-200 text-gray-500'
//                 }`}>
//                 {step > s ? <Check className="w-5 h-5" /> : s}
//               </div>
//               {s < 3 && (
//                 <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-fibem-primary' : 'bg-gray-200'}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Error message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             )}

//             {/* Step 1: Choose account type */}
//             {step === 1 && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step1.title')}</h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                   {([
//                     { id: 'PARTICULIER' as UserType, label: t('auth.userType.particulier'), icon: User, description: t('auth.inscription.step1.particulier.description') },
//                     { id: 'CANDIDAT' as UserType, label: t('auth.userType.candidat'), icon: Users, description: t('auth.inscription.step1.candidat.description') },
//                     { id: 'PROFESSIONNEL' as UserType, label: t('auth.userType.professionnel'), icon: Building, description: t('auth.inscription.step1.professionnel.description') },
//                     { id: 'RECRUTEUR' as UserType, label: t('auth.userType.recruteur'), icon: Shield, description: t('auth.inscription.step1.recruteur.description') },
//                   ]).map((type) => (
//                     <button
//                       key={type.id}
//                       type="button"
//                       onClick={() => setSelectedType(type.id)}
//                       className={`p-4 rounded-xl border-2 transition-all text-left ${selectedType === type.id
//                         ? 'border-fibem-primary bg-fibem-light'
//                         : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                     >
//                       <type.icon className={`w-8 h-8 mb-2 ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-400'
//                         }`} />
//                       <p className={`font-semibold ${selectedType === type.id ? 'text-fibem-primary' : 'text-gray-700'
//                         }`}>
//                         {type.label}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">{type.description}</p>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="flex justify-end mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setStep(2)}
//                     disabled={!canProceedStep1}
//                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {t('common.continue')}
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Personal information */}
//             {step === 2 && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step2.title')}</h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.firstName')} *</label>
//                     <input
//                       type="text"
//                       name="first_name"
//                       value={formData.first_name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                       placeholder={t('auth.inscription.step2.firstNamePlaceholder')}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.lastName')} *</label>
//                     <input
//                       type="text"
//                       name="last_name"
//                       value={formData.last_name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                       placeholder={t('auth.inscription.step2.lastNamePlaceholder')}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.email')} *</label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                         placeholder={t('auth.inscription.step2.emailPlaceholder')}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step2.phone')} *</label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                         placeholder={t('auth.inscription.step2.phonePlaceholder')}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setStep(1)}
//                     className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     {t('common.back')}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setStep(3)}
//                     disabled={!canProceedStep2}
//                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {t('common.continue')}
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Password and confirmation */}
//             {step === 3 && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('auth.inscription.step3.title')}</h3>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.password')} *</label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                         minLength={8}
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                         placeholder={t('auth.inscription.step3.passwordPlaceholder')}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{t('auth.inscription.step3.passwordMinLength')}</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.inscription.step3.confirmPassword')} *</label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-secondary"
//                         placeholder={t('auth.inscription.step3.confirmPasswordPlaceholder')}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                       <p className="text-xs text-red-500 mt-1">{t('auth.inscription.passwordMismatch')}</p>
//                     )}
//                   </div>

//                   <div className="pt-4 space-y-3">
//                     <label className="flex items-start gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={true}
//                         readOnly
//                         className="w-5 h-5 mt-0.5 rounded border-gray-300 text-fibem-primary focus:ring-fibem-secondary"
//                       />
//                       <span className="text-sm text-gray-600">
//                         {t('auth.inscription.step3.termsAgreement', {
//                           terms: (
//                             <Link key="terms" href="/cgv" className="text-fibem-primary hover:underline">
//                               {t('auth.inscription.step3.terms')}
//                             </Link>
//                           ),
//                           privacy: (
//                             <Link key="privacy" href="/confidentialite" className="text-fibem-primary hover:underline">
//                               {t('auth.inscription.step3.privacy')}
//                             </Link>
//                           )
//                         })}
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-between mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setStep(2)}
//                     className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     {t('common.back')}
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={!canProceedStep3 || loading}
//                     className="flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? t('auth.inscription.step3.creatingAccount') : t('auth.inscription.step3.createAccount')}
//                     {!loading && <Check className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>

//           {/* Login link */}
//           <p className="text-center text-gray-600 mt-6 pt-6 border-t">
//             {t('auth.inscription.alreadyHaveAccount')}{' '}
//             <Link href="/connexion" className="text-fibem-primary font-semibold hover:underline">
//               {t('auth.inscription.signIn')}
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }