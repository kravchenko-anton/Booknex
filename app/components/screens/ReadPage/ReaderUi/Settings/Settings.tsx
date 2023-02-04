import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { dark, light, sepia } from '../../Theme'
import { IReadSettings } from './types'


const Settings = (props: IReadSettings) => {
	const [searchState, setSearchState] = useState(false)
	const [term, setTerm] = React.useState('')
	return <>
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
				>
					<BottomSheetScrollView style={{ padding: 10 }}>
						{!searchState ? <>
								<View className='flex-row justify-between mb-7'>
									<Text className='text-white text-lg'>Character progress: </Text>
									<Text className='text-white text-lg'>
										{props.currentLocation?.end.displayed.page} of{' '}
										{props.currentLocation?.end.displayed.total} pages
									</Text>
								</View><View className='justify-between w-full items-center flex-row'>
								<MaterialCommunityIcons
									name='format-font-size-decrease'
									size={24}
									color='white' />
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
									maximumTrackTintColor='#fff' />
								<MaterialCommunityIcons
									name='format-font-size-increase'
									size={24}
									color='white' />
							</View><View className='w-full mt-4'>
								<View className={'flex-row gap-3 items-center justify-between'}>
									<TouchableOpacity
										onPress={() => {
											props.changeFontFamily('Arial')
											props.setFontFamiles('Arial')
										}}
										className='items-center  justify-center '
									>
										<Ionicons name='md-text' size={34}
										          style={{ color: props.fontFamiles == 'Arial' ? '#702DF5' : 'white' }} />
										<Text style={{ color: props.fontFamiles == 'Arial' ? '#702DF5' : 'gray' }} className='text-md'>Arial
											Serif</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											props.changeFontFamily('Courier New')
											props.setFontFamiles('Courier New')
										}}
										className='items-center  justify-center '
									>
										<Ionicons name='ios-text-sharp' size={34}
										          style={{ color: props.fontFamiles == 'Courier New' ? '#702DF5' : 'white' }} />
										<Text style={{ color: props.fontFamiles == 'Courier New' ? '#702DF5' : 'gray' }} className='text-md'>Courier
											New</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											props.changeFontFamily('Times New Roman')
											props.setFontFamiles('Times New Roman')
										}}
										className='items-center  justify-center'
									>
										<Ionicons name='ios-text-outline' size={34}
										          style={{ color: props.fontFamiles == 'Times New Roman' ? '#702DF5' : 'white' }} />
										<Text style={{ color: props.fontFamiles == 'Times New Roman' ? '#702DF5' : 'gray' }} className='text-md'>Times
											Roman</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											props.changeFontFamily('"Brush Script MT", cursive')
											props.setFontFamiles('"Brush Script MT", cursive')
										}}
										className='items-center  justify-center '
									>
										<MaterialCommunityIcons name='format-font' size={34}
										                        style={{ color: props.fontFamiles == '"Brush Script MT", cursive' ? '#702DF5' : 'white' }} />
										<Text style={{ color: props.fontFamiles == '"Brush Script MT", cursive' ? '#702DF5' : 'gray' }}
										      className='text-md'>Brush
											Script</Text>
									</TouchableOpacity>
								</View>
							</View><View className='w-full mt-4'>
								<View className={'flex-row gap-3 items-center justify-between'}>
									<TouchableOpacity
										style={{ borderWidth: props.theme.body.background == '#121212' ? 3 : 0 }}
										onPress={() => {
											props.changeTheme(dark)
											props.setTheme(dark)
										}}
										className=' bg-blue p-10   rounded-full border-primary'
									></TouchableOpacity>
									<TouchableOpacity
										style={{ borderWidth: props.theme.body.background == '#fff' ? 3 : 0 }}
										onPress={() => {
											props.changeTheme(light)
											props.setTheme(light)
										}}
										className='bg-white p-10  rounded-full  border-primary'
									></TouchableOpacity>
									<TouchableOpacity
										style={{ borderWidth: props.theme.body.background == '#e8dcb8' ? 3 : 0 }}
										onPress={() => {
											props.changeTheme(sepia)
											props.setTheme(sepia)
										}}
										className='bg-[#e8dcb8] p-10  rounded-full justify-center border-primary items-center '
									></TouchableOpacity>
								</View>
							</View>
								<View className='mt-4 mb-4'>
									<Text className='text-white text-2xl mb-4'>Characters</Text>
									{props.toc.map((toc: { label: string; id: string; href: string }) => (
										<TouchableOpacity
											onPress={() => props.goToLocation(toc.href)}
											key={toc.id}
											style={{
												backgroundColor: props.theme.body.background == '#121212' ? 'gray' : '#1E212C'
											}}
											className='p-0 m-0 min-h-[40px] justify-center  rounded-lg pl-4 mb-2 '
										>
											<Text className='text-white text-md p-0 m-0'>{toc.label}</Text>
										</TouchableOpacity>
									))}
								</View>
							</>
							:
							<View>
								<View className='justify-between flex-row w-full items-center'>
									<TextInput style={{
										backgroundColor: props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
									}}
									
									
									           placeholderTextColor='#fff'
									           className='rounded-md p-3 text-lg w-5/6 text-white font-bold  placeholder-white indent-9'
									           placeholder='Enter a search term'
									           value={term}
									           onChangeText={(text) => setTerm(text)}
									/>
									
									<TouchableOpacity onPress={() => term.length > 5 ? props.search(term) : Toast.show({
										text1: 'Min term length = 5',
										type: 'error'
									})} style={{
										backgroundColor: props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
									}} className=' p-3 rounded-md'>
										<AntDesign name='search1' size={24} color='white' />
									</TouchableOpacity>
								
								</View>
								{term ? props.searchResults.map((item: { cfi: string, excerpt: string }) => <TouchableOpacity
									onPress={() => props.goToLocation(item.cfi)} key={item.cfi} style={{
									backgroundColor: props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
								}} className='mb-4 mt-4 p-4 rounded-md'>
									<Text className='text-white'>{item.excerpt}</Text>
								</TouchableOpacity>) : null}
							</View>}
					</BottomSheetScrollView>
				</BottomSheet>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
		{props.isVisible ? <View className='absolute w-full'>
				<TouchableOpacity style={{
					backgroundColor:
						props.theme.body.background === '#121212' ? 'gray' : '#121212'
				}} onPress={() => props.goBack()} className='absolute left-3 top-10 p-3 rounded-full bg-blue z-[50]'>
					<AntDesign name='arrowleft' size={24} color='white' />
				
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => setSearchState(!searchState)} style={{
					backgroundColor:
						props.theme.body.background === '#121212' ? 'gray' : '#121212'
				}} className='absolute right-3 p-3 rounded-full top-10   z-[50]'>
					{searchState ? <Ionicons name='close' size={24} color='white' /> :
						<AntDesign name='search1' size={24} color='white' />}
				</TouchableOpacity>
			</View>
			: null}
	</>
}

export default Settings