import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC, memo } from 'react'
import { Animated } from 'react-native'
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../../../store/api/book/query'
import ProgressiveCover from '../../../../ui/ProgressiveImages/progressiveCover'
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
				<ProgressiveCover bookAuthor={book.autor} uri={book.Image} bookName={book.Name} width={190} height={290}
				                  borderRadius={8} />
			</RNBounceable>
		</Animated.View>
	)
}

export default memo(HomeListItem)
