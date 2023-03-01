import { FC } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'

interface IFavoriteitem {
	scale: Animated.AnimatedInterpolation<string | number>
	BookId: string
}

const Favoriteitem: FC<IFavoriteitem> = ({ BookId, scale }) => {
	const { data: book } = useFetchSingleBookQuery(BookId)
	const { navigate } = useTypedNavigation()
	if (!book?.Name) return null
	return (
		<Animated.View style={{ transform: [{ scale: scale }], marginRight: 10 }}>
		<Pressable onPress={() => navigate('BookPage', { id: book.id })}>
			<Image
				className='w-[150px] object-contain h-[250px] rounded-lg '
				source={{ uri: book.Image }}
			/>
		</Pressable>
		</Animated.View>
		
	)
}

export default Favoriteitem
