import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PartnersSection from '@/components/sections/PartnersSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      {/* <PartnersSection /> */}
      <CTASection />
    </>
  )
}
