import { Feather } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useAddUserBookMutation, useFetchCurrentUserBooksQuery } from '../../../store/api/books'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import Statistics from '../../ui/statistics'
import AddVideoPopup from './AddVideoPopup'
import { DropdownElement } from './DropdownElement'
import { UploadFile } from './uploadFile'

const UserProfilePages = () => {
	const { goBack, navigate } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser, isLoading, error } = useFetchSingleUserQuery(user?.uid)
	const [isVisible, setIsVisible] = useState(false)
	const { control, handleSubmit, reset } = useForm()
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(null)
	const [items, setItems] = useState(DropdownElement)
	const [ImageUrlPatch, setImageUrlPatch] = useState(undefined)
	const [ImageBlob, setImageBlob] = useState<Blob>()
	const [EpubBlob, setEpubBlob] = useState<Blob>()
	const [EpubUrlPatch, setEpubUrlPatch] = useState(undefined)
	const [addUserBook] = useAddUserBookMutation()
	const { data: CurrentUserBook } = useFetchCurrentUserBooksQuery(CurrentUser?.name, {
		skip: !CurrentUser
	})
	if (!CurrentUser || !user) return <Loader />
	const pickEpub = async () => {
		const result: any = await DocumentPicker.getDocumentAsync({ type: 'application/epub+zip' })
		if (result != null) {
			const uri = await fetch(result.uri)
			const blob = await uri.blob()
			setEpubBlob(blob)
			setEpubUrlPatch(result.name)
		}
	}
	const pickImage = async () => {
		const result: any = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
		if (result != null) {
			const uri = await fetch(result.uri)
			const blob = await uri.blob()
			setImageBlob(blob)
			setImageUrlPatch(result.name)
		}
	}
	
	const UploadBook = async (data: any) => {
		const image = await UploadFile(ImageBlob, data.Name)
		const epub = await UploadFile(EpubBlob, EpubUrlPatch)
		addUserBook({
			UserId: user.uid, book: {
				epubDoc: epub,
				Image: image,
				Name: data.Name,
				description: data.Description,
				genre: value,
				comments: [],
				autor: [CurrentUser.name],
				bookLanguage: data.bookLanguage,
				antalSider: data.antalSider,
				penData: data.penData
			}
		})
		setIsVisible(false)
		reset()
	}
	
	return <Layout>
		<ModalPopup height={'80%'} isVisible={isVisible} setIsVisible={setIsVisible} title={'Add book'}>
			<AddVideoPopup control={control} open={open} handleSubmit={handleSubmit} EpubUrlPatch={EpubUrlPatch}
			               UploadBook={UploadBook}
			               pickEpub={pickEpub} value={value} items={items}
			               setOpen={setOpen} setItems={setItems} ImageUrlPatch={ImageUrlPatch} pickImage={pickImage}
			               setValue={setValue} />
		</ModalPopup>
		
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className='flex-row justify-between mt-4 '>
				<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
				<Feather name='settings' onPress={() => navigate('Settings', {
					uid: user?.uid
				})} size={24} color='white' />
			</View>
			
			<View className=' items-center mt-8'>
				{CurrentUser.photoURL ?
					<Image source={{ uri: CurrentUser.photoURL }}
					       className='w-[200px] border-2 border-primary h-[200px] rounded-full' /> :
					<ClearUserLogo letter={user.email} width={150} height={150} />}
				
				<Text
					className='text-white font-bold text-2xl mt-2'>{CurrentUser.name}</Text>
				<Text
					className='text-gray text-md'>{CurrentUser.email}</Text>
			</View>
			<Statistics FirstDescription={'Favorite'}
			            FirstHeading={CurrentUser.favoritesBook.length.toString() ? CurrentUser.favoritesBook.length.toString() : '0'}
			            SecondHeading={CurrentUser.revieCount.toString()}
			            SecondDescription={'Review'} ThirdHeading={CurrentUserBook?.length}
			            ThirdDescription={'Books'} />
			
			<View className='flex-row justify-between items-center mt-6'>
				<Text className='text-white  font-bold  text-2xl'>Books</Text>
				<Text className='text-gray  text-lg' onPress={() => setIsVisible(!isVisible)}>Add books</Text>
			</View>
			
			<View className='mb-2 flex-1'>
				{CurrentUserBook?.length ? CurrentUserBook.map(books => (
					<View key={books.Name}>
						<BookItems genre={books.genre} id={books.id}
						           image={books.Image} name={books.Name}
						           autor={books.autor} description={books.description} />
					</View>
				)) : <Text className='text-gray mt-4 text-xl'>None Books!</Text>}
			</View>
		
		</ScrollView>
	</Layout>
}

export default UserProfilePages