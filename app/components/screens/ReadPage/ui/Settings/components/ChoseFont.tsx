import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { IChoseFont } from './settingsTypes'

const ChoseFont = (props: IChoseFont) => {
	return (
		<View className='w-full mt-5'>
			<View className={'flex-row gap-3 items-center justify-between'}>
				<TouchableOpacity
					onPress={() => {
						props.changeFontFamily('Arial')
						props.setFontFamiles('Arial')
					}}
					className='items-center  justify-center '
				>
					<Ionicons
						name='md-text'
						size={34}
						style={{
							color: props.fontFamiles == 'Arial' ? '#702DF5' : 'white'
						}}
					/>
					<Text
						style={{
							color: props.fontFamiles == 'Arial' ? '#702DF5' : 'gray'
						}}
						className='text-md'
					>
						Arial Serif
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.changeFontFamily('Courier New')
						props.setFontFamiles('Courier New')
					}}
					className='items-center  justify-center '
				>
					<Ionicons
						name='ios-text-sharp'
						size={34}
						style={{
							color: props.fontFamiles == 'Courier New' ? '#702DF5' : 'white'
						}}
					/>
					<Text
						style={{
							color: props.fontFamiles == 'Courier New' ? '#702DF5' : 'gray'
						}}
						className='text-md'
					>
						Courier New
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.changeFontFamily('Times New Roman')
						props.setFontFamiles('Times New Roman')
					}}
					className='items-center  justify-center'
				>
					<Ionicons
						name='ios-text-outline'
						size={34}
						style={{
							color: props.fontFamiles == 'Times New Roman' ? '#702DF5' : 'white'
						}}
					/>
					<Text
						style={{
							color: props.fontFamiles == 'Times New Roman' ? '#702DF5' : 'gray'
						}}
						className='text-md'
					>
						Times Roman
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						props.changeFontFamily('"Brush Script MT", cursive')
						props.setFontFamiles('"Brush Script MT", cursive')
					}}
					className='items-center  justify-center '
				>
					<MaterialCommunityIcons
						name='format-font'
						size={34}
						style={{
							color:
								props.fontFamiles == '"Brush Script MT", cursive' ? '#702DF5' : 'white'
						}}
					/>
					<Text
						style={{
							color:
								props.fontFamiles == '"Brush Script MT", cursive' ? '#702DF5' : 'gray'
						}}
						className='text-md'
					>
						Brush Script
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ChoseFont
