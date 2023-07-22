/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontSize: {
      xs: ['12px', '14px'],
      sm: ['13px', '15px'],
      base: ['14px', '16px'],
      lg: ['16px', '18px'],
      xl: ['18px', '20px'],
      '2xl': ['20px', '22px'],
      '3xl': ['22px', '24px'],
    },
    // fontSize: {
    //   xxs: ['11px', '13px'],
    //   xs: ['12px', '14px'],
    //   sm: ['13px', '15px'],
    //   base: ['14px', '16px'],
    //   lg: ['16px', '18px'],
    //   xl: ['22px', '26px'],
    //   '2xl': ['28px', '32px'],
    //   '3xl': ['34px', '38px'],
    //   '4xl': ['40px', '44px'],
    //   '5xl': ['46px', '50px'],
    //   '6xl': ['52px', '56px'],
    //   '7xl': ['58px', '62px'],
    //   '8xl': ['64px', '68px'],
    //   '9xl': ['70px', '74px'],
    // },
    // fontSize: {
    //   xxs: ['10px', '12px'],
    //   xs: ['11px', '13px'],
    //   sm: ['12px', '14px'],
    //   base: ['13px', '15px'],
    //   lg: ['14px', '16px'],
    //   xl: ['16px', '18px'],
    //   '2xl': ['22px', '26px'],
    //   '3xl': ['28px', '32px'],
    //   '4xl': ['34px', '38px'],
    //   '5xl': ['40px', '44px'],
    //   '6xl': ['46px', '50px'],
    //   '7xl': ['52px', '56px'],
    //   '8xl': ['58px', '62px'],
    //   '9xl': ['64px', '68px'],
    // },
  },
  plugins: [],
}
