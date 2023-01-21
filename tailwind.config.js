/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			primary: '#702DF5',
			gray: '#949494',
			black: '#121212',
			white: '#fff',
			whiteGray: '#F7F6F6',
			whiteBlue: '#E3F2FB',
			blue: '#1E212C',
			transparent: colors.transparent
		}
		
	},
	plugins: []
}
