import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useRemoveUserBookMutation } from '../../../store/api/book/mutation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { useFetchMyProfileQuery } from '../../../store/api/user/query'
import { useScaleOnMount } from '../../../utils/useBounces'

export const useSingleBook = (id: string) => {
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { data: book, isLoading } = useFetchSingleBookQuery(id)
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const [isVisible, setIsVisible] = useState(false)
	const [visibleButton, setVisibleButton] = useState(true)
	const [lastReadPage, setLastReadPage] = useState('')
	const [remove] = useRemoveUserBookMutation()
	const { styleAnimation } = useScaleOnMount()
	const [DialogPopupVisible, setDialogPopupVisible] = useState(false)
	useFocusEffect(() => {
		const parseLastPage = async () => {
			try {
				// @ts-ignore
				const value = await AsyncStorage.getItem(book.epubDoc)
				if (value !== null) {
					setLastReadPage(value)
				}
			} catch (e) {
				console.log(e)
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
		styleAnimation,
		DialogPopupVisible,
		setDialogPopupVisible,
		remove
	}
}
