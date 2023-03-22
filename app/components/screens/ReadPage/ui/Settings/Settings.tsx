import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useNetInfo } from '@react-native-community/netinfo'
import Slider from '@react-native-community/slider'
import I18n from 'i18n-js'
import React, { memo, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useAddBookToChatMutation } from '../../../../../store/api/book/mutation'
import ChoseColor from './components/ChoseColor'
import ChoseFont from './components/ChoseFont'
import SearchSettings from './components/searchSettings'
import TocSettings from './components/TocSettings'
import { IReadSettings } from './readerTypes'

const Settings = (props: IReadSettings) => {
	const [searchState, setSearchState] = useState(false)
	const [term, setTerm] = React.useState('')
	const {isConnected} = useNetInfo()
	const { navigate } = useTypedNavigation()
	const [addChat] = useAddBookToChatMutation()
	return (
		<>
			<GestureHandlerRootView
				renderToHardwareTextureAndroid={true}
				style={{ flex: props.isVisible ? 1 : 0, zIndex: 11 }}
			>
				<BottomSheetModalProvider>
					<BottomSheet
						handleIndicatorStyle={{ backgroundColor: 'white' }}
						enablePanDownToClose={true}
						onClose={() => props.setIsVisible(false)}
						bottomInset={0}
						backgroundStyle={{
							backgroundColor:
								props.theme.body.background === '#121212' ? '#282828' : '#121212'
						}}
						snapPoints={[90, '50%', '70%']}
						animateOnMount={true}
						backdropComponent={() => <Pressable onPress={() => props.setIsVisible(!props.isVisible)} style={{
							height: props.isVisible ? '100%' : 0
						}}></Pressable>}
					>
						<BottomSheetScrollView
							style={{ padding: 10 }}>
							{!searchState ? (
								<>
									<View className='flex-row justify-between mb-7'>
										<Text className='text-white text-lg'>
											{I18n.t('CharacterProgress')}{' '}
										</Text>
										<Text className='text-white text-lg'>
											{props.currentLocation?.end.displayed.page} {I18n.t('of')}{' '}
											{props.currentLocation?.end.displayed.total} {I18n.t('pages')}
										</Text>
									</View>
									<View className='justify-between w-full items-center flex-row'>
										<MaterialCommunityIcons
											name='format-font-size-decrease'
											size={24}
											color='white'
										/>
										<Slider
											style={{ width: 300, height: 50 }}
											minimumValue={15}
											onValueChange={value => {
												props.changeFontSize(`${value}px`)
												props.setFontSize(value)
											}}
											maximumValue={35}
											thumbTintColor='white'
											step={1}
											value={props.fontSize}
											tapToSeek={true}
											minimumTrackTintColor='#fff'
											maximumTrackTintColor='#fff'
										/>
										<MaterialCommunityIcons
											name='format-font-size-increase'
											size={24}
											color='white'
										/>
									</View>
									
									<ChoseFont
										setFontFamiles={props.setFontFamiles}
										fontFamiles={props.fontFamiles}
										changeFontFamily={props.changeFontFamily}
									/>
									
									<ChoseColor
										theme={props.theme}
										setTheme={props.setTheme}
										changeTheme={props.changeTheme}
									/>
									
									<TocSettings
										toc={props.toc}
										theme={props.theme}
										goToLocation={props.goToLocation}
									/>
								</>
							) : (
								<View>
									<SearchSettings
										searchResults={props.searchResults}
										search={props.search}
										goToLocation={props.goToLocation}
										theme={props.theme}
										term={term}
										setTerm={setTerm}
									/>
								</View>
							)}
						</BottomSheetScrollView>
					</BottomSheet>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
			{props.isVisible ? (
				<View className='absolute w-full h-full'>
					<TouchableOpacity
						style={{
							backgroundColor:
								props.theme.body.background === '#121212' ? 'gray' : '#121212'
						}}
						onPress={() => props.goBack()}
						className='absolute left-3 top-10 p-3 rounded-full bg-blue z-[50]'
					>
						<AntDesign name='arrowleft' size={24} color='white' />
					</TouchableOpacity>
					<View>
						{isConnected ?
						<TouchableOpacity
							style={{
								backgroundColor:
									props.theme.body.background === '#121212' ? 'gray' : '#121212'
							}}
							onPress={async () => {
								await addChat({ id: props.BookId }).then(() =>
									navigate('Chat', { BookId: props.BookId })
								)
							}}
							className='absolute right-16 top-10 p-3 rounded-full bg-blue z-[50]'
						>
							<Ionicons name='chatbubbles-outline' size={24} color='white' />
						</TouchableOpacity> : null
						}
						<TouchableOpacity
							onPress={() => setSearchState(!searchState)}
							style={{
								backgroundColor:
									props.theme.body.background === '#121212' ? 'gray' : '#121212'
							}}
							className='absolute right-3 p-3 rounded-full top-10   z-[50]'
						>
							{searchState ? (
								<Ionicons name='close' size={24} color='white' />
							) : (
								<AntDesign name='search1' size={24} color='white' />
							)}
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</>
	)
}

export default memo(Settings)
