import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontSize: {
				xxs: ['0.65rem', '0.85rem'],
			},
			spacing: {
				content: 'calc(var(--navbar-height) + 2rem)',
			},
			opacity: {
				'decrease-distraction': 'calc(var(--decrease-distraction-opacity))',
			},
			fontFamily: {
				display: ['Epilogue', 'IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans],
				sans: ['Inter', 'IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans],
				serif: ['Lora', 'Taviraj', ...defaultTheme.fontFamily.serif],
				essay: ['Lora', 'Taviraj', ...defaultTheme.fontFamily.serif],
			},
			maxWidth: {
				container: '1104px',
			},
			colors: {
				primary: {
					'50': '#f3fdff',
					'100': '#e7fbfe',
					'200': '#c3f4fd',
					'300': '#9fedfc',
					'400': '#56e0f9',
					'500': '#0ED2F7',
					'600': '#0dbdde',
					'700': '#0b9eb9',
					'800': '#087e94',
					'900': '#076779'
				},
				reader: '#FFFAF8',
				'reader-dark': '#18191A',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
	],
}
