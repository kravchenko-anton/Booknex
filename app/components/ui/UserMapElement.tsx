import { Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../store/api/user/query'
import ClearUserLogo from './clearUserLogo'

const UserMapElement = ({ userUId }: { userUId: string }) => {
	const {
		data: CurrentUser,
		isLoading,
		error
	} = useFetchSingleUserQuery(userUId)
	const { navigate } = useTypedNavigation()
	if (!CurrentUser) return null
	return (
		<View>
			<Pressable
				onPress={() =>
					navigate('AutorProfile', {
						uid: CurrentUser.uid
					})
				}
				className='items-center text-center h-full mr-3'
			>
				<ClearUserLogo letter={CurrentUser.name} width={100} height={100} />
				<Text
					numberOfLines={1}
					className='mt-1 max-w-[80px] text-center text-white font-bold'
				>
					{CurrentUser.name}
				</Text>
			</Pressable>
		</View>
	)
}

export default UserMapElement
