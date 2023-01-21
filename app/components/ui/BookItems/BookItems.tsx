import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings'

export interface BookItem {
	image: string,
	name: string,
	autor: string,
	rating: number
	genre: any
}

const BookItems: FC<BookItem> = (props) => {
	return <View className='flex-row mt-4 mb-4'>
		
		<Image source={{ uri: props.image }}
		       className='w-[100px] object-contain h-[150px] rounded-b-sm ' />
		<View className='pl-4'>
			<Text className='text-white mt-2 text-2xl  font-bold' numberOfLines={1}>{props.name}</Text>
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
	</View>
}

export default BookItems