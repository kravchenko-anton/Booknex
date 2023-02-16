import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'

const Favoriteitem:FC<{BookId: string}> = ({BookId}) => {
	const {data: book} = useFetchSingleBookQuery(BookId)
	const {navigate} = useTypedNavigation()
	if (!book) return null
	return <Pressable
		onPress={() => navigate('BookPage', { id: book.id })}
		className='flex-row'
	>
		<Image
			source={{ uri: book.Image }}
			className='w-[100px] object-contain h-[150px] rounded-lg '
		/>
		<View className='pl-4 flex-1'>
			<Text
				className='text-white overflow-ellipsis mt-2 text-2xl  font-bold'
				numberOfLines={1}
			>
				{book.Name}
			</Text>
			<Text numberOfLines={1} className='text-whiteGray text-lg w-5/6 mb-1'>
				{book.autor}
			</Text>
			<View className='flex-row gap-1 items-center'>
				<Text className='text-gray w-[80%] text-md' numberOfLines={2}>
					{book.description}
				</Text>
			</View>
			<View className='mt-2 flex-wrap flex-row'>
				{book.genre.map((item: any) => (
					<Text
						key={item}
						className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
					>
						{item}
					</Text>
				))}
			</View>
		</View>
	</Pressable>
}

export default Favoriteitem
