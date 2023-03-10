import { AntDesign, Feather } from '@expo/vector-icons'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC } from 'react'
import { View } from 'react-native'
import { BookTypes, Iuser } from '../../../../store/api/api.types'
import { useAddBookToFavoriteMutation, useDeleteBookFromFavoriteMutation } from '../../../../store/api/book/mutation'

interface IFavoriteButon {
	book: BookTypes
	Profile: Iuser
	StateUser: any
}

const BookFavoritesButton: FC<IFavoriteButon> = ({
	                                                 book,
	                                                 Profile,
	                                                 StateUser
                                                 }) => {
	const [addBook] = useAddBookToFavoriteMutation()
	const [removeFromFavorite] = useDeleteBookFromFavoriteMutation()
	const isFavorite = Profile?.favoritesBook?.some(item => item === book.id)
	const Favoritedata = {
		Image: book.Image,
		Name: book.Name,
		genre: book.genre,
		autor: book.autor,
		description: book.description,
		id: book.id
	}
	
	return (
		<View>
			{!isFavorite ? (
				<RNBounceable bounceVelocityOut={5} onPress={() =>
					addBook({ currentUserUID: StateUser?.uid, book: Favoritedata })}>
					<Feather
						name='heart'
						size={24}
						color='white'
					/>
				</RNBounceable>
			) : (
				<RNBounceable bounceVelocityOut={5}
				              onPress={() => removeFromFavorite({ currentUserUID: StateUser?.uid, book: Favoritedata })}>
					<AntDesign
						name='delete'
						size={24}
						color='white'
					/>
				</RNBounceable>
			)}
		</View>
	)
}

export default BookFavoritesButton
