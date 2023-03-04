export interface BookTypes {
	AutorUid: string
	Name: string
	id: any
	Image: string
	antalSider: number
	autor: string[]
	bookLanguage: string
	comments: Comment[]
	description: string
	epubDoc: string
	genre: string[]
	penData: string
}
export interface iBookwithRating extends BookTypes {
	key: any
	rating: number
}
export interface Iuser {
	name: string
	photoURL: string
	uid: any
	email: string
	createAt: string
	revieCount: number
	booksCount: number
	favoritesBook: string[] // more id...
	favoritesUser: Iuser[]
	startReadBook: string[]
	finishedBook: string[]
}

export interface Comment {
	rating: number
	BookId: string
	create_At: string
	message: string
	userUid: string | number
}
