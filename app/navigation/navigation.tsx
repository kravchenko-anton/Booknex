import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Auth from '../components/screens/Auth/Auth'
import BottomMenu from '../components/ui/BottomMenu/BottomMenu'
import { LanguageProvider } from '../components/ui/Layout/languageProvider'
import { useTypedSelector } from '../hook/useTypedSelector'
import { TypeRootStackParamList } from './navigationTypes'
import { userRoutes } from './user.routes'

const Navigation = () => {
	const Stack = createNativeStackNavigator<TypeRootStackParamList>()
	const navRef = useNavigationContainerRef()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)
	const { user } = useTypedSelector(state => state.auth)
	useEffect(() => {
		const listener = navRef.addListener('state', () => {
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		})
		
		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])
	return (
		<LanguageProvider>
			<NavigationContainer ref={navRef}>
				<Stack.Navigator
					screenOptions={{
						animation: 'fade_from_bottom',
						headerShown: false,
						contentStyle: { backgroundColor: '#121212' }
					}}
				>
					{user ? (
						userRoutes.map(route => (
							<Stack.Screen name={route.name} key={route.name} component={route.component} />
						))
					) : (
						<Stack.Screen name={'Auth'} component={Auth} />
					)}
				</Stack.Navigator>
				{currentRoute !== 'ReadPage' && user ? (
					<View className='bg-black'>
						<BottomMenu currentRoute={currentRoute} />
					</View>
				) : null}
			</NavigationContainer>
		</LanguageProvider>
	)
}

export default Navigation
