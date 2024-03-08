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
				background: "#222222",
				text: "#eff4f6",
				primary: "#9dc0d8",
				secondary: "#2a5979",
				accent: "#5ea0cf",
			}
		}
	},
	plugins: [],
};
export default config;
