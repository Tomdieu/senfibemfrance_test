// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import Link from 'next/link'
// // import { signIn } from 'next-auth/react'
// // import { Mail, Lock, Eye, EyeOff, User, Building, Users, Briefcase, GraduationCap, Shield, ArrowRight, Check } from 'lucide-react'
// // import { useI18n, useScopedI18n } from '@/locales/client'
// // import Image from 'next/image'

// // type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur'

// // export default function ConnexionPage() {
// //   const t = useI18n()
// //   const theader = useScopedI18n('header')
// //   const router = useRouter()
// //   const [selectedType, setSelectedType] = useState<UserType>('particulier')
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [rememberMe, setRememberMe] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [isLoading, setIsLoading] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError(null)
// //     setIsLoading(true)

// //     try {
// //       const result = await signIn('credentials', {
// //         email,
// //         password,
// //         redirect: false,
// //       })

// //       if (result?.error) {
// //         setError(t('auth.connexion.emailOrPasswordIncorrect'))
// //       } else if (result?.ok) {
// //         router.push('/dashboard')
// //       }
// //     } catch (err) {
// //       setError(t('auth.connexion.errorOccurred'))
// //       console.error('Login error:', err)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const userTypes = [
// //     { 
// //       id: 'particulier' as UserType, 
// //       label: t('auth.userType.particulier'), 
// //       icon: User, 
// //       description: t('auth.connexion.particulier.description'),
// //       color: 'fibem-primary'
// //     },
// //     { 
// //       id: 'candidat' as UserType, 
// //       label: t('auth.userType.candidat'), 
// //       icon: Users, 
// //       description: t('auth.connexion.candidat.description'),
// //       color: 'fibem-secondary'
// //     },
// //     { 
// //       id: 'partenaire' as UserType, 
// //       label: t('auth.userType.partenaire'), 
// //       icon: Building, 
// //       description: t('auth.connexion.partenaire.description'),
// //       color: 'fibem-primary'
// //     },
// //     { 
// //       id: 'administrateur' as UserType, 
// //       label: t('auth.userType.administrateur'), 
// //       icon: Shield, 
// //       description: t('auth.connexion.administrateur.description'),
// //       color: 'fibem-accent'
// //     },
// //   ]

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-fibem-background via-fibem-surface to-white relative overflow-hidden">
// //       {/* Animated background elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-20 left-10 w-72 h-72 bg-fibem-primary/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
// //         <div className="absolute top-40 right-10 w-96 h-96 bg-fibem-secondary/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
// //         <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-fibem-accent/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
// //       </div>

// //       {/* Header avec logo */}
// //       {/* <div className="pt-8 pb-4 px-4 relative z-10">
// //         <div className="max-w-6xl mx-auto">
// //           <Link href="/" className="inline-flex items-center gap-3 group">
// //             <div className="relative">
// //               <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
// //                 <Image 
// //                   src="/logo.png" 
// //                   width={48} 
// //                   height={48} 
// //                   alt={theader('searchOnFibem')}
// //                   className="object-contain"
// //                   priority
// //                 />
// //               </div> */}
// //               {/* Glow effect */}
// //               {/* <div className="absolute inset-0 bg-fibem-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
// //             </div>
// //             <div className="hidden lg:block">
// //               <span className="text-xl font-bold text-fibem-textPrimary group-hover:text-fibem-primary transition-colors duration-300">FIBEM</span>
// //               <div className="h-1 w-8 bg-fibem-primary rounded-full mt-1 group-hover:w-12 transition-all duration-300"></div>
// //             </div>
// //           </Link>
// //         </div>
// //       </div> */}

// //       <div className="max-w-6xl mx-auto px-0 p-0 rounded-2xl relative z-10 bg-fibem-primary">
// //         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ">
          
// //           {/* Section gauche - Contenu */}
// //           <div className="px-5 text-center lg:text-left space-y-6 animate-fade-in-left ">
// //                 {/* Logo */}
// //                   <div className="pt-8 pb-0 px-4 relative z-10">
// //         <div className="max-w-6xl mx-auto">
// //           <Link href="/" className="inline-flex items-center gap-3 group">
// //             <div className="relative">
// //               <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
// //                 <Image 
// //                   src="/logo.png" 
// //                   width={48} 
// //                   height={48} 
// //                   alt={theader('searchOnFibem')}
// //                   className="object-contain"
// //                   priority
// //                 />
// //               </div>
// //               {/* Glow effect */}
// //               <div className="absolute inset-0 bg-fibem-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
// //             </div>
// //             <div className="hidden lg:block">
// //               <span className="text-xl font-bold text-fibem-textPrimary group-hover:text-fibem-primary transition-colors duration-300">FIBEM</span>
// //               <div className="h-1 w-8 bg-fibem-primary rounded-full mt-1 group-hover:w-12 transition-all duration-300"></div>
// //             </div>
// //           </Link>
// //         </div>
// //       </div>
// //             <div className="space-y-4">
// //               <h1 className="text-4xl lg:text-5xl font-bold text-fibem-textPrimary leading-tight bg-clip-text text-transparent bg-gradient-to-r from-fibem-textPrimary to-fibem-primary">
// //                 {t('auth.connexion.title')}
// //               </h1>
// //               <p className="text-lg lg:text-xl text-fibem-textSecondary leading-relaxed">
// //                 Accès à votre espace personnel, services adaptés à votre profil et support dédié 7j/7.
// //               </p>
// //             </div>

// //             {/* Features list */}
// //             <div className="space-y-4 pt-4">
// //               <div className="flex items-center gap-3 group">
// //                 <div className="w-10 h-10 bg-fibem-primary/10 rounded-full flex items-center justify-center group-hover:bg-fibem-primary/20 group-hover:scale-110 transition-all duration-300 relative">
// //                   <Check className="w-5 h-5 text-fibem-primary group-hover:scale-110 transition-transform duration-300" />
// //                   <div className="absolute inset-0 bg-fibem-primary rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
// //                 </div>
// //                 <span className="text-fibem-textSecondary group-hover:text-fibem-textPrimary transition-colors duration-300">
// //                   Accès à votre espace personnel
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3 group">
// //                 <div className="w-10 h-10 bg-fibem-secondary/10 rounded-full flex items-center justify-center group-hover:bg-fibem-secondary/20 group-hover:scale-110 transition-all duration-300 relative">
// //                   <Check className="w-5 h-5 text-fibem-secondary group-hover:scale-110 transition-transform duration-300" />
// //                   <div className="absolute inset-0 bg-fibem-secondary rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
// //                 </div>
// //                 <span className="text-fibem-textSecondary group-hover:text-fibem-textPrimary transition-colors duration-300">
// //                   Services adaptés à votre profil
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3 group">
// //                 <div className="w-10 h-10 bg-fibem-accent/10 rounded-full flex items-center justify-center group-hover:bg-fibem-accent/20 group-hover:scale-110 transition-all duration-300 relative">
// //                   <Check className="w-5 h-5 text-fibem-accent group-hover:scale-110 transition-transform duration-300" />
// //                   <div className="absolute inset-0 bg-fibem-accent rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
// //                 </div>
// //                 <span className="text-fibem-textSecondary group-hover:text-fibem-textPrimary transition-colors duration-300">
// //                   Support dédié 7j/7
// //                 </span>
// //               </div>
// //             </div>

// //             {/* CTA secondaire */}
// //             <div className="pt-6">
// //               <p className="text-fibem-textSecondary mb-4">
// //                 Pas encore de compte ?
// //               </p>
// //               <Link 
// //                 href="/inscription"
// //                 className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-surface border border-fibem-border rounded-lg text-fibem-textPrimary font-medium hover:bg-fibem-primary hover:text-white hover:border-fibem-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
// //               >
// //                 <span className="relative z-10">{t('auth.connexion.createAccount')}</span>
// //                 <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
// //                 <div className="absolute inset-0 bg-gradient-to-r from-fibem-primary to-fibem-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// //                 {/* Shimmer effect */}
// //                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
// //               </Link>
// //             </div>
// //           </div>

// //           {/* Section droite - Formulaire */}
// //           <div className="bg-white rounded-2xl shadow-xl border border-fibem-border p-6 lg:p-8 animate-fade-in-right relative overflow-hidden">
// //             {/* Background pattern */}
// //             <div className="absolute inset-0 opacity-5">
// //               <div className="absolute inset-0" style={{
// //                 backgroundImage: `radial-gradient(circle at 1px 1px, fibem-textPrimary 1px, transparent 1px)`,
// //                 backgroundSize: '20px 20px'
// //               }}></div>
// //             </div>
            
// //             {/* User Type Selection */}
// //             <div className="mb-8">
// //               <label className="block text-sm font-semibold text-fibem-textPrimary mb-4">
// //                 {t('auth.connexion.selectProfile')}
// //               </label>
// //               <div className="grid grid-cols-2 gap-3">
// //                 {userTypes.map((type) => (
// //                   <button
// //                     key={type.id}
// //                     type="button"
// //                     onClick={() => setSelectedType(type.id)}
// //                     className={`p-4 rounded-xl border-2 transition-all duration-200 text-left relative overflow-hidden group ${
// //                       selectedType === type.id
// //                         ? 'border-fibem-primary bg-fibem-primary/5 shadow-md'
// //                         : 'border-fibem-border hover:border-fibem-primary/50 hover:bg-fibem-surface'
// //                     }`}
// //                   >
// //                     {/* Badge de sélection */}
// //                     {selectedType === type.id && (
// //                       <div className="absolute top-2 right-2">
// //                         <div className="w-5 h-5 bg-fibem-primary rounded-full flex items-center justify-center">
// //                           <Check className="w-3 h-3 text-white" />
// //                         </div>
// //                       </div>
// //                     )}
                    
// //                     <type.icon className={`w-6 h-6 mb-3 transition-colors ${
// //                       selectedType === type.id 
// //                         ? `text-${type.color}` 
// //                         : 'text-fibem-muted group-hover:text-fibem-textSecondary'
// //                     }`} />
                    
// //                     <p className={`font-semibold text-sm mb-1 transition-colors ${
// //                       selectedType === type.id 
// //                         ? 'text-fibem-textPrimary' 
// //                         : 'text-fibem-textSecondary group-hover:text-fibem-textPrimary'
// //                     }`}>
// //                       {type.label}
// //                     </p>
// //                     <p className="text-xs text-fibem-muted leading-relaxed">
// //                       {type.description}
// //                     </p>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Error Message */}
// //             {error && (
// //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// //                 <p className="text-red-700 text-sm font-medium">{error}</p>
// //               </div>
// //             )}

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* Email */}
// //               <div>
// //                 <label htmlFor="email" className="block text-sm font-semibold text-fibem-textPrimary mb-2">
// //                   {t('auth.connexion.emailLabel')}
// //                 </label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                   <input
// //                     type="email"
// //                     id="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder={t('auth.connexion.emailPlaceholder')}
// //                     required
// //                     disabled={isLoading}
// //                     className="w-full pl-12 pr-4 py-3.5 border border-fibem-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-primary/20 focus:border-fibem-primary bg-fibem-background text-fibem-textPrimary placeholder-fibem-muted disabled:bg-fibem-surface disabled:opacity-50 transition-all"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <label htmlFor="password" className="block text-sm font-semibold text-fibem-textPrimary mb-2">
// //                   {t('auth.connexion.passwordLabel')}
// //                 </label>
// //                 <div className="relative">
// //                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     id="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder={t('auth.connexion.passwordPlaceholder')}
// //                     required
// //                     disabled={isLoading}
// //                     className="w-full pl-12 pr-12 py-3.5 border border-fibem-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fibem-primary/20 focus:border-fibem-primary bg-fibem-background text-fibem-textPrimary placeholder-fibem-muted disabled:bg-fibem-surface disabled:opacity-50 transition-all"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     disabled={isLoading}
// //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary disabled:opacity-50 transition-colors"
// //                   >
// //                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Remember me & Forgot password */}
// //               <div className="flex items-center justify-between">
// //                 <label className="flex items-center gap-3 cursor-pointer group">
// //                   <input
// //                     type="checkbox"
// //                     checked={rememberMe}
// //                     onChange={(e) => setRememberMe(e.target.checked)}
// //                     disabled={isLoading}
// //                     className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20 disabled:opacity-50"
// //                   />
// //                   <span className="text-sm text-fibem-textSecondary group-hover:text-fibem-textPrimary transition-colors">
// //                     {t('auth.connexion.rememberMe')}
// //                   </span>
// //                 </label>
// //                 <Link 
// //                   href="/mot-de-passe-oublie" 
// //                   className="text-sm text-fibem-primary hover:text-fibem-dark font-medium transition-colors"
// //                 >
// //                   {t('auth.connexion.forgotPassword')}
// //                 </Link>
// //               </div>

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="w-full py-3.5 bg-fibem-primary text-white font-semibold rounded-lg hover:bg-fibem-dark focus:outline-none focus:ring-2 focus:ring-fibem-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                     Connexion en cours...
// //                   </>
// //                 ) : (
// //                   <>
// //                     Se connecter
// //                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //                   </>
// //                 )}
// //               </button>
// //             </form>

// //             {/* Footer mobile */}
// //             <div className="mt-8 pt-6 border-t border-fibem-border text-center lg:hidden">
// //               <p className="text-fibem-textSecondary text-sm mb-3">
// //                 Pas encore de compte ?
// //               </p>
// //               <Link 
// //                 href="/inscription"
// //                 className="inline-flex items-center gap-2 text-fibem-primary hover:text-fibem-dark font-medium text-sm transition-colors"
// //               >
// //                 Créer un compte
// //                 <ArrowRight className="w-3 h-3" />
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }



// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { signIn } from 'next-auth/react'
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   User, 
//   Building, 
//   Users, 
//   Shield,
//   Check,
//   ArrowRight,
//   Sparkles,
//   Key,
//   Smartphone,
//   Globe,
//   Star
// } from 'lucide-react'
// import { useI18n, useScopedI18n } from '@/locales/client'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { motion } from 'framer-motion'

// type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur'

// export default function ConnexionPage() {
//   const t = useI18n()
//   const theader = useScopedI18n('header')
//   const router = useRouter()
//   const [selectedType, setSelectedType] = useState<UserType>('particulier')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setIsLoading(true)

//     try {
//       const result = await signIn('credentials', {
//         email,
//         password,
//         redirect: false,
//       })

//       if (result?.error) {
//         setError(t('auth.connexion.emailOrPasswordIncorrect'))
//       } else if (result?.ok) {
//         router.push('/dashboard')
//       }
//     } catch (err) {
//       setError(t('auth.connexion.errorOccurred'))
//       console.error('Login error:', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const userTypes = [
//     { 
//       id: 'particulier' as UserType, 
//       label: 'Particulier', 
//       icon: User, 
//       description: 'Pour les particuliers',
//       color: 'blue'
//     },
//     { 
//       id: 'candidat' as UserType, 
//       label: 'Candidat', 
//       icon: Users, 
//       description: 'Chercheur d\'emploi',
//       color: 'green'
//     },
//     { 
//       id: 'partenaire' as UserType, 
//       label: 'Partenaire', 
//       icon: Building, 
//       description: 'Entreprise partenaire',
//       color: 'purple'
//     },
//     { 
//       id: 'administrateur' as UserType, 
//       label: 'Administrateur', 
//       icon: Shield, 
//       description: 'Accès administration',
//       color: 'amber'
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-fibem-dark via-fibem-primary/20 to-fibem-secondary/10 py-8 md:py-12 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Blur circles */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
//         {/* Grid pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `linear-gradient(to right, #379DE0 1px, transparent 1px),
//                              linear-gradient(to bottom, #379DE0 1px, transparent 1px)`,
//             backgroundSize: '50px 50px'
//           }}></div>
//         </div>
//       </div>

//       <div className="relative z-10">
//         <div className="max-w-6xl mx-auto px-4">
//           {/* Main container with glass effect */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
//           >
//             <div className="grid lg:grid-cols-2">
//               {/* Left column - Welcome section */}
//               <div className="bg-gradient-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden">
//                 {/* Decorative elements */}
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
//                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
                
//                 {/* Logo */}
//                 <div className="relative z-10 mb-8">
//                   <Link href="/" className="inline-flex items-center gap-3 group">
//                     <motion.div 
//                       whileHover={{ scale: 1.05, rotate: 3 }}
//                       className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 border border-white/20 group-hover:border-white/40 transition-all"
//                     >
//                       <Image 
//                         src="/logo.png" 
//                         width={48} 
//                         height={48} 
//                         alt={theader('searchOnFibem')}
//                         className="object-contain filter brightness-0 invert"
//                       />
//                     </motion.div>
//                     <div>
//                       <span className="text-2xl font-bold block">FIBEM</span>
//                       <span className="text-white/70 text-sm">Plateforme Professionnelle</span>
//                     </div>
//                   </Link>
//                 </div>

//                 {/* Welcome content */}
//                 <div className="relative z-10 space-y-8">
//                   <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="space-y-4"
//                   >
//                     <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//                       Welcome Back!
//                     </h1>
//                     <p className="text-xl text-white/80">
//                       To keep connected with us please login with your personal info
//                     </p>
//                   </motion.div>

//                   {/* Features */}
//                   <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="space-y-4"
//                   >
//                     {[
//                       { icon: Key, text: 'Accès sécurisé à votre espace', color: 'text-fibem-secondary' },
//                       { icon: Smartphone, text: 'Application mobile disponible', color: 'text-white' },
//                       { icon: Globe, text: 'Disponible partout dans le monde', color: 'text-fibem-secondary' },
//                       { icon: Star, text: 'Support premium 24/7', color: 'text-white' },
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-center gap-3 group">
//                         <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
//                           <feature.icon className={`w-5 h-5 ${feature.color}`} />
//                         </div>
//                         <span className="text-white/90 group-hover:text-white transition-colors">
//                           {feature.text}
//                         </span>
//                       </div>
//                     ))}
//                   </motion.div>

//                   {/* Stats */}
//                   {/* <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="grid grid-cols-3 gap-4 pt-4"
//                   >
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">10K+</div>
//                       <div className="text-sm text-white/70">Utilisateurs</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">98%</div>
//                       <div className="text-sm text-white/70">Satisfaction</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">24/7</div>
//                       <div className="text-sm text-white/70">Support</div>
//                     </div>
//                   </motion.div> */}
//                 </div>
//               </div>

//               {/* Right column - Login form */}
//               <div className="p-8 md:p-12">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                   <h2 className="text-3xl font-bold text-fibem-textPrimary mb-2">
//                     SIGN IN
//                   </h2>
//                   <p className="text-fibem-textSecondary">
//                     Entrez vos identifiants pour continuer
//                   </p>
//                 </div>

//                 {/* Social login buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 mb-8">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
//                   >
//                     <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                     </svg>
//                     Facebook
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
//                   >
//                     <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                     </svg>
//                     Google
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
//                   >
//                     <svg className="w-5 h-5 mr-2 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                     </svg>
//                     LinkedIn
//                   </Button>
//                 </div>

//                 {/* Divider */}
//                 <div className="relative mb-8">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-fibem-border"></div>
//                   </div>
//                   <div className="relative flex justify-center">
//                     <span className="px-4 bg-white text-fibem-muted text-sm">
//                       ou utilisez votre email
//                     </span>
//                   </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
//                   >
//                     <p className="text-red-700 text-sm font-medium">{error}</p>
//                   </motion.div>
//                 )}

//                 {/* Login form */}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Email */}
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-fibem-textPrimary mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
//                       <Input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="votre@email.com"
//                         required
//                         disabled={isLoading}
//                         className="pl-10 pr-4 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
//                       />
//                     </div>
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-fibem-textPrimary mb-2">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
//                       <Input
//                         type={showPassword ? 'text' : 'password'}
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="••••••••"
//                         required
//                         disabled={isLoading}
//                         className="pl-10 pr-12 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         disabled={isLoading}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary disabled:opacity-50"
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Remember me & Forgot password */}
//                   <div className="flex items-center justify-between">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <div className="relative">
//                         <input
//                           type="checkbox"
//                           checked={rememberMe}
//                           onChange={(e) => setRememberMe(e.target.checked)}
//                           disabled={isLoading}
//                           className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20 disabled:opacity-50"
//                         />
//                       </div>
//                       <span className="text-sm text-fibem-textSecondary">
//                         Se souvenir de moi
//                       </span>
//                     </label>
//                     <Link 
//                       href="/mot-de-passe-oublie" 
//                       className="text-sm text-fibem-primary hover:text-fibem-dark font-medium"
//                     >
//                       Mot de passe oublié ?
//                     </Link>
//                   </div>

//                   {/* Submit Button */}
//                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                     <Button
//                       type="submit"
//                       disabled={isLoading}
//                       className="w-full py-3.5 bg-fibem-primary hover:bg-fibem-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
//                     >
//                       {isLoading ? (
//                         <div className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Connexion...
//                         </div>
//                       ) : (
//                         <div className="flex items-center justify-center gap-2">
//                           SIGN IN
//                           <ArrowRight className="w-4 h-4" />
//                         </div>
//                       )}
//                     </Button>
//                   </motion.div>
//                 </form>

//                 {/* Create account section */}
//                 <div className="mt-8 pt-8 border-t border-fibem-border text-center">
//                   <p className="text-fibem-textSecondary mb-4">
//                     Pas encore de compte ?
//                   </p>
//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Link 
//                       href="/inscription"
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface text-fibem-textPrimary font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
//                     >
//                       <span>Create Account</span>
//                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                   </motion.div>
                  
//                   {/* Additional info */}
//                   <div className="mt-6 grid grid-cols-2 gap-4">
//                     <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
//                       <div className="w-8 h-8 bg-fibem-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
//                         <Shield className="w-4 h-4 text-fibem-primary" />
//                       </div>
//                       <div className="text-xs text-fibem-textSecondary">Sécurisé</div>
//                     </div>
//                     <div className="text-center p-3 bg-fibem-surface/50 rounded-lg">
//                       <div className="w-8 h-8 bg-fibem-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
//                         <Check className="w-4 h-4 text-fibem-secondary" />
//                       </div>
//                       <div className="text-xs text-fibem-textSecondary">Vérifié</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }




'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  Users, 
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  Key,
  Smartphone,
  Globe,
  Star
} from 'lucide-react'
import { useI18n, useScopedI18n } from '@/locales/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

type UserType = 'particulier' | 'candidat' | 'partenaire' | 'administrateur'

export default function ConnexionPage() {
  const t = useI18n()
  const tAuth = useScopedI18n('auth.connexion')
  const tCommon = useScopedI18n('common')
  const tHeader = useScopedI18n('header')
  const tUserType = useScopedI18n('auth.userType')
  
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
        setError(tAuth('emailOrPasswordIncorrect'))
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(tAuth('errorOccurred'))
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    { 
      id: 'particulier' as UserType, 
      label: tUserType('particulier'), 
      icon: User, 
      description: tAuth('particulier.description'),
      color: 'blue'
    },
    { 
      id: 'candidat' as UserType, 
      label: tUserType('candidat'), 
      icon: Users, 
      description: tAuth('candidat.description'),
      color: 'green'
    },
    { 
      id: 'partenaire' as UserType, 
      label: tUserType('partenaire'), 
      icon: Building, 
      description: tAuth('partenaire.description'),
      color: 'purple'
    },
    { 
      id: 'administrateur' as UserType, 
      label: tUserType('administrateur'), 
      icon: Shield, 
      description: tAuth('administrateur.description'),
      color: 'amber'
    },
  ]

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
        {/* Blur circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fibem-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fibem-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fibem-accent/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
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
          {/* Main container with glass effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 lg:grid-cols-[2fr,1fr]">
              {/* Left column - Welcome section */}
              <div className="bg-gradient-to-br from-fibem-primary to-fibem-dark p-8 md:p-12 text-white relative overflow-hidden w-full">
                {/* Decorative elements */}
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
                      {tAuth('welcomeBack')}
                    </h1>
                    <p className="text-lg text-white/80">
                      {t('home.hero.subtitle')}
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

                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-4 pt-4"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-sm text-white/70">{t('home.services.reviews')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-white/70">{t('footer.customerSatisfaction')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-white/70">{t('home.services.available')}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right column - Login form */}
              <div className="p-8 md:p-12 w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-fibem-textPrimary mb-2">
                    {tCommon('signIn')}
                  </h2>
                  <p className="text-fibem-textSecondary">
                    {tAuth('subtitle')}
                  </p>
                </div>

                {/* Social login buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {tCommon('continueWithFacebook')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {tCommon('continueWithGoogle')}
                  </Button>
                  {/* <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-3 border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface transition-all"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {tCommon('continueWithLinkedIn')}
                  </Button> */}
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-fibem-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-fibem-muted text-sm">
                      {tCommon('or')} {t('home.cta.subtitle')}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      {tAuth('emailLabel')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={tAuth('emailPlaceholder')}
                        required
                        disabled={isLoading}
                        className="pl-10 pr-4 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-fibem-textPrimary mb-2">
                      {tAuth('passwordLabel')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fibem-muted w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={tAuth('passwordPlaceholder')}
                        required
                        disabled={isLoading}
                        className="pl-10 pr-12 py-3 border-fibem-border focus:border-fibem-primary focus:ring-fibem-primary bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fibem-muted hover:text-fibem-textSecondary disabled:opacity-50"
                        aria-label={showPassword ? tAuth('hidePassword') : tAuth('showPassword')}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          disabled={isLoading}
                          className="w-4 h-4 rounded border-fibem-border text-fibem-primary focus:ring-fibem-primary/20 disabled:opacity-50"
                        />
                      </div>
                      <span className="text-sm text-fibem-textSecondary">
                        {tAuth('rememberMe')}
                      </span>
                    </label>
                    <Link 
                      href="/mot-de-passe-oublie" 
                      className="text-sm text-fibem-primary hover:text-fibem-dark font-medium"
                    >
                      {tAuth('forgotPassword')}
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-fibem-primary hover:bg-fibem-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {tAuth('signingIn')}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {tAuth('signInButton')}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Create account section */}
                <div className="mt-8 pt-8 border-t border-fibem-border text-center">
                  <p className="text-fibem-textSecondary mb-4">
                    {tAuth('noAccount')}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                      href="/inscription"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-fibem-border hover:border-fibem-primary hover:bg-fibem-surface text-fibem-textPrimary font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <span>{tAuth('createAccount')}</span>
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