import React, { FC, useRef } from 'react'
import Canvas from 'react-native-canvas'
import Toast from 'react-native-toast-message'
import { useAddUserBookMutation } from '../../../store/api/book/mutation'
import { IaddBook } from './addBookPopup.interface'
import { parseEpubMetadataPath, parseXML } from './ReadXML'
import { UploadFile } from './uploadFile'
import {useState} from "react";
import {StyleSheet, Text, View, Pressable, Alert, Image} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
var JSZip = require("jszip");
interface IMetaData {
		title: string
	author:	string
	description: string
	lang:	string
	genres: string[]
}
const AddBookPopup: FC<IaddBook> = ({ user, setIsVisible, CurrentUser }) => {
	const [addUserBook] = useAddUserBookMutation()
	const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png');
	const [content, setContent] = useState({} as IMetaData);

	
	const pickDocument = async () => {
		setContent({} as IMetaData);
		const zipObj = new JSZip();
		let result = await DocumentPicker.getDocumentAsync({
			type: ["application/epub+zip", "application/oebps-package+xml"],
		});
		
		if (result.type !== 'cancel') {
			FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
				.then((data) => {
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
											setContent({ ...data.xmlMetadata, genres: data.genres });
											if(data.coverImageName) {
												const coverFile = zip.file(`${data.coverImageName}`)
												if (coverFile) {
													coverFile.async('base64').then((content: any) => {
														console.log(content, 'content');
														setImage(`data:image/png;base64,${content}`)
													})
												} else {
													console.log('no cover image')
												}
											}
										})
										})
									}
									})
								})
							}
						}
						)
						.catch((err: any) => {
							console.log(err, 'error')
				})
		})}
		
	};
	
	
	const UploadBook = async (data: any) => {
		const image = await UploadFile('blob', data.Name)
		const epub = await UploadFile('blob', 'ads')
		addUserBook({
			UserId: user.uid,
			book: {
				epubDoc: epub,
				Image: image,
				Name: data.Name,
				description: data.Description,
				genre: ['ads'],
				comments: [],
				autor: [CurrentUser.name],
				bookLanguage: data.bookLanguage,
				antalSider: data.antalSider,
				penData: data.penData
			}
		})
	}
	return (
		<View className='h-full'>
			{content.title ?
			<View className='flex-row'>
					<Image source={{ uri: image}}
					       className=' h-[210px] rounded-lg w-[130px]'/>
		
				<View  className='flex-1 ml-4'>
					<Text numberOfLines={2} className='text-white font-bold text-2xl mt-6'>
						{content.title ?	content.title : 'None title'}
					</Text>
					<Text className='text-gray  text-lg mt-2 font-semibold mb-2'>
						{content.author ?	content.author : 'None author'}
					</Text>
			
					<Text className='text-gray text-lg'>	{content.lang ?	content.lang : 'None languages'}</Text>
					<View className='mt-2 flex-wrap flex-row'>
						{content.genres && content.genres.length ? content.genres.map(item => {
							if (!item) return null
						 return	(
								<Text
									key={item}
									className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
								>
									{item}
								</Text>
							)
						}) : <Text className='text-white text-md text-md font-bold bg-blue p-2 rounded-lg'>None genres  😭</Text>}
					</View>
				</View>
			</View>
			: <Text className='text-2xl text-white font-bold items-center justify-center flex text-center mx-auto mt-auto'>Selected item please</Text> }
			<View className='mt-auto mb-8'>
						<View className=' justify-center items-center mx-auto w-[200px] bg-blue rounded-lg h-[80px]'>
							<Text onPress={() => pickDocument()} className='text-2xl text-white font-bold'>Add Book</Text>
					</View>

		</View>
		</View>
	)
}

export default AddBookPopup
