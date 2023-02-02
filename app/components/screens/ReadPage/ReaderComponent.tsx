import { Reader, useReader } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import { dark, light, sepia } from './Theme'

const ReaderComponent = (props: { LastReadPage: string, epub: string }) => {
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
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
		<SafeAreaView>
			<StatusBar hidden={false} style={(theme === dark ? 'inverted' : 'dark')}
				// @ts-ignore
				          backgroundColor={theme === light && 'white' || theme === dark && '#121212' || (theme === sepia && '#e8dcb8')} />
			<Reader
				initialLocation={props.LastReadPage}
				src={props.epub + '.epub'}
				fileSystem={useFileSystem}
				onPress={() => {
					console.log(currentLocation, 'для главы', progress, totalLocations)
				}}
				width={width}
				onNavigationLoaded={toc => {
					// console.log(toc.toc)
				}}
				onLocationChange={async (totalLocations, currentLocation) => {
					// @ts-ignore, end exist and current work but library types not know about it
					await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
				}}
				onDoublePress={() => setIsVisible(!isVisible)}
				renderLoadingFileComponent={() => <Loader />}
				enableSwipe={true}
				defaultTheme={theme}
				height={height}
			
			/>
			
			
			<ModalPopup height={150} isVisible={isVisible} setIsVisible={setIsVisible} title={'Settings'}>
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
				
				<Text
					className='bottom-0 right-1  z-50 absolute p-1 text-gray text-md'>{progress && totalLocations ? progress + ' / ' + totalLocations : 'Consider pages...'}</Text>
			</View>
		</SafeAreaView>
	</SafeAreaProvider>
}

export default ReaderComponent