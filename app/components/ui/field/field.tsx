import cn from 'clsx'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({
	control,
	rules,
	name,
	NoError,
	...rest
}: IField<T>): JSX.Element => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View
						className={cn(
							'bg-blue border-2 w-full rounded-md pb-2.5 pt-2.5 px-4 my-1.5',
							error ? 'border-[#ff0000]' : 'border-white'
						)}
					>
						<TextInput
							autoCapitalize={'none'}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholderTextColor='white'
							value={(value || '').toString()}
							className='text-white text-base font-bold '
							{...rest}
						/>
					</View>
					{!NoError ? error && <Text className='text-white font-bold m-0 text-md'>{error.message}</Text> : null}
				</>
			)}
		/>
	)
}

export default Field
