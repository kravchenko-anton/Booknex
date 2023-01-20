import {TypeRootStackParamList} from "./navigationTypes";


export interface IMenuItem {
	iconName: string
	path: keyof TypeRootStackParamList
}

export const menuItems: IMenuItem[] = [
	{
		iconName: 'compass',
		path: 'Home'
	},
	{
		iconName: 'search',
		path: "Search"
	},
	{
		iconName: 'shopping-cart',
		path: "Cart"
	},
	{
		iconName: 'heart',
		path: "Favorites"
	},


]