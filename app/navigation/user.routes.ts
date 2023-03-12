import Auth from '../components/screens/Auth/Auth'
import AutorProfile from '../components/screens/AutorProfile/AutorProfile'
import BookChat from '../components/screens/Chat/BookChat'
import Home from '../components/screens/Home/Home'
import ReadPage from '../components/screens/ReadPage/ReadPage'
import Search from '../components/screens/Search/Search'
import SingleBookPage from '../components/screens/SingleBookPage/SingleBookPage'
import LanguageSettings from '../components/screens/userProfile/Settings/LanguageSettings'
import PasswordChange from '../components/screens/userProfile/Settings/PasswordSettings'
import Settings from '../components/screens/userProfile/Settings/Settings'
import UserSettings from '../components/screens/userProfile/Settings/UserSettings'
import userProfile from '../components/screens/userProfile/userProfile'
import NoInternet from '../components/ui/noInternet'
import { iRoutes } from './navigationTypes'

export const userRoutes: iRoutes[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Chat',
		component: BookChat
	},
	{
		name: 'NoInternet',
		component: NoInternet
	},
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'LanguageSettings',
		component: LanguageSettings
	},
	{
		name: 'PasswordSettings',
		component: PasswordChange
	},
	{
		name: 'UserSettings',
		component: UserSettings
	},
	{
		name: 'AutorProfile',
		component: AutorProfile
	},
	{
		name: 'ReadPage',
		component: ReadPage
	},
	{
		name: 'UserProfile',
		component: userProfile
	},
	{
		name: 'Auth',
		component: Auth
	},
	
	{
		name: 'BookPage',
		component: SingleBookPage
	},
	
	{
		name: 'Search',
		component: Search
	}
]
