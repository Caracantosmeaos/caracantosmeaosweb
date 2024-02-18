/** @type {import('tailwindcss').Config} */
export default {
	content: {
		files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes:[
			{
			light: {
				...require("daisyui/src/theming/themes")["light"],
				primary: "#fed000",
				secondary: "#0037ff",
			  },
			dark: {
				...require("daisyui/src/theming/themes")["dark"],
				primary: "#fed000",
				secondary: "#0037ff",
				//'primary-content': "#FFFF"
			  },
			}
		],
	  },
	  safelist: [
		{
			pattern: /bg-(base|primary)-(100|200|300)/
		  },
	  ]
}
