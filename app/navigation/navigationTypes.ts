import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Favorite: undefined
	Home: undefined
	Search: undefined
	BookPage: {
		id?: number | string
		uid?: number | string
	}
	
	Chat: {
	BookId: number | string
	}
	
	Auth: undefined
	UserProfile: undefined

	AutorProfile: {
		uid: string | number
	}
	ReadPage: {
		epub: string | number
		LastReadPage: string | number
		BookId: string | number
	}
}

export interface iRoutes {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
