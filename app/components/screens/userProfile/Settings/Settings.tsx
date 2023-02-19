import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import firebase from 'firebase/compat'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAction } from '../../../../hook/useAction'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useUpdatePasswordMutation, useUpdateProfileMutation } from '../../../../store/api/user/mutation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import ClearUserLogo from '../../../ui/clearUserLogo'
import DialogPopup from '../../../ui/DialogPopup'
import Field from '../../../ui/field/field'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'
import Loader from '../../../ui/Loader'
import * as ImagePicker from 'expo-image-picker';
import { UploadFile } from '../uploadFile'
import { SettingsList } from './settingsList'
const Settings = ({route}: any) => {
		const { uid } = route.params
	const {goBack} = useTypedNavigation()
	const {data} = useFetchSingleUserQuery(uid)


	if (!data) return <Loader/>
	return <Layout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<Header className='mb-4 mt-4'>
				<Text	className='text-white text-2xl font-bold'>Settings</Text>
			</Header>
			<SettingsList uid={uid}/>
		</ScrollView>
	</Layout>
}

export default Settings
