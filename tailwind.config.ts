import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    outlineWidth: false,
    outlineOffset: false,
    outlineColor: false,
    outlineStyle: false,
  },
  theme: {
    colors: {
      black: '#0D0E12',
      gray: {
        dark: '#191B20',
        2: '#25272C',
        3: '#33363D',
        4: '#777777',
        5: '#E0E0E0',
      },
      white: '#F0F0F0',

      purple: {
        planet: '#AA8DFF',
        light: '#D2C2FF',
        dark: '#7B7293',
      },
      neon: {
        glow: '#17E8C9',
        light: '#7CF7DA',
        dark: '#508C81',
      },
      red: '#F30745',
      transparent: colors.transparent,
    },
    screens: {
      tb: '768px',
      ds: '1024px',
      xl: '1280px',
    },
    fontSize: {
      s_h1: ['2.625rem', { fontWeight: '500', lineHeight: '105%' }], //42
      s_h2: ['2rem', { fontWeight: '500', lineHeight: '120%' }], //32
      s_h3: ['1.75rem', { fontWeight: '500', lineHeight: '120%' }], //28
      s_h4: ['1.5rem', { fontWeight: '500', lineHeight: '120%' }], //24
      s_h5: ['1.25rem', { fontWeight: '500', lineHeight: '120%' }], //20
      s_sh1: ['1.125rem', { fontWeight: '600', lineHeight: '120%' }], //18
      s_sh2: ['1.125rem', { fontWeight: '500', lineHeight: '120%' }], //18
      s_body: ['1rem', { fontWeight: '500', lineHeight: '120%' }], //16
      s_text: ['0.875rem', { fontWeight: '500', lineHeight: '120%' }], //14
      s_caption: ['0.75rem', { fontWeight: '500', lineHeight: '120%' }], //12
      s_button: ['0.625rem', { fontWeight: '600', lineHeight: '120%' }], //10
      s_captionM: ['0.625rem', { fontWeight: '500', lineHeight: '120%' }], //10
      s_captionS: ['0.5rem', { fontWeight: '500', lineHeight: '120%' }], //8
      s_captionXS: ['0.438rem', { fontWeight: '500', lineHeight: '120%' }], //7
      s_detail: ['0.375rem', { fontWeight: '500', lineHeight: '120%' }], //6
    },
    extend: {
      spacing: {
        auto: 'auto',
      },
      transitionProperty: {
        all2:
          'color, background-color, border-color, border-radius, text-decoration-color, fill, stroke, opacity, ' +
          'box-shadow, transform, filter, backdrop-filter, width, height, margin, padding',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      keyframes: {
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        scaleIn: 'scaleIn .5s ease-in-out',
        fade: 'fade .5s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.font-inter': {
          fontFamily: 'var(--font-inter)',
        },
        '.outline-border-none': {
          outline: 'none',
          border: 'none',
        },
        '.flex-center-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-center-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '.all2': {
          transition: 'all .2s ease-in-out',
        },
      })
    }),
  ],
}
export default config
