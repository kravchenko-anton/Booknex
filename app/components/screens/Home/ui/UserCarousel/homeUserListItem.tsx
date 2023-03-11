import RNBounceable from '@freakycoder/react-native-bounceable'
import React, { FC } from 'react'
import { Animated, Image } from 'react-native'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../../../../store/api/user/query'
import ClearUserLogo from '../../../../ui/clearUserLogo'
import { IUserHomeItem } from './homeUserItemTypes'


const HomeUserListItem: FC<IUserHomeItem> = ({ uid, scale }) => {
	const { data: user } = useFetchSingleUserQuery(uid)
	const { navigate } = useTypedNavigation()
	if (!user?.uid) return null
	return (
		<Animated.View className=' bg-blue p-4 rounded-lg'
		               style={{ transform: [{ scale }], marginRight: 10, width: 112 }}>
			<RNBounceable className='p-0' onPress={() => navigate('AutorProfile', { uid: user.uid })}>
				{user.photoURL ? (
					<Image
						source={{ uri: user.photoURL }}
						className='w-[80px] h-[80px] rounded-lg'
					/>
				) : (
					<ClearUserLogo rounded={8} letter={user.name} width={80} height={80} />
				)}
			</RNBounceable>
		</Animated.View>
	)
}

export default HomeUserListItem
