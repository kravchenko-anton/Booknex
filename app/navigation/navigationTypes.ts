import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Favorite: undefined
	Home: undefined
	Search: undefined
	BookPage: {
		id: number | string
	}
	Auth: undefined
	UserProfile: undefined
	Settings: undefined
	AutorProfile: {
		uid: string | number
	}
	ReadPage: {
		epub: string | number
	}
	
}

export interface iRoutes {
	name: keyof TypeRootStackParamList
	component: ComponentType
}