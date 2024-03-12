import type { Config } from "tailwindcss";

const config: Config = {
	corePlugins: {
		preflight: false,
		divideStyle: true
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./ui/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#070d13",
				text: "#eff4f6",
				primary: "#9dc0d8",
				secondary: "#2a5979",
				accent: "#5ea0cf",
			},
			animation: {
				fade: "fadeOut 0.2s ease-in-out"
			},
			keyframes: {
				fadeOut: {
					'0%': { opacity: "0" },
					'100%': { opacity: "1" }
				}
			}
		}
	},
	plugins: [],
};
export default config;
