from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from services.models import Service, ServiceCategory
import random
from decimal import Decimal


class Command(BaseCommand):
    help = 'Creates at least 20 Service objects and attaches them to the first user in the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=20,
            help='Number of Service objects to create (default: 20)'
        )

    def handle(self, *args, **options):
        count = options['count']
        User = get_user_model()
        
        # Get the first user in the database
        first_user = User.objects.first()
        if not first_user:
            self.stdout.write(
                self.style.ERROR('No users found in the database. Please create at least one user first.')
            )
            return
        
        # Get all service categories or create some if none exist
        categories = ServiceCategory.objects.all()
        if not categories.exists():
            self.stdout.write(
                self.style.WARNING('No service categories found. Creating sample categories first...')
            )
            # Create some sample categories
            sample_categories = [
                {'name': 'Développement Web', 'description': 'Services de développement de sites web et d\'applications'},
                {'name': 'Design Graphique', 'description': 'Services de création graphique et d\'identité visuelle'},
                {'name': 'Marketing Digital', 'description': 'Stratégies de marketing en ligne et réseaux sociaux'},
                {'name': 'Consultation IT', 'description': 'Services de conseil en technologies de l\'information'},
                {'name': 'Cybersécurité', 'description': 'Protection des systèmes informatiques et données'},
                {'name': 'Cloud Computing', 'description': 'Services d\'hébergement et de gestion cloud'},
                {'name': 'Maintenance Informatique', 'description': 'Support technique et maintenance des systèmes'},
                {'name': 'Formation Informatique', 'description': 'Formations techniques et certifications'},
            ]
            
            for cat_data in sample_categories:
                category, created = ServiceCategory.objects.get_or_create(
                    name=cat_data['name'],
                    defaults={'description': cat_data['description']}
                )
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f'Created category: {category.name}')
                    )
            
            categories = ServiceCategory.objects.all()
        
        # Sample service data
        sample_services = [
            {
                'name': 'Site vitrine personnalisé',
                'description': 'Création d\'un site internet vitrine sur mesure avec design moderne et responsive.',
                'base_price': Decimal('500.00')
            },
            {
                'name': 'Application web sur mesure',
                'description': 'Développement d\'une application web complète selon vos besoins spécifiques.',
                'base_price': Decimal('2500.00')
            },
            {
                'name': 'Refonte de site existant',
                'description': 'Modernisation et optimisation de votre site internet existant.',
                'base_price': Decimal('800.00')
            },
            {
                'name': 'SEO - Référencement naturel',
                'description': 'Optimisation du référencement naturel pour améliorer votre positionnement dans les moteurs de recherche.',
                'base_price': Decimal('300.00')
            },
            {
                'name': 'Campagne Google Ads',
                'description': 'Mise en place et gestion de campagnes publicitaires sur Google Ads.',
                'base_price': Decimal('200.00')
            },
            {
                'name': 'Création d\'identité visuelle',
                'description': 'Développement complet d\'une identité visuelle comprenant logo, charte graphique, etc.',
                'base_price': Decimal('600.00')
            },
            {
                'name': 'Design d\'interface utilisateur',
                'description': 'Création d\'interfaces utilisateur intuitives et attrayantes pour vos applications.',
                'base_price': Decimal('400.00')
            },
            {
                'name': 'Audit de sécurité informatique',
                'description': 'Évaluation complète de la sécurité de vos systèmes informatiques.',
                'base_price': Decimal('750.00')
            },
            {
                'name': 'Migration vers le cloud',
                'description': 'Assistance à la migration de vos données et applications vers une infrastructure cloud.',
                'base_price': Decimal('1200.00')
            },
            {
                'name': 'Formation WordPress',
                'description': 'Formation personnalisée à la plateforme WordPress pour gérer votre site.',
                'base_price': Decimal('150.00')
            },
            {
                'name': 'Développement mobile iOS',
                'description': 'Création d\'applications natives pour iPhone et iPad.',
                'base_price': Decimal('3000.00')
            },
            {
                'name': 'Développement mobile Android',
                'description': 'Création d\'applications natives pour appareils Android.',
                'base_price': Decimal('3000.00')
            },
            {
                'name': 'Support technique à distance',
                'description': 'Assistance technique continue pour vos systèmes informatiques.',
                'base_price': Decimal('100.00')
            },
            {
                'name': 'Analyse de données',
                'description': 'Extraction et analyse de données pour prendre des décisions éclairées.',
                'base_price': Decimal('450.00')
            },
            {
                'name': 'Intégration de système ERP',
                'description': 'Implémentation de solutions ERP pour automatiser vos processus métiers.',
                'base_price': Decimal('2000.00')
            },
            {
                'name': 'Audit de performance web',
                'description': 'Analyse approfondie des performances de votre site web.',
                'base_price': Decimal('250.00')
            },
            {
                'name': 'Configuration serveur',
                'description': 'Installation et configuration de serveurs pour héberger vos applications.',
                'base_price': Decimal('600.00')
            },
            {
                'name': 'Développement d\'API',
                'description': 'Création d\'API robustes pour connecter vos applications.',
                'base_price': Decimal('1000.00')
            },
            {
                'name': 'Formation en cybersécurité',
                'description': 'Sensibilisation et formation à la sécurité informatique.',
                'base_price': Decimal('350.00')
            },
            {
                'name': 'Conseil en transformation digitale',
                'description': 'Accompagnement dans votre stratégie de transformation digitale.',
                'base_price': Decimal('500.00')
            },
        ]
        
        created_count = 0
        
        for i in range(count):
            service_data = sample_services[i % len(sample_services)]
            category = random.choice(categories)
            
            # Create the service
            service = Service.objects.create(
                name=service_data['name'],
                description=service_data['description'],
                base_price=service_data['base_price'],
                category=category,
                created_by=first_user
            )
            
            created_count += 1
            self.stdout.write(
                self.style.SUCCESS(f'Created service: {service.name} (Category: {category.name})')
            )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {created_count} Service objects attached to user {first_user.email}'
            )
        )