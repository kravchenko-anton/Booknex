import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'

export interface BookItem {
	image: string,
	name: string,
	autor: string | string[],
	rating: number
	genre: any,
	id?: string
}

const BookItems: FC<BookItem> = (props) => {
	const { navigate } = useTypedNavigation()
	return <Pressable onPress={() => navigate('BookPage', { id: props.id })} className='flex-row mt-4 mb-4'>
		
		<Image source={{ uri: props.image }}
		       className='w-[100px] object-contain h-[150px] rounded-lg ' />
		<View className='pl-4 flex-1'>
			<Text className='text-white overflow-ellipsis mt-2 text-2xl  font-bold'
			      numberOfLines={1}>{props.name}</Text>
			<Text numberOfLines={1} className='text-gray text-lg w-5/6 mb-1'>{props.autor}</Text>
			<View className='flex-row gap-1 items-center'>
				<Rating
					ratingCount={5}
					tintColor='#121212'
					startingValue={props.rating}
					showRating={false}
					imageSize={24}
					readonly={true}
				/>
				<Text className='text-white text-lg font-bold'>/5</Text>
			</View>
			<View className='mt-2 flex-wrap flex-row'>
				{props.genre.map((item: any) => (
					<Text key={item} className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'>{item}</Text>
				))}
			</View>
		
		</View>
	</Pressable>
}

export default BookItems