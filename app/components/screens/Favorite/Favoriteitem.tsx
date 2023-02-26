import { FC } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'

const Favoriteitem: FC<{ BookId: string }> = ({ BookId }) => {
	const { data: book } = useFetchSingleBookQuery(BookId)
	const { navigate } = useTypedNavigation()
	if (!book) return null
	return (
		<Pressable onPress={() => navigate('BookPage', { id: book.id })}>
			<Image
				className='w-[150px] object-contain h-[250px] rounded-lg '
				source={{ uri: book.Image }}
			/>
		</Pressable>
	)
}

export default Favoriteitem
