import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import BottomMenu from "../components/ui/BottomMenu/BottomMenu";
import {TypeRootStackParamList} from "./navigationTypes";
import {userRoutes} from "./user.routes";

const Navigation = () => {
	const Stack = createNativeStackNavigator<TypeRootStackParamList>()
	const navRef = useNavigationContainerRef()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)
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
				animation: 'flip',
				headerShown: false,
				contentStyle: {backgroundColor: '#F5F6F8'}
			}}>
				{userRoutes.map(route => <Stack.Screen name={route.name} key={route.name} component={route.component}/>)}
			</Stack.Navigator>
			{(currentRoute !== 'Product' && currentRoute !== 'Cart') &&
				<BottomMenu currentRoute={currentRoute}/>}
		</NavigationContainer>
	
	</>
}

export default Navigation