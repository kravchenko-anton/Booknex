import { Theme } from '@epubjs-react-native/core'
import { AntDesign } from '@expo/vector-icons'
import I18n from 'i18n-js'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { ISearch } from './settingsTypes'

const SearchSettings = (props: ISearch) => {
	return (
		<View>
			<View className='justify-between flex-row w-full items-center'>
				<TextInput
					style={{
						backgroundColor:
							props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
					}}
					placeholderTextColor='#fff'
					className='rounded-md p-3 text-lg w-5/6 text-white font-bold  placeholder-white indent-9'
					placeholder={I18n.t('TypeSomething')}
					value={props.term}
					onChangeText={text => props.setTerm(text)}
				/>

				<TouchableOpacity
					onPress={() =>
						props.term.length > 5
							? props.search(props.term)
							: Toast.show({
									text1: I18n.t('Min term length = 5'),
									type: 'error'
							  })
					}
					style={{
						backgroundColor:
							props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
					}}
					className=' p-3 rounded-md'
				>
					<AntDesign name='search1' size={24} color='white' />
				</TouchableOpacity>
			</View>
			{props.term
				? props.searchResults.map(item => (
						<TouchableOpacity
							onPress={() => props.goToLocation(item.cfi)}
							key={item.cfi}
							style={{
								backgroundColor:
									props.theme.body.background == '#121212' ? '#121212' : '#1E212C'
							}}
							className='mb-4 mt-4 p-4 rounded-md'
						>
							<Text className='text-white'>{item.excerpt}</Text>
						</TouchableOpacity>
				  ))
				: null}
		</View>
	)
}

export default SearchSettings
