import { Feather } from '@expo/vector-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as Clipboard from 'expo-clipboard'
import I18n from 'i18n-js'
import { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../../hook/useTypedSelector'
import { useRemoveMessageFromChatMutation } from '../../../../store/api/book/mutation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import Loader from '../../../ui/Loader'
import ClearUserLogo from '../../../ui/clearUserLogo'
import ModalPopup from '../../../ui/modal'
import { IMessage } from './messageTypes'
dayjs.extend(relativeTime)
const Message = ({ uid, message, timeStamp, BookId }: IMessage) => {
	const { user: CurrentUser } = useTypedSelector(state => state.auth)
	const { data: user } = useFetchSingleUserQuery(uid)
	const [removeMessage] = useRemoveMessageFromChatMutation()
	const [isVisible, setIsVisible] = useState(false)
	const { navigate } = useTypedNavigation()

	if (!user) return <Loader />
	return (
		<View
			style={{
				marginLeft: uid === CurrentUser?.uid ? 'auto' : 0,
				marginRight: uid === CurrentUser?.uid ? 0 : 'auto',
				flexDirection: uid === CurrentUser?.uid ? 'row' : 'row-reverse'
			}}
			className={'mb-4 items-end flex-1'}
		>
			<ModalPopup
				height={100}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				title={'Edit'}
			>
				<View className='flex-row justify-between w-full'>
					<TouchableOpacity
						onPress={() => {
							removeMessage({
								id: BookId,
								message: message,
								uid: uid,
								timeStamp: timeStamp
							})
							setIsVisible(false)
							Toast.show({
								type: 'success',
								text1: I18n.t('You message delete')
							})
						}}
					>
						<View className='flex-row gap-3 items-center'>
							<Feather name='delete' size={24} color='red' />
							<Text className='text-2xl text-white'>{I18n.t('Delete')}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Clipboard.setStringAsync(message)
							setIsVisible(false)
							Toast.show({
								type: 'success',
								text1: I18n.t('You message copy')
							})
						}}
					>
						<View className='flex-row gap-3 items-center'>
							<Text className='text-2xl text-white'>{I18n.t('Copy')}</Text>
							<Feather name='copy' size={24} color='orange' />
						</View>
					</TouchableOpacity>
				</View>
			</ModalPopup>
			<Pressable
				onLongPress={() =>
					uid === CurrentUser?.uid ? setIsVisible(!isVisible) : null
				}
				style={{
					backgroundColor: uid === CurrentUser?.uid ? '#702DF5' : '#1E1E1E',
					marginLeft: uid === CurrentUser?.uid ? 'auto' : 10,
					marginRight: uid === CurrentUser?.uid ? 10 : 'auto',
					borderBottomLeftRadius: uid === CurrentUser?.uid ? 5 : 0,
					borderBottomRightRadius: uid === CurrentUser?.uid ? 0 : 5
				}}
				className={'p-3 max-w-[80%] rounded-md'}
			>
				{uid !== CurrentUser?.uid ? (
					<Text className='text-primary text-md'>{user?.name}</Text>
				) : null}
				<View>
					<Text className='text-white flex-wrap text-lg'>{message}</Text>
				</View>
				<Text className='text-white font-bold text-xs'>
					{dayjs(timeStamp).format('hh:mm')}
				</Text>
			</Pressable>
			<TouchableOpacity onPress={() => navigate('AutorProfile', { uid: uid })}>
				{user?.photoURL ? (
					<Image
						source={{ uri: user.photoURL }}
						className='w-[30px] border-2 border-primary h-[30px] rounded-full'
					/>
				) : (
					<ClearUserLogo letter={user.name} latterSize={15} width={30} height={30} />
				)}
			</TouchableOpacity>
		</View>
	)
}

export default Message
