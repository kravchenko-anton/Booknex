import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAction } from '../../../hook/useAction'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { IAuthFields } from '../../../store/auth/auth.interface'

export const useAuth = () => {
	const { control, handleSubmit } = useForm<IAuthFields>()
	const [isReg, setIsReg] = useState(false)
	const { register, login } = useAction()
	const { user } = useTypedSelector(state => state.auth)
	const { navigate } = useTypedNavigation()
	const onSubmit: SubmitHandler<IAuthFields> = async data => {
		isReg ? register(data) : login(data)
	}

	useEffect(() => {
		if (user) {
			navigate('Home')
		}
	}, [user])
	return { control, handleSubmit, isReg, setIsReg, onSubmit }
}
