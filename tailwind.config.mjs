const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
export default {
	content: {
		files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}','./node_modules/vue-tailwind-datepicker/**/*.js']
	},
	theme: {
		extend: {
			scale:{
				'115': '1.15'
			},
			fontSize: {
				'10xl': '12rem', // Puedes ajustar el valor según lo que necesites
			},
			colors: {
				...colors,
				'vtd-primary': {
					'50': "#fed000",
					'100': "#fed000",
					'200': "#fed000",
					'300': "#fed000",
					'400': "#fed000",
					'500': "#fed000",
					'600': "#fed000",
					'700': "#fed000",
					'800': "#fed000",
					'900': "#fed000",
					'950': "#fed000",
				},
				'vtd-secondary': {
					'50': "#f9fafb",
					'100': "#A6ADBB",
					'200': "#e5e7eb",
					'300': "#d1d5db",
					'400': "#9ca3af",
					'500': "#6b7280",
					'600': "#4b5563",
					'700': "#374151",
					'800': "#1D232A",
					'900': "#111827",
					'950': "#030712"
				},
			}
		}
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes:[
			{
			light: {
				...require("daisyui/src/theming/themes")["light"],
				primary: "#fed000",
				secondary: "#0037ff"
			  },
			dark: {
				...require("daisyui/src/theming/themes")["dark"],
				primary: "#fed000",
				secondary: "#0037ff"
				//'primary-content': "#FFFF"
			  },
			}
		],
	  },
	  safelist: [
		{
			pattern: /bg-(base|primary)-(100|200|300)/
		  },
		  {
			pattern: /(bg|text|border)-vtd-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900|950)/
		  }
	  ]
}
