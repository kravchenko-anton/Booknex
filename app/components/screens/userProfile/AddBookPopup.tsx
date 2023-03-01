import I18n from 'i18n-js'
import React, { FC, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useAddUserBookMutation, useSearchBookByGoogleApiMutation } from '../../../store/api/book/mutation'
import { useFetchAllBooksNoLangQuery, useFetchAllBooksQuery } from '../../../store/api/book/query'
import { IaddBook } from './addBookPopup.interface'
import { parseEpubMetadataPath, parseXML } from './ReadXML'
import { UploadFile } from './uploadFile'
import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Alert, Image, TouchableOpacity } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
var JSZip = require('jszip')
interface IMetaData {
	title: string
	author: string
	description: string
	lang: string
	genres: string[]
	antalSide: string
	publishData: string
}
const AddBookPopup: FC<IaddBook> = ({ user, setIsVisible, CurrentUser }) => {
	const [addUserBook] = useAddUserBookMutation()
	const [image, setImage] = useState(
		'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
	)
	const [content, setContent] = useState({} as IMetaData)
	const [GoogleBookApi] = useSearchBookByGoogleApiMutation()
	const [EpubBlob, setEpubBlob] = useState<Blob>()
	const [EpubUrlPath, setEpubUrlPatch] = useState<string>()
	const { navigate } = useTypedNavigation()
	const {data: AllBook} = useFetchAllBooksNoLangQuery(null)
	const pickDocument = async () => {
		setContent({} as IMetaData)
		const zipObj = new JSZip()
		let result = await DocumentPicker.getDocumentAsync({
			type: ['application/epub+zip', 'application/oebps-package+xml']
		})
		if (result.type !== 'cancel') {
			const uri = await fetch(result.uri)
			const blob = await uri.blob()
			setEpubBlob(blob)
			setEpubUrlPatch(result.name)
			FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' }).then(
				data => {
					zipObj
						.loadAsync(data, { base64: true })
						.then((zip: any) => {
							const exampleFile = zip.file('META-INF/container.xml')
							if (exampleFile) {
								exampleFile.async('string').then((content: any) => {
									parseEpubMetadataPath(content).then((funalDataParsed: any) => {
										const funalFileParsed = zip.file(`${funalDataParsed.subject}`)
										if (funalFileParsed) {
											funalFileParsed.async('string').then((content: any) => {
													parseXML(content).then((data: any) => {
													GoogleBookApi({searchTerm: data.title, author:data.author, lang:data.lang}).then(({data}:any) => {
														setImage(data.HighQualityImage)
														setContent({
															title: data.title,author: data.authors, description: data.description, lang: data.language,genres: data.categories,
															antalSide: data.pageCount, publishData: data.publishedDate })
														}).catch((err)=>
													{
														console.log(err)})
												})
											})
										}
									})
								})
							}
						})
						.catch((err: any) => {
							console.log(err, 'error')
						})
				}
			)
		}
	}
	const UploadBook = async () => {
		const epub = await UploadFile(EpubBlob, EpubUrlPath)
			const penData = content.publishData.substring(0, 4)
		const includes = AllBook?.find(book => book.Name == content.title)
		if (content.title, content.author, content.lang, epub, image, content.description, content.antalSide, content.publishData) {
			console.log(includes, 'includes')
			if (!includes) {
				await addUserBook({
					book: {
						epubDoc: epub,
						Image: image,
						Name: content.title,
						description: content.description,
						genre: content.genres,
						comments: [],
						autor: content.author,
						bookLanguage: content.lang,
						antalSider: content.antalSide,
						penData: penData,
						AutorUid: user.uid,
					}
				})
				
				setIsVisible(false)
				setContent({} as IMetaData)
			} else {
				Toast.show({
					type: 'error',
					text1: I18n.t('Book already exists'),
					text2: I18n.t('Please try again'),
				})
				if (includes?.id) {
					navigate('BookPage', {
						id: includes.id
					})
				}
				setIsVisible(false)
				setContent({} as IMetaData)
			}
		} else {
			Toast.show({
				type: 'error',
				text1: I18n.t('Error'),
				text2: I18n.t('Something went wrong'),
			})
			setIsVisible(false)
			setContent({} as IMetaData)
		}
	}
	return (
		<View className='h-full'>
			{content.title ? (
				<View className='flex-row'>
					<Image
						source={{ uri: image }}
						className=' h-[210px] rounded-lg w-[130px]'
					/>

					<View className='flex-1 ml-4'>
						<Text numberOfLines={2} className='text-white font-bold text-2xl mt-6'>
							{content.title ? content.title : I18n.t('None title')}
						</Text>
						<Text className='text-gray  text-lg mt-2 font-semibold mb-2'>
							{content.author ? content.author : I18n.t('None author')}
						</Text>

						<Text className='text-gray text-lg'>
							{' '}
							{content.lang ? content.lang : I18n.t('None language')}
						</Text>
						<View className='mt-2 flex-wrap flex-row'>
							{content.genres && content.genres.length ? (
								content.genres.map(item => {
									if (!item) return null
									return (
										<Text
											key={item}
											className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
										>
											{item}
										</Text>
									)
								})
							) : (
								<Text className='text-white text-md text-md font-bold bg-blue p-2 rounded-lg'>
									{I18n.t('None genres')}
								</Text>
							)}
						</View>
					</View>
				</View>
			) : (
				<Text className='text-2xl text-white font-bold items-center justify-center flex text-center mx-auto mt-auto'>
					{I18n.t('Selected item please')}
				</Text>
			)}
			<View className='mt-auto mb-8'>
				<TouchableOpacity 	onPress={() => {
					!content.title ? pickDocument() :  UploadBook()
				}} className=' justify-center items-center mx-auto w-[200px] bg-blue rounded-lg h-[80px]'>
					<Text
						className='text-2xl text-white font-bold'
					>
						{content.title ? I18n.t('Add book') : I18n.t('Select epub')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default AddBookPopup
