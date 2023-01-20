import {ComponentType} from "react";

export type TypeRootStackParamList = {
	Favorites: undefined
	Catalog: undefined
	Home: undefined
	Cart: undefined
	Search: undefined
	Product: {
		id: number | string
	}
	
}

export interface iRoutes {
	name: keyof TypeRootStackParamList
	component: ComponentType
}