/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        primary: {
          DEFAULT: "#3B82F6", // Bleu vibrant - confiance, professionnalisme, technologie
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6", // Couleur principale
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        // Couleur pour les comparaisons et changements
        compare: {
          DEFAULT: "#8B5CF6", // Violet - créativité, intuition, analyse
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6", // Couleur principale pour les comparaisons
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        // Couleur pour les amis ajoutés
        success: {
          DEFAULT: "#10B981", // Vert - croissance, nouveaux liens
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981", // Couleur principale pour les ajouts
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        // Couleur pour les amis supprimés
        danger: {
          DEFAULT: "#EF4444", // Rouge - attention, suppression
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444", // Couleur principale pour les suppressions
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        // Couleur neutre pour l'interface
        neutral: {
          DEFAULT: "#6B7280", // Gris - neutralité, stabilité
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280", // Couleur principale pour les éléments neutres
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
