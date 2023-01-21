import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import Auth from '../components/screens/Auth/Auth'
import BottomMenu from '../components/ui/BottomMenu/BottomMenu'
import { useTypedSelector } from '../hook/useTypedSelector'
import { TypeRootStackParamList } from './navigationTypes'
import { userRoutes } from './user.routes'

const Navigation = () => {
	const Stack = createNativeStackNavigator<TypeRootStackParamList>()
	const navRef = useNavigationContainerRef()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)
	const { user } = useTypedSelector(state => state.auth)
	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)
		const listener = navRef.addListener('state', () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)
		
		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])
	
	return <>
		<NavigationContainer ref={navRef}>
			<Stack.Navigator screenOptions={{
				animation: 'fade_from_bottom',
				headerShown: false,
				contentStyle: { backgroundColor: '#121212' }
			}}>
				
				{user ? userRoutes.map(route => <Stack.Screen name={route.name} key={route.name}
				                                              component={route.component} />) :
					<Stack.Screen name={'Auth'} component={Auth} />}
			</Stack.Navigator>
			{(currentRoute !== 'ReadPage') && user ?
				<BottomMenu currentRoute={currentRoute} /> : null}
		</NavigationContainer>
	
	</>
}

export default Navigation