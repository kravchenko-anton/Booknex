import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { useFetchMyProfileQuery } from '../../../store/api/user/query'
import { useScaleOnMount } from '../../../utils/useBounces'

export const useSingleBook = (id: string) => {
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { navigate } = useTypedNavigation()
	const { data: book, isLoading } = useFetchSingleBookQuery({ id, navigate })
	const { data: Profile } = useFetchMyProfileQuery({
		uid: StateUser?.uid, navigate
	})
	const [isVisible, setIsVisible] = useState(false)
	const [visibleButton, setVisibleButton] = useState(true)
	const [lastReadPage, setLastReadPage] = useState('')
	const { styleAnimation } = useScaleOnMount()
	useFocusEffect(() => {
		const parseLastPage = async () => {
			try {
				// @ts-ignore
				const value = await AsyncStorage.getItem(book.epubDoc)
				if (value !== null) {
					setLastReadPage(value)
				}
			} catch (e) {
				// It not matters needed to be catched
			}
		}
		parseLastPage()
	})
	
	return {
		StateUser,
		book,
		isLoading,
		Profile,
		setVisibleButton,
		setIsVisible,
		isVisible,
		visibleButton,
		lastReadPage,
		styleAnimation
	}
}
