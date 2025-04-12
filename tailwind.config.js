import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    flowbite,
  ],
  theme: {
    extend: {
      boxShadow: {
        // Vos ombres personnalisées
      },
      fontFamily: {
        'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        grey_dark: '#393939',
        black: '#080808',
        greyy: '#9C9C9C',
        kyel_green: '#62BA1B',
      },
      screens: {
        lg: '1180px',
        sm: '440px',
        md: '768px',
        xl: '1280px',
        '2xl': '1536px',
      },
      height: {
        transactionHistoryHight: '310px', // Définir la hauteur personnalisée
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwind-scrollbar"), 
  ],
  corePlugins: {
    appearance: true, // Assurez-vous que ce plugin est activé
  },
};