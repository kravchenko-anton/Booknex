import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSingleBook = async (book: any, setLastReadPage: any) => {
	try {
		const value = await AsyncStorage.getItem(book.epubDoc)
		if (value !== null) {
			setLastReadPage(value)
		}
		
	} catch (e) {
		alert('Failed to fetch from storage!')
		console.log(e)
	}
	
	
}