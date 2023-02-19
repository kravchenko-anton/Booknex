import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import { useAction } from '../../../hook/useAction'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import Layout from '../../ui/Layout/Layout'
import Field from '../../ui/field/field'

const Auth = () => {
	const { control, handleSubmit } = useForm()
	const [isReg, setIsReg] = useState(false)
	const { register, login } = useAction()
	const { user } = useTypedSelector(state => state.auth)
	const { navigate } = useTypedNavigation()
	const onSubmit = async (data: any) => {
		isReg ? register(data) : login(data)
	}
	// if user register or login, user ben rederect to home page
	useEffect(() => {
		if (user) {
			navigate('Home')
		}
	}, [user])
	return (
		<Layout>
			<View className='h-full justify-center'>
				<View className='items-center'>
					<Text className='text-white font-bold text-4xl mb-4'>
						{isReg ? 'Register' : 'Login'}
					</Text>
					<View className='w-5/6'>
						<Field control={control} name={'email'} placeholder={'Email'} />
						<Field control={control} name={'password'} placeholder={'Password'} keyboardType={'visible-password'} />
					</View>
					<Pressable
						className='bg-primary rounded-md mt-4 pb-3 pt-3 pl-14 pr-14'
						onPress={handleSubmit(onSubmit)}
					>
						<Text className='text-white text-xl font-bold'>
							{isReg ? 'Register' : 'Login'}
						</Text>
					</Pressable>
				</View>

				<Text
					onPress={() => setIsReg(!isReg)}
					className='text-gray text-right mt-4 text-lg'
				>
					{!isReg ? 'Register' : 'Login'}
				</Text>
			</View>
		</Layout>
	)
}

export default Auth
