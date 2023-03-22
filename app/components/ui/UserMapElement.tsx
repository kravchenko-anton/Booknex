import { Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../store/api/user/query'
import ClearUserLogo from './clearUserLogo'
import ProgressiveUserLogo from './ProgressiveImages/ProgressiveUserIcon'

const UserMapElement = ({ userUId }: { userUId: string }) => {
	const { navigate } = useTypedNavigation()
	const { data: CurrentUser } = useFetchSingleUserQuery({ uid: userUId, navigate })
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
				<ProgressiveUserLogo userName={CurrentUser.name} height={100} width={100} uri={CurrentUser.photoURL} />
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
