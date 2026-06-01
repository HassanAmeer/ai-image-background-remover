/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
			display: [
				'Inter',
				'system-ui',
				'sans-serif'
			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'Consolas',
  				'monospace'
  			]
  		},
  		fontSize: {
  			'2xs': [
  				'0.625rem',
  				{ lineHeight: '0.75rem' }
  			],
  			'3xl': [
  				'1.875rem',
  				{ lineHeight: '2.25rem' }
  			],
  			'4xl': [
  				'2.25rem',
  				{ lineHeight: '2.5rem' }
  			],
  			'5xl': [
  				'3rem',
  				{ lineHeight: '1.1' }
  			],
  			'6xl': [
  				'3.75rem',
  				{ lineHeight: '1.1' }
  			],
  			'7xl': [
  				'4.5rem',
  				{ lineHeight: '1.1' }
  			],
  			'8xl': [
  				'6rem',
  				{ lineHeight: '1' }
  			],
  			'9xl': [
  				'8rem',
  				{ lineHeight: '1' }
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'72': '18rem',
  			'84': '21rem',
  			'96': '24rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        'cf-cyan': {
          500: 'hsl(180, 70%, 45%)',
          300: 'hsl(180, 70%, 65%)',
        },
        'cf-dark-blue': {
          800: 'hsl(200, 40%, 20%)',
        },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  			glow: '0 0 20px -5px rgba(0, 188, 212, 0.4)',
  			'glow-lg': '0 0 40px -10px rgba(0, 188, 212, 0.3)',
  			primary: '0 0 20px -5px hsl(var(--primary) / 0.4)',
  			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			shimmer: {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 0.6s ease-out',
  			shimmer: 'shimmer 2s infinite',
  			float: 'float 3s ease-in-out infinite'
  		},
  		backgroundImage: {
  			'gradient-hero-cyan': 'linear-gradient(135deg, hsl(180, 70%, 97%) 0%, hsl(180, 40%, 90%) 100%)',
        'gradient-hero-cyan-dark': 'linear-gradient(135deg, hsl(200, 40%, 10%) 0%, hsl(180, 70%, 15%) 100%)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}