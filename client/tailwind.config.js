/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"blue-0": "var(--blue-0)",
				"blue-1": "var(--blue-1)",
				"white-0": "var(--white-0)",
				"grey-0": "var(--grey-0)",
				"grey-1": "var(--grey-1)",
				"grey-2": "var(--grey-2)",
				"dark-0": "var(--dark-0)",
				"dark-1": "var(--dark-1)",
				"dark-2": "var(--dark-2)",
				"dark-3": "var(--dark-3)",
				border: "var(--border)",
			},
			keyframes: {
				underline: {
					"0%": {},
				},
			},
		},
	},
	plugins: [],
};
