import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useAddMessageToChatMutation } from '../../../store/api/book/mutation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { db } from '../../../utils/firebase'
import Layout from '../../ui/Layout/Layout'
import Field from '../../ui/field/field'
import Message, { IMessage } from './Message'
import { badWords } from './badWords'

const BookChat = ({ route }: any) => {
	const { BookId } = route.params
	const [addMessage] = useAddMessageToChatMutation()
	const { control, watch, reset, handleSubmit, setValue } = useForm({
		mode: 'onSubmit'
	})
	const { user } = useTypedSelector(state => state.auth)
	const [chats, setChats] = useState<IMessage[]>([])
	const { goBack } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery(BookId)
	const scrollViewRef = useRef<ScrollView | any>()
	const validateText = (value: string[]) => {
		for (let i = 0; i < badWords.length; i++) {
			if (value.includes(badWords[i])) {
				return false
			}
		}
		return true
	}
	useEffect(() => {
		//https://www.reddit.com/r/reactjs/comments/n3px8t/how_to_use_onsnapshot_in_redux_toolkit/
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'BookChats', BookId), doc => {
				setChats(doc.exists() ? doc.data().comments : [])
			})
			return () => {
				unsub()
			}
		}
		getChats()
	}, [])

	const handeSublit = (data: any) => {
		{
			data.Message !== ''
				? addMessage({ id: BookId, message: watch('Message'), uid: user?.uid })
				: Toast.show({ text1: 'Write please message!' })
			reset()
		}
	}
	return (
		<Layout className='h-full'>
			<StatusBar backgroundColor='#121212' />
			<View className='flex-row justify-between mb-4'>
				<Feather
					onPress={() => goBack()}
					name='arrow-left'
					size={24}
					color='white'
				/>
				<Text className='text-2xl text-white font-bold'>{book?.Name}</Text>
			</View>
			<ScrollView
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef?.current?.scrollToEnd({ animated: true })
				}
				className='flex-wrap-reverse'
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
						No one is discussing this book{' '}
					</Text>
				)}
			</ScrollView>

			<View className='justify-between flex-row w-full items-center'>
				<View className='w-5/6'>
					<Field
						NoError={true}
						placeholderTextColor='#fff'
						className='rounded-md z-50 p-0 placeholder-white indent-9'
						placeholder='Enter a message'
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
