
import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    flowbite,
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-green': '1px 1px 6px 6px rgba(98, 186, 27, 0.5), 0 1px 3px rgba(98, 186, 27, 0.3)',
      },
     
      fontFamily: {
        'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        grey_dark: '#393939', 
        black:'#080808',
        greyy:'#9C9C9C',
        green:'#3F8E00',
        kyel_green:'#62BA1B'
      },
      screens: {     
        lg: '1180px', 
        sm: '440px',
        md: '768px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
