import { AntDesign, Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { View } from 'react-native'
import { BookTypes, Iuser } from '../../../store/api/api.types'
import { useAddBookToFavoriteMutation, useDeleteBookFromFavoriteMutation } from '../../../store/api/book/mutation'


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

	const isFavorite = Profile?.favoritesBook?.some(item => item.id === book.id)
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
				<Feather
					onPress={() =>
						addBook({ currentUserUID: StateUser?.uid, book: Favoritedata })
					}
					name='heart'
					size={24}
					color='white'
				/>
			) : (
				<AntDesign
					onPress={() =>
						removeFromFavorite({ currentUserUID: StateUser?.uid, book: Favoritedata })
					}
					name='delete'
					size={24}
					color='white'
				/>
			)}
		</View>
	)
}

export default BookFavoritesButton
