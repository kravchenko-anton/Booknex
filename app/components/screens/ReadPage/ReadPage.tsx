import { Reader, ReaderProvider } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRef, useState } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import { dark, light, sepia } from './Theme'

const ReadPage = ({ route }: any) => {
	const { epub, LastReadPage } = route.params
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
	const [TotalLocation, setTotalLocation] = useState(0)
	const bottomSheetModalRef = useRef(null)
	return <SafeAreaProvider>
		<SafeAreaView>
			
			<ReaderProvider>
				<Reader
					initialLocation={LastReadPage}
					src={epub + '.epub'}
					fileSystem={useFileSystem}
					width={width}
					onNavigationLoaded={toc => {
						// console.log(toc.toc)
					}}
					onLocationChange={async (totalLocations, currentLocation) => {
						// @ts-ignore, end exist and current work but library types not know about it
						await AsyncStorage.setItem(epub, currentLocation.end.cfi)
						// @ts-ignore
						setTotalLocation(currentLocation.end.percentage)
					}}
					renderLoadingFileComponent={() => <Loader />}
					enableSwipe={true}
					defaultTheme={theme}
					height={height}
				
				/>
			</ReaderProvider>
		</SafeAreaView>
		
		
		<ModalPopup height={150} isVisible={isVisible} setIsVisible={setIsVisible} title={'Settings '}>
			<View className='flex-row justify-between items-center'>
				<Text onPress={() => console.log('10px')} className='font-bold text-xl text-blue'>Color scheme:</Text>
				<View className={'flex-row flex-wrap items-center'}>
					<Pressable style={{ borderWidth: (theme == dark ? 3 : 0) }} onPress={() => setTheme(dark)}
					           className='bg-blue p-3 mr-3 rounded-lg border-primary'>
						<Text className='text-white text-xl font-bold'>Dark</Text>
					</Pressable>
					<Pressable style={{ borderWidth: (theme == light ? 3 : 0) }} onPress={() => setTheme(light)}
					           className='bg-whiteBlue p-3 mr-3 rounded-lg border-primary'>
						<Text className='text-black text-xl font-bold'>Light</Text>
					</Pressable>
					<Pressable style={{ borderWidth: (theme == sepia ? 3 : 0) }} onPress={() => setTheme(sepia)}
					           className='bg-[#e8dcb8] p-3  justify-center border-primary items-center rounded-lg'>
						<Text className='text-blue text-xl font-bold'>Sepia</Text>
					</Pressable>
				</View>
			</View>
		</ModalPopup>
		<View className='flex-row justify-between items-center'>
			<Pressable onPress={() => setIsVisible(true)}
			           className='bottom-0 z-50 bg-blue left-0 absolute p-1 rounded-tr-lg'>
				<Feather name='settings'
				         size={16}
				         color='white' /></Pressable>
			<Text
				className='bottom-0 right-0 z-50 absolute p-1 text-gray text-md'>{TotalLocation.toString().charAt(0)}%</Text>
		</View>
	</SafeAreaProvider>
}

export default ReadPage
