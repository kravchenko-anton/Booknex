import { Feather } from '@expo/vector-icons'
import RNBounceable from '@freakycoder/react-native-bounceable'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as Clipboard from 'expo-clipboard'
import I18n from 'i18n-js'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../../hook/useTypedSelector'
import { useRemoveMessageFromChatMutation } from '../../../../store/api/book/mutation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import ClearUserLogo from '../../../ui/clearUserLogo'
import Loader from '../../../ui/Loader'
import ModalPopup from '../../../ui/modal'
import ProgressiveUserLogo from '../../../ui/ProgressiveImages/ProgressiveUserIcon'
import { IMessage } from './messageTypes'

dayjs.extend(relativeTime)
const Message = ({ uid, message, timeStamp, BookId }: IMessage) => {
	const { navigate } = useTypedNavigation()
	const { user: CurrentUser } = useTypedSelector(state => state.auth)
	const { data: user } = useFetchSingleUserQuery({ uid, navigate })
	const [removeMessage] = useRemoveMessageFromChatMutation()
	const [isVisible, setIsVisible] = useState(false)
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
			<RNBounceable
				onLongPress={() =>
					uid === CurrentUser?.uid ? setIsVisible(!isVisible) : null
				}
				style={{
					backgroundColor: uid === CurrentUser?.uid ? '#702DF5' : '#1E1E1E',
					marginLeft: uid === CurrentUser?.uid ? 'auto' : 10,
					marginRight: uid === CurrentUser?.uid ? 10 : 'auto',
					borderBottomLeftRadius: uid === CurrentUser?.uid ? 5 : 0,
					borderBottomRightRadius: uid === CurrentUser?.uid ? 0 : 5,
					maxWidth: '80%',
					borderRadius: 5,
					padding: 10
				}}
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
			</RNBounceable>
			<TouchableOpacity onPress={() => navigate('AutorProfile', { uid: uid })}>
				<ProgressiveUserLogo
					uri={user.photoURL} userName={user.name} width={30} height={30}/>
			
			</TouchableOpacity>
		</View>
	)
}

export default Message
