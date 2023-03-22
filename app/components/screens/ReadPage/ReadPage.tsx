import { ReaderProvider } from '@epubjs-react-native/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import * as FileSystem from 'expo-file-system'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import ReaderComponent from './ReaderComponent'

const ReadPage = ({ route }: any) => {
	const { epub, LastReadPage, BookId, bookName } = route.params
	const { isConnected } = NetInfo.useNetInfo()
	const [OfflineEpub, setOfflineEpub] = useState(epub)
	const { StorageAccessFramework } = FileSystem
	const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '')
	const { navigate } = useTypedNavigation()
	const [Permission, setPermission] = useState('')
	useEffect(() => {
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
			
			try {
				const directoryUri = await AsyncStorage.getItem('permissionDirectoryUrl')
				if (!directoryUri) {
					const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
					if (!permissions.granted) {
						return
					} else {
						await AsyncStorage.setItem('permissionDirectoryUrl', permissions.directoryUri)
						setPermission(permissions.directoryUri)
					}
				} else {
					setPermission(directoryUri)
				}
				
				
				await StorageAccessFramework.createFileAsync(Permission, fileName, 'application/epub+zip')
					.then(async (uri) => {
						await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 })
					})
					.catch((e) => {
						console.log(e, 'error 1')
					})
			} catch (e) {
				console.log(e, 'error 2')
			}
			
		} catch (err) {
			console.log(err, 'error 3')
		}
	}
	
	const downloadFile = async (fileUrl: any) => {
		
		let fileName = bookName
		const downloadResumable = FileSystem.createDownloadResumable(
			fileUrl,
			downloadPath + fileName,
			{ cache: true })
		
		try {
			const downloadResult = await downloadResumable.downloadAsync()
			await saveAndroidFile(downloadResult?.uri, fileName)
			await FileSystem.readAsStringAsync(downloadResult?.uri as string, {
				encoding: FileSystem.EncodingType.Base64
			}).then(async (response) => {
				setOfflineEpub(response)
				await AsyncStorage.setItem('OfflineEpub' + epub, downloadResult?.uri as string)
			})
		} catch (e) {
			navigate('NoInternet')
		}
		
	}
	return (
		
		<ReaderProvider>
			<ReaderComponent LastReadPage={LastReadPage} BookId={BookId} epub={epub} ReadEpub={OfflineEpub} />
		</ReaderProvider>
	)
}

export default memo(ReadPage)
