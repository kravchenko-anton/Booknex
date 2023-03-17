import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC } from 'react'
import { Animated, Image } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { ISmallFlatItem } from './SmallFlatlistTypes'


const HorizontalSmallFlatlistItem: FC<ISmallFlatItem> = ({ BookId, scale }) => {
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery({ id: BookId, navigate })
	if (!book?.Name) return null
	
	
	return (
		<Animated.View style={{ transform: [{ scale: scale }], marginRight: 10 }}>
			<RNBounceable onPress={() => navigate('BookPage', { id: book.id })}>
				<Image
					className='w-[150px] object-contain h-[250px] rounded-lg '
					source={{ uri: book.Image }}
				/>
			</RNBounceable>
		</Animated.View>
	)
}

export default HorizontalSmallFlatlistItem
