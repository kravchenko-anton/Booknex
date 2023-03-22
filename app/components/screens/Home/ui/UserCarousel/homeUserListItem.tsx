import RNBounceable from '@freakycoder/react-native-bounceable'
import React, { FC, memo } from 'react'
import { Animated, Image } from 'react-native'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../../../../store/api/user/query'
import ClearUserLogo from '../../../../ui/clearUserLogo'
import ProgressiveUserLogo from '../../../../ui/ProgressiveImages/ProgressiveUserIcon'
import { IUserHomeItem } from './homeUserItemTypes'


const HomeUserListItem: FC<IUserHomeItem> = ({ uid, scale }) => {
	const { navigate } = useTypedNavigation()
	const { data: user } = useFetchSingleUserQuery({ uid, navigate })
	if (!user?.uid) return null
	return (
		<Animated.View className=' bg-blue p-4 rounded-lg'
		               style={{ transform: [{ scale }], marginRight: 10, width: 112 }}>
			<RNBounceable className='p-0' onPress={() => navigate('AutorProfile', { uid: user.uid })}>
				<ProgressiveUserLogo userName={user.name} height={80} width={80} uri={user.photoURL} />
			</RNBounceable>
		</Animated.View>
	)
}

export default memo(HomeUserListItem)
