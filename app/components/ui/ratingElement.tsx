import { FontAwesome } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../hook/useTypedNavigation'
import { Comment } from '../../store/api/api.types'
import { useFetchSingleUserQuery } from '../../store/api/user/query'
import ClearUserLogo from './clearUserLogo'
import ProgressiveUserLogo from './ProgressiveImages/ProgressiveUserIcon'

const CommentElement: FC<Comment> = props => {
	const { navigate } = useTypedNavigation()
	const { data: user } = useFetchSingleUserQuery({ uid: props.userUid, navigate })
	if (!user) return null
	return (
		<View>
			<Pressable
				onPress={() =>
					navigate('AutorProfile', {
						uid: props.userUid
					})
				}
				className='mt-4 flex-row'
			>
			<ProgressiveUserLogo	userName={user.name} height={70} width={70} uri={user.photoURL} />
				<View className='flex-1 ml-2'>
					<View className='flex-row justify-between items-center'>
						<Text
							numberOfLines={1}
							className='text-white font-bold text-xl flex-wrap max-w-[190px] whitespace-normal'
						>
							{user.name ? user.name : 'Anonim'}
						</Text>
						
						<View className='justify-between gap-2 items-center flex-row'>
							<FontAwesome name='star' size={20} color='#702DF5' />
							<Text className='text-white font-bold text-xl'>{props.rating} /5</Text>
						</View>
					</View>
					<Text className='text-gray mt-1 text-lg'>{props.message}</Text>
				</View>
			</Pressable>
		</View>
	)
}

export default CommentElement
