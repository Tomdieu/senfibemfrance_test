'use client'

import { useScopedI18n } from '@/locales/client'
import { SubscriptionPageLayout } from '@/components/marketing/SubscriptionPageLayout'
import { PricingCard } from '@/components/marketing/PricingCard'
import { useRouter } from 'next/navigation'

export default function SubscriptionsIndexPage() {
  const t = useScopedI18n('subscriptions.plans')
  const thero = useScopedI18n('subscriptions.hero')
  const router = useRouter()

  const plans = [
    { key: 'stagiaire', type: 'stagiaire' },
    { key: 'candidat', type: 'candidat' },
    { key: 'freelance', type: 'freelance', popular: true },
    { key: 'professionnel', type: 'professionnels' },
    { key: 'particulier', type: 'particuliers' },
    { key: 'partenaire', type: 'partenaires' },
  ]

  return (
    <SubscriptionPageLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.key}
            title={t(`${plan.key}.title` as any)}
            subtitle={t(`${plan.key}.subtitle` as any)}
            price={t(`${plan.key}.price` as any)}
            description={t(`${plan.key}.description` as any)}
            features={[0, 1, 2, 3, 4].map(i => t(`${plan.key}.features.${i}` as any))}
            cta={thero('choosePlan')}
            popular={plan.popular}
            onSelect={() => router.push(`/inscription?type=${plan.type}`)}
          />
        ))}
      </div>
    </SubscriptionPageLayout>
  )
}