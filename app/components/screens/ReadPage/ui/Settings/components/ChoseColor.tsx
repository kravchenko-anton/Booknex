import { Theme } from '@epubjs-react-native/core'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { dark, light, sepia } from '../../Theme'
import { IChoseColor } from './settingsTypes'

const ChoseColor = (props: IChoseColor) => {
	return (
		<View className='w-full mt-4'>
			<View className={'flex-row gap-3 items-center justify-between'}>
				<TouchableOpacity
					style={{
						borderWidth: props.theme.body.background == '#121212' ? 3 : 0
					}}
					onPress={() => {
						props.changeTheme(dark)
						props.setTheme(dark)
					}}
					className=' bg-blue p-10   rounded-full border-primary'
				></TouchableOpacity>
				<TouchableOpacity
					style={{
						borderWidth: props.theme.body.background == '#fff' ? 3 : 0
					}}
					onPress={() => {
						props.changeTheme(light)
						props.setTheme(light)
					}}
					className='bg-white p-10  rounded-full  border-primary'
				></TouchableOpacity>
				<TouchableOpacity
					style={{
						borderWidth: props.theme.body.background == '#e8dcb8' ? 3 : 0
					}}
					onPress={() => {
						props.changeTheme(sepia)
						props.setTheme(sepia)
					}}
					className='bg-[#e8dcb8] p-10  rounded-full justify-center border-primary items-center '
				></TouchableOpacity>
			</View>
		</View>
	)
}

export default ChoseColor
