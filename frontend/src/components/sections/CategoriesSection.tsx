'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'
import {
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  Home,
  Hammer,
  Truck,
  MonitorSmartphone,
  ChefHat,
  Scissors,
  Car,
  GraduationCap
} from 'lucide-react'
import { fetchServiceCategories } from '@/actions/services';

// Mapping of category names to icons and colors
const categoryIcons: Record<string, { icon: any; color: string }> = {
  'Plomberie': { icon: Wrench, color: 'bg-blue-500' },
  'Électricité': { icon: Zap, color: 'bg-yellow-500' },
  'Peinture': { icon: Paintbrush, color: 'bg-purple-500' },
  'Rénovation': { icon: Home, color: 'bg-green-500' },
  'Maçonnerie': { icon: Hammer, color: 'bg-orange-500' },
  'Chauffage': { icon: Droplets, color: 'bg-red-500' },
  'Informatique': { icon: MonitorSmartphone, color: 'bg-indigo-500' },
  'Déménagement': { icon: Truck, color: 'bg-teal-500' },
  'Restauration': { icon: ChefHat, color: 'bg-pink-500' },
  'Couture': { icon: Scissors, color: 'bg-rose-500' },
  'Transport': { icon: Car, color: 'bg-cyan-500' },
  'Formation': { icon: GraduationCap, color: 'bg-amber-500' },
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchServiceCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <p>Chargement des catégories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimationWrapper type="fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos catégories de services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez une large gamme de services professionnels pour tous vos besoins
            </p>
          </div>
        </ScrollAnimationWrapper>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category) => {
            const iconInfo = categoryIcons[category.name] || { icon: Wrench, color: 'bg-gray-500' };
            return (
              <div key={category.id}>
                <Link
                  href={`/services?category=${category.id}`}
                  className="bg-white rounded-xl p-4 text-center"
                >
                  <div className={`${iconInfo.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <iconInfo.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">Catégorie</p>
                </Link>
              </div>
            );
          })}
        </motion.div>

        <ScrollAnimationWrapper type="fadeInUp" delay={0.3}>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fibem-primary text-white rounded-lg hover:bg-fibem-dark transition-colors"
            >
              Voir toutes les catégories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
