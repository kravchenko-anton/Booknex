import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC, memo } from 'react'
import { Animated, Image } from 'react-native'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../../../store/api/book/query'
import { IHomeitem } from './HomeItemTypes'

const HomeListItem: FC<IHomeitem> = ({ BookId, scale, rotateY, rotateX }) => {
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery({ id: BookId, navigate })
	if (!book?.Name) return null
	return (
		<Animated.View
			style={{
				marginRight: 10,
				width: 190,
				height: 290,
				transform: [{ scale }, { rotateX: rotateX }, { rotateY: rotateY }]
			}}>
			<RNBounceable className='rounded-lg ' onPress={() => navigate('BookPage', { id: book.id })}>
				<Image
					className='w-[190px] h-[290px] rounded-lg '
					source={{ uri: book.Image }}
				/>
			</RNBounceable>
		</Animated.View>
	)
}

export default memo(HomeListItem)
