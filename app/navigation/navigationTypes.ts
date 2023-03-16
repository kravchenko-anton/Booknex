import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Home: undefined
	Search: undefined
	NoInternet: undefined
	
	BookPage: {
		id?: number | string
		uid?: number | string
	}
	
	Chat: {
		BookId: number | string
	}
	Settings: {
		uid: string | number
	}
	
	UserSettings: {
		uid: string | number
	}
	PasswordSettings: {
		uid: string | number
	}
	LanguageSettings: {
		uid: string | number
	}
	Auth: undefined
	UserProfile: undefined
	
	AutorProfile: {
		uid: string | number
	}
	ReadPage: {
		epub: string | number
		LastReadPage: string | number
		BookId: string | number,
		bookName: string
	}
}

export interface iRoutes {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
