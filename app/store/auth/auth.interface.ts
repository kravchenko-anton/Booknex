export interface IAuthData {
	user: {
		email: string
		uid: string
	} | null
}

export interface IAuthInitialState extends IAuthData {
	isLoading: boolean
}

export interface IAuthFields {
	email: string
	password: string
}

