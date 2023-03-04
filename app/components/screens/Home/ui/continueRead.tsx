import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useFetchSingleBookQuery } from '../../../../store/api/book/query'
import HorizontalBookItem from '../../../ui/horizontalBookItem/horizontalBookItem'

export interface IContinueRead {
	BookId: string
	LastReadPage: string
	epub: string
	interest: number
}

const ContinueRead = () => {
	const [parsedBookData, setParsedBookData] = useState({} as IContinueRead)
	const { navigate } = useTypedNavigation()
	useEffect(() => {
		const parseLastPage = async () => {
			try {
				const data = await AsyncStorage.getItem('ContinueRead')
				if (data != null) {
					setParsedBookData(JSON.parse(data))
				}
			} catch (e) {
				console.log(e)
			}
		}
		parseLastPage()
		
	}, [])
	
	const { data: book } = useFetchSingleBookQuery(parsedBookData.BookId, {
		skip: !parsedBookData.BookId
	})
	if (!book || !parsedBookData) return null
	return <View className='p-0 m-0'>
		
		<Text className='text-2xl text-white font-bold mt-4 mb-4'>{I18n.t('Continue Reading')} 📰 </Text>
		<HorizontalBookItem imageUrl={book.Image} navigate={() => navigate('ReadPage', {
			BookId: book.id,
			epub: book.epubDoc,
			LastReadPage: parsedBookData.LastReadPage
		})} title={book.Name} author={book.autor} buttonText={I18n.t('Continue')}>
			<Text className='text-gray text-md ' numberOfLines={2}>{book.description}</Text>
			<View className='flex-row items-center'>
				<AnimatedCircularProgress
					size={40}
					width={8}
					fill={parsedBookData.interest ? parsedBookData.interest * 100 : 0}
					tintColor='#702DF5'
					tintTransparency={true}
					backgroundColor='#2c1262'
				
				/>
				<Text numberOfLines={1}
				      className='text-2xl text-white ml-3 font-bold mt-4 mb-4'>{(parsedBookData.interest * 100).toString().substring(0, 4)}% </Text>
			</View>
		</HorizontalBookItem>
	</View>
}

export default ContinueRead
