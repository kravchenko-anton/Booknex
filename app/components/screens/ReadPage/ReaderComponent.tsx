import { Reader, useReader } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import {
	useAddBookToEndedBookMutation,
	useAddBookToStartReadingMutation
} from '../../../store/api/book/mutation'
import Loader from '../../ui/Loader'
import Settings from './ReaderUi/Settings/Settings'
import { light } from './Theme'
const ReaderComponent = (props: {
	LastReadPage: string
	epub: string
	BookId: string | number
}) => {
	const { width, height } = useWindowDimensions()
	const [theme, setTheme] = useState(light)
	const [isVisible, setIsVisible] = useState(false)
	const [toc, setToc] = useState([])
	const { user } = useTypedSelector(state => state.auth)
	const { goBack, navigate } = useTypedNavigation()
	const [fontSize, setFontSize] = useState(0)
	const [LoadingfontSize, setLoadingFontSize] = useState(0)
	const [fontFamiles, setFontFamiles] = useState('Arial')
	const [startBookMutation] = useAddBookToStartReadingMutation()
	const [EndBookMutation] = useAddBookToEndedBookMutation()
	const {
		changeFontSize,
		currentLocation,
		searchResults,
		search,
		goToLocation,
		changeFontFamily,
		changeTheme
	} = useReader()
	if (!props) return <Loader />
	useLayoutEffect(() => {
		const parseLastPage = async () => {
			try {
				const value = await AsyncStorage.getItem(props.epub + 'font')
				const themes = await AsyncStorage.getItem(props.epub + 'theme')
				const fontfamily = await AsyncStorage.getItem(props.epub + 'fontFamily')
				if (themes && value && fontfamily != null) {
					setTheme(JSON.parse(themes))
					setLoadingFontSize(Number(value))
					setFontFamiles(fontfamily ? fontfamily : 'Arial')
				}
			} catch (e) {
				console.log(e)
			}
		}
		parseLastPage()
	}, [])

	return (
		<SafeAreaProvider>
			<StatusBar
				hidden={false}
				style={theme.body.background === '#121212' ? 'light' : 'dark'}
				// @ts-ignore, its unreal fix
				backgroundColor={
					theme.body.background === '#fff'
						? '#fff'
						: theme.body.background === '#121212'
						? '#121212'
						: theme.body.background === '#e8dcb8'
						? '#e8dcb8'
						: '#fff'
				}
			/>
			<View
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<SafeAreaView>
					<Reader
						initialLocation={props.LastReadPage}
						src={props.epub + '.epub'}
						renderOpeningBookComponent={() => (
							<Loader
								style={{
									backgroundColor:
										theme.body.background === '#fff'
											? '#fff'
											: theme.body.background === '#121212'
											? '#121212'
											: theme.body.background === '#e8dcb8'
											? '#e8dcb8'
											: '#fff',
									height: height,
									width: width
								}}
							/>
						)}
						fileSystem={useFileSystem}
						onStarted={async () => {
							if (!props.LastReadPage) {
								await startBookMutation({
									currentUserUID: user?.uid,
									book: { id: props.BookId }
								})
							}
						}}
						onFinish={async () => {
							await EndBookMutation({
								currentUserUID: user?.uid,
								book: { id: props.BookId }
							})
							await AsyncStorage.removeItem(props.epub)
							navigate('Home')
						}}
						width={width}
						onNavigationLoaded={toc => {
							setToc(toc.toc)
							setFontSize(LoadingfontSize)
							changeTheme(theme)
							changeFontFamily(fontFamiles)
						}}
						onDoublePress={() => setIsVisible(!isVisible)}
						onSwipeLeft={async () => {
							// @ts-ignore
							await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
							await AsyncStorage.setItem(props.epub + 'font', fontSize.toString())
							await AsyncStorage.setItem(props.epub + 'theme', JSON.stringify(theme))
							await AsyncStorage.setItem(props.epub + 'fontFamily', fontFamiles)
						}}
						onSwipeRight={async () => {
							// @ts-ignore
							await AsyncStorage.setItem(props.epub, currentLocation.end.cfi)
							await AsyncStorage.setItem(props.epub + 'font', fontSize.toString())
							await AsyncStorage.setItem(props.epub + 'theme', JSON.stringify(theme))
							await AsyncStorage.setItem(props.epub + 'fontFamily', fontFamiles)
						}}
						renderLoadingFileComponent={() => (
							<Loader
								style={{
									backgroundColor:
										theme.body.background === '#fff'
											? '#fff'
											: theme.body.background === '#121212'
											? '#121212'
											: theme.body.background === '#e8dcb8'
											? '#e8dcb8'
											: '#fff',
									height: height,
									width: width
								}}
							/>
						)}
						enableSwipe={true}
						height={height}
					/>
				</SafeAreaView>
			</View>
			<Settings
				BookId={props.BookId}
				toc={toc}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				search={search}
				goBack={goBack}
				searchResults={searchResults}
				changeTheme={changeTheme}
				setTheme={setTheme}
				theme={theme}
				currentLocation={currentLocation}
				goToLocation={goToLocation}
				changeFontSize={changeFontSize}
				changeFontFamily={changeFontFamily}
				fontFamiles={fontFamiles}
				fontSize={fontSize}
				setFontFamiles={setFontFamiles}
				setFontSize={setFontSize}
			/>
			<Text className='bottom-0 right-1 z-[10] absolute p-1 text-gray text-md'>
				{currentLocation?.end.percentage
					? (currentLocation.end.percentage * 100).toString().slice(0, 4) + '%'
					: 'Consider pages...'}
			</Text>
		</SafeAreaProvider>
	)
}

export default ReaderComponent
