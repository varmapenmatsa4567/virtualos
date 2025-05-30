/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
	"./mobile/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		cursor: {
			'camera': 'url("/cursor.png"), auto',
		},
		fontFamily: {
			sans: ['San Francisco', 'sans-serif'],
		},
		backgroundImage: {
			'wallpaper1': "url('/wallpapers/wallpaper.png')",
			'wallpaper2': "url('/wallpapers/wallpaper2.jpg')",
			'wallpaper3': "url('/wallpapers/wallpaper3.jpg')",
			'wallpaper4': "url('/wallpapers/wallpaper4.jpg')",
			'wallpaper5': "url('/wallpapers/wallpaper5.png')",
			'wallpaper6': "url('/wallpapers/wallpaper6.png')",
			'wallpaper7': "url('/wallpapers/wallpaper7.png')",
			'wallpaper8': "url('/wallpapers/wallpaper8.png')",
			'wallpaper9': "url('/wallpapers/wallpaper9.png')",
			'wallpaper10': "url('/wallpapers/wallpaper10.png')",
			'launchpad': "url('/launchpad.jpg')",
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar-hide'),require('@tailwindcss/typography'),],
};
