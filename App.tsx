import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './app/components/ui/Loader'
import Toast from './app/components/ui/Toastr'
import Navigation from './app/navigation/navigation'
import { persistor, store } from './app/store/store'
import 'react-native-gesture-handler'
export default function App() {
	LogBox.ignoreLogs(['Remote debugger'])
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<Loader />}>
				<SafeAreaProvider>
					<Navigation />
					<StatusBar style='light' />
					<Toast />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	
	)
}


