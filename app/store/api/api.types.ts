export interface BookTypes {
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

export interface Iuser {
	name: string
	photoURL: string
	uid: any
	email: string
	createAt: string
	revieCount: number
	booksCount: number
	userBooks: BookTypes[]
	favoritesBook: BookTypes[]
	favoritesUser: Iuser[]
}

export interface Comment {
	rating: number
	BookId: string
	create_At: string
	message: string
	user: {
		id: string
		photoUrl: string
		email: string
		name: string
	}
}


