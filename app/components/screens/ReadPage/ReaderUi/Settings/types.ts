import { Location, SearchResult, Theme } from '@epubjs-react-native/core'
import React from 'react'

export interface IReadSettings {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	theme: Theme
	currentLocation: Location | null
	changeFontSize: (size: string) => void
	setFontSize: React.Dispatch<React.SetStateAction<number>>
	fontSize: number
	changeFontFamily: (fontFamily: string) => void
	setFontFamiles: React.Dispatch<React.SetStateAction<string>>
	fontFamiles: string
	setTheme: React.Dispatch<React.SetStateAction<Theme>>
	changeTheme: (theme: Theme) => void
	goToLocation: (cfi: string) => void
	toc: any
	search: (query: string) => void
	searchResults: SearchResult[]

	goBack(): void
}
