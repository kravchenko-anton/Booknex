import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import ClearUserLogo from '../../ui/clearUserLogo'

const UserFavorite = (props: { id: string | number }) => {
	const { navigate } = useTypedNavigation()
	const { data } = useFetchSingleUserQuery(props.id)
	if (!data)
		return (
			<ActivityIndicator
				color='#702DF5'
				style={{ height: '100%' }}
				className='justify-center items-center'
				size={'large'}
			/>
		)
	return (
		<View>
			<Pressable
				onPress={() => navigate('AutorProfile', { uid: data?.uid })}
				key={data?.uid}
				className='items-center justify-center  mr-4'
			>
				{data?.photoURL ? (
					<Image
						source={{ uri: data?.photoURL }}
						className='w-[100px] h-[100px] rounded-full'
					/>
				) : (
					<ClearUserLogo height={100} width={100} letter={data.email} />
				)}
				<Text className='text-gray text-md font-bold mt-2'>{data?.name}</Text>
			</Pressable>
		</View>
	)
}

export default UserFavorite
