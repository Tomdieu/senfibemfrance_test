'use client'

import { useScopedI18n } from '@/locales/client'
import { SubscriptionPageLayout } from '@/components/marketing/SubscriptionPageLayout'
import { PricingCard } from '@/components/marketing/PricingCard'
import { useRouter } from 'next/navigation'

export default function ParticulierSubscriptionPage() {
    const t = useScopedI18n('subscriptions.plans.particulier')
    const thero = useScopedI18n('subscriptions.hero')
    const router = useRouter()

    const features = [0, 1, 2, 3, 4].map(i => t(`features.${i}` as any))

    return (
        <SubscriptionPageLayout title={t('title')} subtitle={t('subtitle')}>
            <div className="max-w-md mx-auto">
                <PricingCard
                    title={t('title')}
                    subtitle={t('subtitle')}
                    price={t('price')}
                    description={t('description')}
                    features={features}
                    cta={thero('choosePlan')}
                    popular={true}
                    onSelect={() => router.push('/inscription?type=particuliers')}
                />
            </div>
        </SubscriptionPageLayout>
    )
}
