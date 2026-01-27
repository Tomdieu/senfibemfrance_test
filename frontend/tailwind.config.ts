import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FIBEM brand colors - blue theme based on typical professional services
//         fibem2: {
//           primary: '#379DE0', // Deep blue
//           secondary: '#3B82F6', // Bright blue
//           accent: '#faab22', // Orange/amber accent
//           light: '#DBEAFE', // Light blue
//           dark: '#1E293B', // Dark slate
//         },
//         fibem: {
//   // Couleur principale (branding / boutons principaux)
//   primary: '#379DE0',   // Bleu turquoise dominant du logo
//   // Variante plus profonde (hover, headers)
//   dark: '#00231D', // Vert-bleu très sombre
//   // Accent fort (CTA, highlights, badges)
//   accent: '#CE3931',    // Rouge vif du texte FIBEM
//   // Accent secondaire (icônes, décorations)
//   secondary: '#faab22', // Or / jaune du cercle
//   // Texte principal
//   textPrimary: '#00003B', // Bleu-noir lisible
//   // Texte secondaire
//   textSecondary: '#65322F', // Brun foncé
//   // Fond clair
//   background: '#FFFFFF',
//   // Fond alternatif / sections
//   surface: '#F5F7F6',
//   // Bordures / séparateurs
//   border: '#8D938A',
//   // États désactivés
//   muted: '#B0B5B1'
// }
colors: {

  /**
   * ======================================================
   *  FIBEM DESIGN SYSTEM – COLOR RULES
   * ======================================================
   *
   * 🔹 Objectif :
   * Fusionner l’identité forte du logo FIBEM
   * avec une UI moderne, lisible et institutionnelle.
   *
   * 🔹 Règle 60–30–10 :
   * - 60% : background / surface (blancs et gris clairs)
   * - 30% : bleus (primary + dark)
   * - 10% : accents (rouge OU jaune, jamais les deux ensemble)
   *
   * 🔹 Règles d’usage IMPORTANTES :
   * ❌ Ne jamais utiliser rouge + jaune sur le même composant
   * ❌ Ne jamais utiliser rouge ou jaune pour du texte long
   * ✅ Rouge = CTA, actions critiques, alertes
   * ✅ Jaune = icônes, highlights, décorations
   * ✅ Bleu = structure, navigation, confiance
   *
   * 🔹 Hiérarchie UI :
   * - Navigation / footer : dark
   * - Boutons principaux : primary
   * - Actions clés / danger : accent
   * - UI neutre : surface, border, muted
   *
   * 🔹 Accessibilité :
   * - textPrimary et textSecondary respectent WCAG AA
   * - Toujours vérifier le contraste sur background et surface
   */

  fibem: {
    // Branding principal (bleu dominant du logo)
    primary: '#379DE0',

    // Bleu nuit institutionnel (headers, footer, hover)
    dark: '#0A1F3C',

    // Accent fort – CTA uniquement (rouge FIBEM)
    accent: '#CE3931',

    // Accent secondaire – énergie / soleil (icônes, décor)
    secondary: '#FAAB22',

    // Texte principal (lisibilité maximale)
    textPrimary: '#0A1F3C',

    // Texte secondaire (neutre, moderne)
    textSecondary: '#5F6B7A',

    // Fond principal
    background: '#FFFFFF',

    // Cartes, sections alternatives
    surface: '#F6F8FA',

    // Bordures et séparateurs subtils
    border: '#D0D7DE',

    // États désactivés / placeholders
    muted: '#9AA4AF'
  }

},

      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
