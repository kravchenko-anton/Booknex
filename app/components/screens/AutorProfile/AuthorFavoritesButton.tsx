import { AntDesign, Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { View } from 'react-native'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { Iuser } from '../../../store/api/api.types'
import {
	useAddUserToFavoriteMutation,
	useRemoveUserToFavoriteMutation
} from '../../../store/api/user/mutation'
import { useFetchMyProfileQuery } from '../../../store/api/user/query'

const AuthorFavoritesButton: FC<{ user: Iuser }> = ({ user }) => {
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const [addToFavorite] = useAddUserToFavoriteMutation()
	const [removeFavorite] = useRemoveUserToFavoriteMutation()
	const userFavoriteData = { uid: user.uid }
	const isFavorite = Profile?.favoritesUser.some(item => item.uid === user.uid)

	return (
		<View>
			{user.uid !== StateUser?.uid ? (
				!isFavorite ? (
					<Feather
						onPress={() =>
							addToFavorite({
								currentUserUID: StateUser?.uid,
								favoriteUser: userFavoriteData
							})
						}
						name='heart'
						size={24}
						color='white'
					/>
				) : (
					<AntDesign
						onPress={() =>
							removeFavorite({
								currentUserUID: StateUser?.uid,
								favoriteUser: userFavoriteData
							})
						}
						name='delete'
						size={24}
						color='white'
					/>
				)
			) : null}
		</View>
	)
}

export default AuthorFavoritesButton
