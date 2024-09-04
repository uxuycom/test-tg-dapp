/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/assets/theme.js')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    borderRadius: {
      none: '0',
      DEFAULT: '.25rem',
      lg: '.5rem',
      full: '9999px',
    },
    fontFamily: {
      // 'MiSans-Regular': ['var(--MiSans-Regular)', 'sans-serif'],
      // 'MiSans-Medium': ['var(--MiSans-Medium)', 'sans-serif'],
      // 'MiSans-Bold': ['var(--MiSans-Semibold)', 'sans-serif'],
    },
    extend: {
      screens: {
        'sm-custom': '26.375rem', // 422px 转换为 rem（422/16 = 26.375rem）
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: 1.2 }],
        h2: ['2rem', { lineHeight: 1.2 }],
        h3: ['1.75rem', { lineHeight: 1.2 }],
        h4: ['1.5rem', { lineHeight: 1.3 }],
        h5: ['1.25rem', { lineHeight: 1.4 }],
        h6: ['1.125rem', { lineHeight: 1.4 }],
        body1: ['1rem', { lineHeight: 1.4 }],
        body2: ['0.9375rem', { lineHeight: 1.4 }],
        body3: ['0.875rem', { lineHeight: 1.4 }],
        body4: ['0.8125rem', { lineHeight: 1.4,
        }],
        direction1: ['0.75rem', { lineHeight: 1.3 }],
        direction2: ['0.6875rem', { lineHeight: 1.3 }],
        direction3: ['0.625rem', { lineHeight: 1.3 }],
        // direction4: [
        //     '0.5rem',
        //     {
        //         // fontFamily: 'var(--MiSans-Regular)',
        //         // textAlign: 'center',
        //     },
        // ],
      },
      colors: colors,
      fontWeight: {
        Regular: '400',
        // Semibold: '580',
        Semibold: '600',
        Bold: '700',
      },
      spacing: {
        /** 54px */
        13.5: '3.375rem', // /** 54px */
        '54px': '3.375rem', // /** 54px */
      },
      borderRadius: {
        xl: '0.75rem', // 12px
      },
    },
  },
  plugins: [],
}
