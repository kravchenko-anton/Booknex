import { Reader, useReader } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../ui/Loader'
import { dark, light, sepia } from './Theme'

const ReaderComponent = (props: { LastReadPage: string, epub: string }) => {
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
	const [toc, setToc] = useState(null)
	const {
		changeFontSize,
		currentLocation,
		getLocations,
		searchResults,
		search,
		goToLocation,
		changeFontFamily,
		progress,
		totalLocations
	} = useReader()
	if (!props) return <Loader />
	
	return <SafeAreaProvider>
		<StatusBar hidden={false} style={(theme === dark ? 'light' : 'dark')}
			// @ts-ignore
			          backgroundColor={theme === light && 'white' || theme === dark && '#121212' || (theme === sepia && '#e8dcb8')} />
		<View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
			<SafeAreaView>
				
				<Reader
					initialLocation={props.LastReadPage}
					src={props.epub + '.epub'}
					fileSystem={useFileSystem}
					onPress={() => {
						changeFontFamily('Arial')
						console.log(currentLocation, 'для главы', progress, totalLocations)
					}}
					width={width}
					onNavigationLoaded={toc => {
						setToc(toc.toc)
					}}
					onLocationChange={async (totalLocations, currentLocation) => {
						// @ts-ignore, end exist and current work but library types not know about it
						await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
					}}
					onDoublePress={() => setIsVisible(!isVisible)}
					renderLoadingFileComponent={() => <Loader
						style={{ left: '-50%', top: '-50%', transform: [{ translateY: height / 2 }, { translateX: width / 2 }] }} />}
					enableSwipe={true}
					defaultTheme={theme}
					height={height}
				/>
			</SafeAreaView>
		</View>
		
		<GestureHandlerRootView renderToHardwareTextureAndroid={true}
		                        style={{ flex: (isVisible ? 1 : 0), zIndex: 11 }}>
			<BottomSheetModalProvider>
				<BottomSheet handleIndicatorStyle={{ backgroundColor: 'white' }}
				             enablePanDownToClose={true}
				             onClose={() => setIsVisible(false)}
				             bottomInset={0}
				             backgroundStyle={{ backgroundColor: theme === dark ? '#282828' : '#121212' }}
				             snapPoints={[90, '50%', '90%']}>
					<BottomSheetView style={{ padding: 10 }}>
						
						<View className='flex-row justify-between mb-7'>
							<Text className='text-white text-lg'>Charapter 4</Text>
							<Text className='text-white text-lg'>more 58 p.</Text>
						</View>
						
						<View className='w-full mb-5'>
							<View className={'flex-row gap-3 items-center justify-between'}>
								<TouchableOpacity style={{ borderWidth: (theme == dark ? 3 : 0) }} onPress={() => setTheme(dark)}
								                  className=' bg-blue p-3 pr-7 pl-7 rounded-3xl border-primary'>
									<Text className='text-white text-xl font-bold'>Black</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderWidth: (theme == light ? 3 : 0) }} onPress={() => setTheme(light)}
								                  className='bg-white p-3 pr-7 pl-7 rounded-3xl border-primary'>
									<Text className='text-black text-xl font-bold'>Light</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderWidth: (theme == sepia ? 3 : 0) }} onPress={() => setTheme(sepia)}
								                  className='bg-[#e8dcb8] p-3 pr-7 pl-7   justify-center border-primary items-center rounded-3xl'>
									<Text className='text-blue text-xl font-bold'>Sepia</Text>
								</TouchableOpacity>
							</View>
						</View>
						
						<View className='flex-row justify-center gap-5'>
							<TouchableOpacity className='bg-white p-3 rounded-full'>
								<MaterialCommunityIcons onPress={() => changeFontSize('25px')}
								                        name='format-font-size-decrease'
								                        size={24} color='black' />
							</TouchableOpacity>
							<TouchableOpacity className='bg-white p-3 rounded-full'>
								<MaterialCommunityIcons name='format-font-size-increase' size={24} color='black' />
							</TouchableOpacity>
						</View>
					</BottomSheetView>
				</BottomSheet>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
		<Text
			className='bottom-0 right-1 z-[10] absolute p-1 text-gray text-md'>{progress && totalLocations ? progress + ' / ' + totalLocations : 'Consider pages...'}</Text>
	
	</SafeAreaProvider>
}

export default ReaderComponent
