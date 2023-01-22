
import { Feather, FontAwesome } from '@expo/vector-icons'
// @ts-ignore
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import { useLayoutEffect, useState } from 'react'
import {  Pressable, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import { dark, light, sepia } from './Theme'
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core'
import 'react-native-gesture-handler'
const ReadPage = ({ route }:any) => {
	const { epub } = route.params
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
	return <SafeAreaProvider>
		<SafeAreaView>
	
			
			<ReaderProvider>
				<Reader
					src={epub}
					fileSystem={useFileSystem}
					width={width}
					renderLoadingFileComponent={() => <Loader/>}
					enableSelection={true}
					enableSwipe={true}
					defaultTheme={theme}
					height={height}
				/>
			</ReaderProvider>
				<ModalPopup height={200} isVisible={isVisible} setIsVisible={setIsVisible} title={'Settings '}>
					<View className='flex-row justify-between items-center'>
						<Text onPress={() => console.log('10px')} className='font-bold text-xl text-blue'>Color scheme:</Text>
						<View className={'flex-row flex-wrap items-center'}>
								<Pressable style={{borderWidth: (theme == dark ? 3 : 0)}} onPress={() => setTheme(dark)} className='bg-blue p-3 mr-3 rounded-lg border-primary'>
								<Text className='text-white text-xl font-bold'>Dark</Text>
							</Pressable>
							<Pressable  style={{borderWidth: (theme == light ? 3 : 0)}} onPress={() => setTheme(light)} className='bg-whiteBlue p-3 mr-3 rounded-lg border-primary'>
								<Text className='text-black text-xl font-bold'>Light</Text>
							</Pressable>
							<Pressable  style={{borderWidth: (theme == sepia ? 3 : 0)}} onPress={() => setTheme(sepia)} className='bg-[#e8dcb8] p-3  justify-center border-primary items-center rounded-lg' >
								<Text className='text-blue text-xl font-bold'>Sepia</Text>
							</Pressable>
						</View>
					</View>
					
					
					<Text className='text-xd font-bold text-primary mt-2'>Developer dont do any for comfort usage, wait updates, im sory. (any orther library not work in expo) 😥</Text>
					
					{/*<View className='flex-row mt-2 justify-between items-center'>*/}
					{/*	<Text className='font-bold text-xl text-blue'>Font:</Text>*/}
					{/*	<View className={'flex-row flex-wrap items-end'}>*/}
					{/*		<Pressable onPress={() => console.log(16)} className='bg-[#949494] p-3 mr-3 justify-center items-center rounded-lg'>*/}
					{/*		*/}
					{/*		<FontAwesome name="font" size={18} color="white" />*/}
					{/*		</Pressable>*/}
					{/*		*/}
					{/*		<Pressable  onPress={() => console.log("26px")} className='bg-[#1E212C] p-3  mr-3  justify-center items-center rounded-lg'>*/}
					{/*			*/}
					{/*			<FontAwesome name="font" size={26} color="white" />*/}
					{/*		</Pressable>*/}
					{/*		<Pressable onPress={() => console.log("36px")} className='bg-[#121212] p-3 justify-center items-center rounded-lg'>*/}
					{/*			*/}
					{/*			<FontAwesome name="font" size={36} color="white" />*/}
					{/*		</Pressable>*/}
					{/*	</View>*/}
					{/*</View>*/}
				</ModalPopup>
			
			<Pressable onPress={() => setIsVisible(true)}
			           className='bottom-0 z-50 bg-blue left-0 absolute p-1 rounded-tr-lg'>
				<Feather name='settings'
				         size={16}
				         color='white' /></Pressable>
		</SafeAreaView>
	</SafeAreaProvider>
}

export default ReadPage
