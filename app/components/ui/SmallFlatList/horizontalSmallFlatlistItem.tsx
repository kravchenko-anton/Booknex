import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC, memo } from 'react'
import { Animated } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import ProgressiveCover from '../ProgressiveImages/progressiveCover'
import { ISmallFlatItem } from './SmallFlatlistTypes'


const HorizontalSmallFlatlistItem: FC<ISmallFlatItem> = ({ BookId, scale }) => {
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery({ id: BookId, navigate })
	if (!book?.Name) return null
	
	
	return (
		<Animated.View style={{ transform: [{ scale: scale }], marginRight: 10 }}>
			<RNBounceable onPress={() => navigate('BookPage', { id: book.id })}>
				<ProgressiveCover height={250} width={150} bookName={book.Name} bookAuthor={book.autor} uri={book.Image}
				                  borderRadius={8} />
			</RNBounceable>
		</Animated.View>
	)
}

export default memo(HorizontalSmallFlatlistItem)
