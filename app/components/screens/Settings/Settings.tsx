import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Pressable, Text, View } from 'react-native'
import { useFetchMyProfileQuery } from '../../../store/api/user'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'
import Loader from '../../ui/Loader'

const Settings = ({ route }: any) => {
	const { uid } = route.params
	const { data: user } = useFetchMyProfileQuery(uid)
	const [ImageUrlPatch, setImageUrlPatch] = useState(undefined)
	const [ImageBlob, setImageBlob] = useState<Blob>()
	const { control } = useForm()
	const pickImage = async () => {
		const result: any = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
		if (result != null) {
			const uri = await fetch(result.uri)
			const blob = await uri.blob()
			setImageBlob(blob)
			setImageUrlPatch(result.name)
		}
	}
	if (!user) return <Loader />
	return <View className=' justify-center items-center flex-1 h-full'>
		{user?.photoURL ?
			<Image source={{ uri: user.photoURL }}
			       className='w-[200px] h-[200px] rounded-full' /> :
			<ClearUserLogo height={200} width={200} letter={user.name} />}
		<View className='mt-4 w-5/6'>
			<Field control={control} name={'Name'} placeholder={'Name'} className='text-white' />
			<Field control={control} name={'Email'} placeholder={'Email'} />
			<Field control={control} name={'password'} placeholder={'Password change'} />
			
			<Pressable className='bg-primary p-2 w-[150px] ml-auto mt-4 rounded-lg items-center justify-end flex '><Text
				className='text-white text-2xl font-bold'>Upload</Text></Pressable>
		</View>
	
	</View>
}

export default Settings