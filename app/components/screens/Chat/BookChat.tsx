import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import I18n from 'i18n-js'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Field from '../../ui/field/field'
import Header from '../../ui/header'
import Layout from '../../ui/Layout/Layout'
import Message from './ui/Message'
import { useChat } from './useChat'

const BookChat = ({ route }: any) => {
	const { BookId } = route.params
	const {
		handeSublit,
		control,
		validateText,
		book,
		scrollViewRef,
		chats,
		handleSubmit
	} = useChat(BookId)
	return (
		<Layout className='h-full'>
			<StatusBar backgroundColor='#121212' />
			<Header className='mb-2 mt-2'>
				<Text className='text-2xl text-white font-bold'>{book?.Name}</Text>
			</Header>
			<ScrollView
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef?.current?.scrollToEnd({ animated: true })
				}
				className=' w-full h-full'
				showsVerticalScrollIndicator={false}
			>
				{chats?.length ? (
					chats.map(item => {
						return (
							<Message
								BookId={BookId}
								key={item.timeStamp + item.message}
								message={item.message}
								timeStamp={item.timeStamp}
								uid={item.uid}
							/>
						)
					})
				) : (
					<Text className='text-white mt-4 justify-start mx-auto items-center'>
						{I18n.t('NoDiscussions')}
					</Text>
				)}
			</ScrollView>
			
			<View className='justify-between flex-row w-full items-center'>
				<View className='w-5/6'>
					<Field
						NoError={true}
						placeholderTextColor='#fff'
						className='rounded-md z-50 p-0 placeholder-white indent-9'
						placeholder={I18n.t('TypeSomething')}
						control={control}
						rules={{ validate: validateText, required: true }}
						name={'Message'}
					/>
				</View>
				
				<TouchableOpacity
					onPress={handleSubmit(handeSublit)}
					className=' bg-blue border-2 border-white p-3 rounded-md'
				>
					<Feather name='send' size={24} color='white' />
				</TouchableOpacity>
			</View>
		</Layout>
	)
}

export default BookChat
