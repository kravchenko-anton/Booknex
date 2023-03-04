import { Pressable, Text, View } from 'react-native'
import I18n from 'i18n-js'
import Layout from '../../ui/Layout/Layout'
import Field from '../../ui/field/field'
import { useAuth } from './useAuth'

const Auth = () => {
	const { control, handleSubmit, onSubmit, setIsReg, isReg } = useAuth()
	return (
		<Layout>
			<View className='h-full justify-center'>
				<View className='items-center'>
					<Text className='text-white font-bold text-4xl mb-4'>
						{isReg ? I18n.t('Register') : I18n.t('Login')}
					</Text>
					<View className='w-5/6'>
						<Field
							control={control}
							name={'email'}
							placeholder={I18n.t('EnterEmail')}
						/>
						<Field
							secureTextEntry={true}
							control={control}
							name={'password'}
							placeholder={I18n.t('EnterPassword')}
						/>
					</View>
					<Pressable
						className='bg-primary rounded-md mt-4 pb-3 pt-3 pl-14 pr-14'
						onPress={handleSubmit(onSubmit)}
					>
						<Text className='text-white text-xl font-bold'>
							{isReg ? I18n.t('Register') : I18n.t('Login')}
						</Text>
					</Pressable>
				</View>

				<Text
					onPress={() => setIsReg(!isReg)}
					className='text-gray text-right mt-4 text-lg'
				>
					{!isReg ? I18n.t('Register') : I18n.t('Login')}
				</Text>
			</View>
		</Layout>
	)
}

export default Auth
