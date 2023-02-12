import * as DocumentPicker from 'expo-document-picker'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useAddUserBookMutation } from '../../../store/api/book/mutation'
import Field from '../../ui/field/field'
import { IaddBook } from './addBookPopup.interface'
import { DropdownElement } from './DropdownElement'
import { UploadFile } from './uploadFile'

const AddBookPopup: FC<IaddBook> = ({ user, setIsVisible, CurrentUser }) => {
	const [ImageBlob, setImageBlob] = useState<Blob>()
	const [EpubBlob, setEpubBlob] = useState<Blob>()
	const [addUserBook] = useAddUserBookMutation()
		const { control, handleSubmit, reset } = useForm()
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(null)
	const [items, setItems] = useState(DropdownElement)
	const [ImageUrlPatch, setImageUrlPatch] = useState(undefined)
	const [EpubUrlPatch, setEpubUrlPatch] = useState(undefined)
	const [UploadLoading, setUploadLoading] = useState(false)
	const pickEpub = async () => {
		const result: any = await DocumentPicker.getDocumentAsync({
			type: 'application/epub+zip'
		})
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
		setUploadLoading(true)
		const image = await UploadFile(ImageBlob, data.Name)
		const epub = await UploadFile(EpubBlob, EpubUrlPatch)
		addUserBook({
			UserId: user.uid,
			book: {
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
		setUploadLoading(false)
	}
	return (
		<View className='h-full'>
			<Field
				control={control}
				name={'Name'}
				placeholder='Book name'
				rules={{
					required: 'Name requered!'
				}}
			/>
			<Field
				control={control}
				rules={{
					required: 'description requered!'
				}}
				name={'Description'}
				placeholder={'Book description'}
				className='h-[40px]'
			/>
			<View>
				<Text className='text-white text-xl font-bold'>Genre</Text>
				<DropDownPicker
					open={open}
					value={value}
					multiple={true}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
				/>
			</View>
			<View className='gap-1 mt-1 flex-row justify-between w-full items-center'>
				<View>
					<Field
						keyboardType={'number-pad'}
						control={control}
						rules={{
							required: 'data requered!',
							max: {  value: 2023, message: 'Maximum 2023' },
						}}
						name={'penData'}
						placeholder={'Years'}
					/>
				</View>
				<View>
					<Field
						keyboardType={'number-pad'}
						rules={{
							required: 'Page count requered!',
							max: {  value:10000, message: 'Maximum 10000 page' },
						}}
						control={control}
						name={'antalSider'}
						placeholder={'Page count'}
					/>
				</View>
				<View>
					<Field
						rules={{
							required: 'Language requered!'
						}}
						control={control}
						name={'bookLanguage'}
						placeholder={'Language'}
					/>
				</View>
			</View>
			<View className='mt-3  flex-row justify-between items-center'>
				<Text numberOfLines={1} className='text-2xl w-[60%] text-white font-bold'>
					{!ImageUrlPatch ? 'Select cover photo' : ImageUrlPatch}
				</Text>
				<Pressable
					onPress={() => pickImage()}
					className='bg-primary p-2 rounded-lg'
				>
					<Text className='text-white font-bold text-xl'>Select 📷</Text>
				</Pressable>
			</View>

			<View className='mt-3  flex-row justify-between items-center'>
				<Text numberOfLines={1} className='text-2xl w-[60%] text-white font-bold'>
					{!EpubUrlPatch ? 'Select epub file' : EpubUrlPatch}
				</Text>
				<Pressable onPress={() => pickEpub()} className='bg-primary p-2 rounded-lg'>
					<Text className='text-white font-bold text-xl'>Select 📚</Text>
				</Pressable>
			</View>

			<View className='mt-4 flex items-center'>
				<Pressable  disabled={UploadLoading} android_disableSound={UploadLoading}
					onPress={handleSubmit(UploadBook)}
					className='bg-blue p-4 rounded-lg'
				>
					<Text className='text-white font-bold text-xl'>{!UploadLoading ? 'Add book 📩' : 'Loading book!'}</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default AddBookPopup
