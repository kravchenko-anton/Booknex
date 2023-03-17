import { Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../store/api/user/query'
import ClearUserLogo from './clearUserLogo'

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
				{CurrentUser.photoURL ? (
					<Image
						source={{ uri: CurrentUser.photoURL }}
						className='w-[100px] border-2 border-primary h-[100px] rounded-full'
					/>
				) : (
					<ClearUserLogo letter={CurrentUser.name} width={100} height={100} />
				)}
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
