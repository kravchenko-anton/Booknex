import type { Theme } from '@epubjs-react-native/core'

export const light: Theme = {
	body: {
		background: '#fff',
		color: '#000 !important'
	},
	span: {
		color: '#000 !important'
	},
	p: {
		color: '#000 !important'
	},
	li: {
		color: '#000 !important'
	},
	h1: {
		color: '#000 !important'
	},
	a: {
		color: '#000 !important',
		'pointer-events': 'auto',
		cursor: 'pointer'
	},
	'::selection': {
		background: 'lightskyblue'
	}
}

export const sepia: Theme = {
	body: {
		background: '#e8dcb8',
		color: '#333 !important'
	},
	span: {
		color: '#333 !important'
	},
	p: {
		color: '#333 !important'
	},
	li: {
		color: '#333 !important'
	},
	h1: {
		color: '#333 !important'
	},
	a: {
		color: '#333 !important',
		'pointer-events': 'auto',
		cursor: 'pointer'
	},
	'::selection': {
		background: 'lightskyblue'
	}
}

export const dark: Theme = {
	body: {
		background: '#121212',
		color: '#fff !important'
	},

	span: {
		color: '#fff !important'
	},
	p: {
		color: '#fff !important'
	},
	li: {
		color: '#fff !important'
	},
	h1: {
		color: '#fff !important'
	},
	h2: {
		color: '#fff !important'
	},
	h3: {
		color: '#fff !important'
	},
	h4: {
		color: '#fff !important'
	},
	h5: {
		color: '#fff !important'
	},
	h6: {
		color: '#fff !important'
	},
	a: {
		color: '#fff !important',
		'pointer-events': 'auto',
		cursor: 'pointer'
	},
	'::selection': {
		background: '#702DF5'
	}
}
