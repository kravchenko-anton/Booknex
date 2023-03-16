import { ReaderProvider } from '@epubjs-react-native/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import * as FileSystem from 'expo-file-system'
import { useLayoutEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import ReaderComponent from './ReaderComponent'

const ReadPage = ({ route }: any) => {
	const { isConnected } = NetInfo.useNetInfo()
	const { epub, LastReadPage, BookId, bookName } = route.params
	const [OfflineEpub, setOfflineEpub] = useState(epub)
	const { StorageAccessFramework } = FileSystem
	const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '')
	const { navigate } = useTypedNavigation()
	useLayoutEffect(() => {
		const FetchEpub = async () => {
			const data = await AsyncStorage.getItem('OfflineEpub' + epub)
			if (!isConnected) {
				if (data != null) {
					await FileSystem.getInfoAsync(data).then((response) => {
						const { exists, uri } = response
						if (exists) {
							FileSystem.readAsStringAsync(uri, {
								encoding: FileSystem.EncodingType.Base64
							}).then((response) => {
								setOfflineEpub(response)
							})
						}
					})
				} else {
					await downloadFile(epub)
				}
			}
		}
		FetchEpub()
	}, [])
	
	
	const saveAndroidFile = async (fileUri: any, fileName = bookName) => {
		try {
			const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 })
			
			const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
			if (!permissions.granted) {
				return
			}
			try {
				await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/epub+zip')
					.then(async (uri) => {
						await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 })
					})
					.catch((e) => {
					})
			} catch (e) {
			}
			
		} catch (err) {
		}
	}
	
	const downloadFile = async (fileUrl: any) => {
		
		let fileName = bookName
		const downloadResumable = FileSystem.createDownloadResumable(
			fileUrl,
			downloadPath + fileName,
			{}
		)
		
		try {
			const downloadResult = await downloadResumable.downloadAsync()
			await saveAndroidFile(downloadResult?.uri, fileName)
			await FileSystem.readAsStringAsync(downloadResult?.uri as string, {
				encoding: FileSystem.EncodingType.Base64
			}).then((response) => {
				setOfflineEpub(response)
				AsyncStorage.setItem('OfflineEpub' + epub, downloadResult?.uri as string)
			})
		} catch (e) {
			console.log(e)
			navigate('NoInternet')
		}
		
	}
	return (
		
		<ReaderProvider>
			<ReaderComponent LastReadPage={LastReadPage} BookId={BookId} epub={epub} ReadEpub={OfflineEpub} />
		</ReaderProvider>
	)
}

export default ReadPage
