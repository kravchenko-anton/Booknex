import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC } from 'react'
import { Animated, Image } from 'react-native'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../../../store/api/book/query'
import { IHomeitem } from './HomeItemTypes'

const HomeListItem: FC<IHomeitem> = ({ BookId, scale }) => {
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery({ id: BookId, navigate })
	if (!book?.Name) return null
	return (
		<Animated.View
			style={{ marginRight: 10, width: 190, transform: [{ scale }] }}>
			<RNBounceable className='rounded-lg ' onPress={() => navigate('BookPage', { id: book.id })}>
				<Image
					className='w-[190px] h-[290px] rounded-lg '
					source={{ uri: book.Image }}
				/>
			</RNBounceable>
		</Animated.View>
	)
}

export default HomeListItem
