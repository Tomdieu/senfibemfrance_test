const roleDescriptions: Record<string, { title: string; description: string }> = {
  PARTICULIER: {
    title: 'Espace Particulier',
    description: 'Accédez à votre espace pour gérer vos commandes, vos demandes de devis et suivre vos projets en cours.'
  },
  PROFESSIONNEL: {
    title: 'Espace Professionnel',
    description: 'Gérez votre entreprise, vos projets, vos factures et vos clients depuis votre tableau de bord professionnel.'
  },
  CANDIDAT: {
    title: 'Espace Candidat',
    description: 'Consultez les offres d\'emploi, gérez vos candidatures et suivez votre recherche d\'emploi.'
  },
  RECRUTEUR: {
    title: 'Espace Recruteur',
    description: 'Publiez des offres d\'emploi, consultez les candidatures et gérez vos recrutements.'
  },
  ADMIN: {
    title: 'Espace Administration',
    description: 'Administrez la plateforme, gérez les utilisateurs et consultez les statistiques globales.'
  },
}

interface DashboardRolePageParams {
  params: {
    role: string
    locale: string
  }
}

export default function DashboardRolePage({ params }: DashboardRolePageParams) {
  const role = params.role?.toUpperCase() || 'PARTICULIER'
  const content = roleDescriptions[role] || roleDescriptions.PARTICULIER

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h1>
        <p className="text-gray-600">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-800 mb-2">Accès Rapide</h3>
          <p className="text-gray-600 text-sm">Naviguez facilement vers les sections principales depuis le menu latéral.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-800 mb-2">Paramètres</h3>
          <p className="text-gray-600 text-sm">Configurez votre profil et vos préférences personnelles.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
          <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
          <p className="text-gray-600 text-sm">Besoin d\'aide ? Contactez notre équipe de support.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Contenu en Construction</h2>
        <p className="text-gray-600">
          Cette page pour le profil <strong>{role}</strong> est en cours de développement.
        </p>
      </div>
    </div>
  )
}