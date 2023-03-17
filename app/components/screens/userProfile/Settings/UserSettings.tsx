import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import I18n from 'i18n-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useUpdateProfileMutation } from '../../../../store/api/user/mutation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import ClearUserLogo from '../../../ui/clearUserLogo'
import Field from '../../../ui/field/field'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'
import Loader from '../../../ui/Loader'
import { UploadFile } from '../uploadFile'

const UserSettings = ({ route }: any) => {
	const { uid } = route.params
	const { goBack, navigate } = useTypedNavigation()
	const { data } = useFetchSingleUserQuery({ uid, navigate })
	const [selectedImage, setSelectedImage] = useState(null)
	const [selectedBlob, setSelectedBlob] = useState<Blob>()
	const [UpdateProfile] = useUpdateProfileMutation()
	const { control, handleSubmit } = useForm()
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})
		
		if (!result.canceled) {
			// @ts-ignore
			setSelectedImage(result.assets[0].uri)
			const response = await fetch(result.assets[0].uri)
			const blob = await response.blob()
			setSelectedBlob(blob)
		}
	}
	const handleUpdate = async ({ Name, Email, ConfirmPassword }: any) => {
		console.log(Name, 'name', Email, 'email', ConfirmPassword, 'password')
		if (selectedBlob) {
			const image = await UploadFile(selectedBlob, Name + '.jpg')
			await UpdateProfile({
				name: Name != '' && Name != undefined ? Name : data?.name,
				email: Email != '' && Email != undefined ? Email : data?.email,
				photoURL: selectedImage ? image : data?.photoURL,
				uid: uid,
				oldEmail: data?.email,
				ConfirmPassword: ConfirmPassword
			})
		} else {
			await UpdateProfile({
				name: Name != '' && Name != undefined ? Name : data?.name,
				email: Email != '' && Email != undefined ? Email : data?.email,
				photoURL: data?.photoURL,
				uid: uid,
				oldEmail: data?.email,
				ConfirmPassword: ConfirmPassword
			})
		}
		goBack()
	}
	if (!data) return <Loader />
	return (
		<Layout>
			<ScrollView>
				<Header className='mb-4 mt-4'>
					<Text className='text-white text-2xl font-bold'>
						{I18n.t('ProfileSettings')}
					</Text>
				</Header>
				<View className='items-center justify-center'>
					<Pressable onPress={() => pickImage()} className='relative'>
						{(!data?.photoURL && selectedImage) ||
						(data?.photoURL && !selectedImage) ||
						(data.photoURL && selectedImage) ? (
							<Image
								source={{ uri: selectedImage ? selectedImage : data?.photoURL }}
								className='w-[150px] h-[150px] rounded-full'
							/>
						) : (
							<ClearUserLogo height={150} width={150} letter={data.email} />
						)}
						<View className='absolute right-0 bottom-0 bg-blue p-4 rounded-full items-center justify-center'>
							<Feather name='edit' size={24} color='white' />
						</View>
					</Pressable>
				</View>
				<View className='mt-6'>
					<Field control={control} name={'Name'} rules={{
						maxLength: {
							value: 15,
							message: I18n.t('Name must be less than 15 characters')
						}
					}} placeholder={I18n.t('EnterName')} />
					<Field
						control={control}
						name={'Email'}
						placeholder={I18n.t('EnterEmail')}
					/>
					<Field
						secureTextEntry={true}
						control={control}
						rules={{
							required: I18n.t('EnterPassword')
						}}
						name={'ConfirmPassword'}
						placeholder={I18n.t('EnterPassword')}
					/>
					<TouchableOpacity
						onPress={handleSubmit(handleUpdate)}
						className='bg-primary p-2 mt-2 w-[50%] mx-auto rounded-md text-center justify-center items-center'
					>
						<Text className='text-2xl text-white font-bold'>{I18n.t('Send')}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</Layout>
	)
}

export default UserSettings
