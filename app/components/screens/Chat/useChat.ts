import { doc, onSnapshot } from 'firebase/firestore'
import I18n from 'i18n-js'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useAddMessageToChatMutation } from '../../../store/api/book/mutation'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { badWords } from '../../../utils/badWords'
import { db } from '../../../utils/firebase'
import { IMessage } from './ui/messageTypes'

export const useChat = (BookId: string) => {
	const [addMessage] = useAddMessageToChatMutation()
	const { control, watch, reset, handleSubmit, setValue } = useForm({
		mode: 'onSubmit'
	})
	const { user } = useTypedSelector(state => state.auth)
	const [chats, setChats] = useState<IMessage[]>([])
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchSingleBookQuery({ id: BookId, navigate })
	const scrollViewRef = useRef<ScrollView | any>()
	const validateText = (value: string[]) => {
		for (let i = 0; i < badWords.length; i++) {
			if (value.includes(badWords[i])) {
				return false
			}
		}
		return true
	}
	useEffect(() => {
		//https://www.reddit.com/r/reactjs/comments/n3px8t/how_to_use_onsnapshot_in_redux_toolkit/
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'BookChats', BookId), doc => {
				setChats(doc.exists() ? doc.data().comments : [])
			})
			return () => {
				unsub()
			}
		}
		getChats()
	}, [])
	
	const handeSublit = (data: any) => {
		{
			data.Message !== ''
				? addMessage({ id: BookId, message: watch('Message'), uid: user?.uid })
				: Toast.show({ text1: I18n.t('TypeSomething') })
			reset()
		}
	}
	
	return {
		handeSublit,
		control,
		validateText,
		book,
		scrollViewRef,
		chats,
		handleSubmit
	}
}
