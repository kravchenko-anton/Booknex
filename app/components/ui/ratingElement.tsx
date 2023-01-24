import { FontAwesome } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { Comment } from '../../store/api/api.types'
import ClearUserLogo from './clearUserLogo'

const CommentElement: FC<Comment> = (props) => {
	return <View>
		<View className='mt-4 flex-row'>
			{props.user.photoUrl ?
				<Image source={{ uri: props.user.photoUrl }} className='w-[70px] mr-3 h-[70px] rounded-full' /> :
				<ClearUserLogo letter={props.user.email} width={70} height={70} />}
			
			<View className='flex-1'>
				<View className='flex-row justify-between items-center'>
					<Text numberOfLines={1}
					      className='text-white font-bold text-xl flex-wrap max-w-[190px] whitespace-normal'>{props.user.name}</Text>
					
					<View className='justify-between gap-2 items-center flex-row'>
						<FontAwesome name='star' size={20} color='#702DF5' />
						<Text
							className='text-white font-bold text-xl'>{props.rating} /5</Text>
					</View>
				</View>
				<Text
					className='text-gray mt-1 text-lg'>{props.message}</Text>
			</View>
		</View>
	</View>
}

export default CommentElement