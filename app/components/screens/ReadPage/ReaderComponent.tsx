import { Reader, useReader } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Slider from '@react-native-community/slider'
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Animated, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../ui/Loader'
import { dark, light, sepia } from './Theme'

const ReaderComponent = (props: { LastReadPage: string, epub: string }) => {
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
	const [toc, setToc] = useState([])
	const [fontSize, setFontSize] = useState(0)
	const [LoadingfontSize, setLoadingFontSize] = useState(0)
	const scrollX = useRef(new Animated.Value(0)).current
	const itemSize = 200
	const itemSpacing = 10
	const {
		changeFontSize,
		currentLocation,
		searchResults,
		search,
		goToLocation,
		changeFontFamily,
		changeTheme,
		totalLocations
	} = useReader()
	if (!props) return <Loader />
	useLayoutEffect(() => {
		const parseLastPage = async () => {
			try {
				const value = await AsyncStorage.getItem(props.epub + 'font')
				const themes = await AsyncStorage.getItem(props.epub + 'theme')
				if (value || themes !== null) {
					setLoadingFontSize(Number(value))
					// @ts-ignore
					setTheme(JSON.parse(themes))
				}
			} catch (e) {
				console.log(e)
			}
		}
		parseLastPage()
	}, [])
	return <SafeAreaProvider>
		<StatusBar hidden={false} style={(theme.body.background === '#121212' ? 'light' : 'dark')}
			// @ts-ignore
			          backgroundColor={theme.body.background === '#fff' && '#fff' || theme.body.background === '#121212' && '#121212' || (theme.body.background === '#e8dcb8' && '#e8dcb8')} />
		<View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
			<SafeAreaView>
				
				<Reader
					initialLocation={props.LastReadPage}
					src={props.epub + '.epub'}
					fileSystem={useFileSystem}
					width={width}
					onNavigationLoaded={toc => {
						setToc(toc.toc)
						setFontSize(LoadingfontSize)
						changeTheme(theme)
					}}
					onDoublePress={() => setIsVisible(!isVisible)}
					onSwipeLeft={async () => {
						// @ts-ignore
						await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
						await AsyncStorage.setItem(props.epub + 'font', fontSize.toString())
						await AsyncStorage.setItem(props.epub + 'theme', JSON.stringify(theme))
						
					}}
					onSwipeRight={async () => {
						// @ts-ignore
						await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
						await AsyncStorage.setItem(props.epub + 'font', fontSize.toString())
						await AsyncStorage.setItem(props.epub + 'theme', JSON.stringify(theme))
					}}
					renderLoadingFileComponent={() => <Loader
						style={{ left: '-50%', top: '-50%', transform: [{ translateY: height / 2 }, { translateX: width / 2 }] }} />}
					enableSwipe={true}
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
				             backgroundStyle={{ backgroundColor: theme.body.background === '#121212' ? '#282828' : '#121212' }}
				             snapPoints={[90, '50%', '90%']}>
					<BottomSheetScrollView style={{ padding: 10 }}>
						
						<View className='flex-row justify-between mb-7'>
							<Text className='text-white text-lg'>Character progress: </Text>
							<Text
								className='text-white text-lg'>{currentLocation?.end.displayed.page} of {currentLocation?.end.displayed.total} pages</Text>
						</View>
						
						<View className='justify-between w-full items-center flex-row'>
							<MaterialCommunityIcons name='format-font-size-decrease' size={24} color='white' />
							<Slider
								style={{ width: 300, height: 50 }}
								minimumValue={15}
								onValueChange={(value) => {
									changeFontSize(`${value}px`)
									setFontSize(value)
								}}
								maximumValue={35}
								thumbTintColor='white'
								step={1}
								value={fontSize}
								tapToSeek={true}
								minimumTrackTintColor='#fff'
								maximumTrackTintColor='#fff'
							/>
							<MaterialCommunityIcons name='format-font-size-increase' size={24} color='white' />
						</View>
						{/*<FlatList*/}
						{/*	keyExtractor={(i) => i.toString()}*/}
						{/*	snapToInterval={itemSize}*/}
						{/*	bounces={false}*/}
						{/*	showsHorizontalScrollIndicator={false}*/}
						{/*	contentContainerStyle={{ paddingHorizontal: itemSpacing }}*/}
						{/*	data={['1', '2', '3 ']}*/}
						{/*	onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}*/}
						{/*	horizontal={true}*/}
						{/*	renderItem={({ item, index }) => {*/}
						{/*		const inputRange = [*/}
						{/*			(index - 1) * itemSize,*/}
						{/*			index * itemSize,*/}
						{/*			(index + 2) * itemSize*/}
						{/*		]*/}
						{/*		*/}
						{/*		const opacity = scrollX.interpolate({ inputRange, outputRange: [.4, 1, .4] })*/}
						{/*		const scale = scrollX.interpolate({ inputRange, outputRange: [.7, 1, .7] })*/}
						{/*		*/}
						{/*		return <Animated.View key={item} style={{*/}
						{/*			width: itemSize, opacity, transform: [{ scale }], marginHorizontal: itemSpacing,*/}
						{/*			alignItems: 'center'*/}
						{/*		}}>*/}
						{/*			<Text className='text-2xl text-white'>{item}</Text>*/}
						{/*		</Animated.View>*/}
						{/*	}} />*/}
						
						<View className='w-full mt-4'>
							<View className={'flex-row gap-3 items-center justify-between'}>
								<TouchableOpacity style={{ borderWidth: (theme.body.background == '#121212' ? 3 : 0) }} onPress={() => {
									changeTheme(dark)
									setTheme(dark)
								}}
								                  className=' bg-blue p-3 pr-7 pl-7 rounded-3xl border-primary'>
									<Text className='text-white text-xl font-bold'>Black</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderWidth: (theme.body.background == '#fff' ? 3 : 0) }} onPress={() => {
									changeTheme(light)
									setTheme(light)
								}}
								                  className='bg-white p-3 pr-7 pl-7 rounded-3xl border-primary'>
									<Text className='text-black text-xl font-bold'>Light</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderWidth: (theme.body.background == '#e8dcb8' ? 3 : 0) }} onPress={() => {
									changeTheme(sepia)
									setTheme(sepia)
								}}
								                  className='bg-[#e8dcb8] p-3 pr-7 pl-7   justify-center border-primary items-center rounded-3xl'>
									<Text className='text-blue text-xl font-bold'>Sepia</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View className='mt-4 mb-4'>
							<Text className='text-white text-2xl mb-4'>Characters</Text>
							{toc.map((toc: { label: string, id: string, href: string }) => (
								<TouchableOpacity onPress={() => goToLocation(toc.href)} key={toc.id}
								                  style={{ backgroundColor: theme.body.background == '#121212' ? 'gray' : '#1E212C' }}
								                  className='p-0 m-0 min-h-[40px] justify-center  rounded-lg pl-4 mb-2 '>
									<Text className='text-white text-md p-0 m-0'>{toc.label}</Text>
								</TouchableOpacity>
							))}
						</View>
					</BottomSheetScrollView>
				</BottomSheet>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
		<Text
			className='bottom-0 right-1 z-[10] absolute p-1 text-gray text-md'>{currentLocation?.end.percentage ? currentLocation.end.percentage.toString().slice(0, 4) : 'Consider pages...'}</Text>
	
	</SafeAreaProvider>
}

export default ReaderComponent
