/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"blue-0": "#007bc7",
				"blue-1": "#0098f7",
				"white-0": "#ffffff",
				"black-0": "#000000",
				"grey-0": "#b8b5b5",
				"grey-1": "#bec8db",
				"grey-2": "#c7d0e2",
				"dark-0": "#111d25",
				"dark-1": "#1c2830",
				"dark-2": "#202c34",
				"dark-3": "#2b3a44",
				"gradient-start": "#00c6ff",
				"gradient-end": "#0072ff",
				border: "#ffffff0d",
			},
			animation: {
				"spin-clockwise": "spin-clockwise 0.2s ease-in-out",
				"spin-counterclockwise":
					"spin-counterclockwise 0.2s ease-in-out",
			},
			keyframes: {
				"spin-clockwise": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(180deg)",
					},
				},
				"spin-counterclockwise": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(-180deg)",
					},
				},
			},
		},
	},
	plugins: [],
};
