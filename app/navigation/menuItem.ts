import { TypeRootStackParamList } from './navigationTypes'

export interface IMenuItem {
	iconName: string
	path: keyof TypeRootStackParamList
}

export const menuItems: IMenuItem[] = [
	{
		iconName: 'home',
		path: 'Home'
	},
	{
		iconName: 'search',
		path: 'Search'
	},
	{
		iconName: 'heart',
		path: 'Favorite'
	},
	{
		iconName: 'user',
		path: 'UserProfile'
	}
]
