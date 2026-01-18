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
        fibem: {
          primary: '#379DE0', // Deep blue
          secondary: '#3B82F6', // Bright blue
          accent: '#faab22', // Orange/amber accent
          light: '#DBEAFE', // Light blue
          dark: '#1E293B', // Dark slate
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
