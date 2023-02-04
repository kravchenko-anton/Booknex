import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../utils/firebase'

export const UploadFile = (blobFile: any, fileName: any): Promise<string> => {
	if (!blobFile) return Promise.reject('blobFile is missing')
	const sotrageRef = ref(storage, fileName)
	const uploadTask = uploadBytesResumable(sotrageRef, blobFile)
	return new Promise((resolve, reject) => {
		uploadTask.on(
			'state_changed',
			null,
			error => reject(error),
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
				resolve(downloadURL)
			}
		)
	})
}
