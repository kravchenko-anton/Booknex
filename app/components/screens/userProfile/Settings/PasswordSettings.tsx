import { updatePassword } from 'firebase/auth'
import I18n from 'i18n-js'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useUpdatePasswordMutation } from '../../../../store/api/user/mutation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import Field from '../../../ui/field/field'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'

const PasswordSettings = ({route}: any) => {
	const { uid } = route.params
	const {data: user} = useFetchSingleUserQuery(uid)
	const [UpdatePassword] = useUpdatePasswordMutation()
	const {control, handleSubmit} = useForm()
	const {goBack} = useTypedNavigation()
	const handleUpdatePassword = async (data: any) => {
		await UpdatePassword({email: user?.email, OldPassword: data.OldPassword, NewPassword:  data.NewPassword})
	goBack()
	}
	return <Layout>
		<Header className='mb-4 mt-4'>
			<Text	className='text-white text-2xl font-bold'>{I18n.t('PasswordSettings')}</Text>
		</Header>
		<View className='mt-4'>
			<Field control={control} name={'OldPassword'} placeholder={I18n.t('EnterOldPassword')} />
			<Field control={control} name={'NewPassword'} placeholder={I18n.t('EnterNewPassword')} />
		</View>
		
		<TouchableOpacity onPress={handleSubmit(handleUpdatePassword)} className='bg-primary p-2 mt-2 w-[50%] mx-auto rounded-md text-center justify-center items-center'>
			<Text className='text-2xl text-white font-bold'>
				{I18n.t('Send')}
			</Text>
		</TouchableOpacity>
	</Layout>
}

export default PasswordSettings
