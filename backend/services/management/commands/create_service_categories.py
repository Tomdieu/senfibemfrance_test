from django.core.management.base import BaseCommand
from services.models import ServiceCategory


class Command(BaseCommand):
    help = 'Creates at least 10 ServiceCategory objects'

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=10,
            help='Number of ServiceCategory objects to create (default: 10)'
        )

    def handle(self, *args, **options):
        count = options['count']
        
        # Sample categories to create
        sample_categories = [
            {'name': 'Développement Web', 'description': 'Services de développement de sites web et d\'applications'},
            {'name': 'Design Graphique', 'description': 'Services de création graphique et d\'identité visuelle'},
            {'name': 'Marketing Digital', 'description': 'Stratégies de marketing en ligne et réseaux sociaux'},
            {'name': 'Consultation IT', 'description': 'Services de conseil en technologies de l\'information'},
            {'name': 'Cybersécurité', 'description': 'Protection des systèmes informatiques et données'},
            {'name': 'Cloud Computing', 'description': 'Services d\'hébergement et de gestion cloud'},
            {'name': 'Maintenance Informatique', 'description': 'Support technique et maintenance des systèmes'},
            {'name': 'Formation Informatique', 'description': 'Formations techniques et certifications'},
            {'name': 'Audit et Conseil', 'description': 'Audits de systèmes et conseils stratégiques'},
            {'name': 'Intégration ERP', 'description': 'Intégration de solutions de gestion d\'entreprise'},
            {'name': 'Développement Mobile', 'description': 'Applications mobiles iOS et Android'},
            {'name': 'Analyse de Données', 'description': 'Big Data, Business Intelligence et Analytics'},
        ]
        
        created_count = 0
        
        for i in range(count):
            category_data = sample_categories[i % len(sample_categories)]
            
            # Check if category already exists to avoid duplicates
            category, created = ServiceCategory.objects.get_or_create(
                name=category_data['name'],
                defaults={
                    'description': category_data['description'],
                    'icon': f'icon_{i+1}'  # Adding a simple icon name
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )
            else:
                self.stdout.write(
                    f'Skipped (already exists): {category.name}'
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {created_count} new ServiceCategory objects out of {count} requested'
            )
        )