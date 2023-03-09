import React from 'react'
import { Animated, Dimensions, Platform } from 'react-native'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { BookTypes } from '../../../../store/api/api.types'
import { useFetchAllBooksQuery } from '../../../../store/api/book/query'

export const SPACING = 10

const { width } = Dimensions.get('window')
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.55 : width * 0.60
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2

export const useCarousel = () => {
	const { data: book } = useFetchAllBooksQuery(null, {
		refetchOnFocus: true
	})
	const { navigate } = useTypedNavigation()
	const CarouselBook = [
		{ id: 'first' } as BookTypes,
		...(book ? book.slice(0, 10) : []),
		{ id: 'last' } as BookTypes
	]
	const scrollX = React.useRef(new Animated.Value(0)).current
	
	return { navigate, CarouselBook, scrollX }
}
