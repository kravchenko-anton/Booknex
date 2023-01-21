import cn from 'clsx'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({ control, rules, name, ...rest }: IField<T>): JSX.Element => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
				<>
					<View
						className={cn('bg-blue border w-full rounded-md pb-2.5 pt-2.5 px-4 my-1.5',
							error ? 'border-red' : 'border-blue'
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
					{error && <Text className='text-red'>{error.message}</Text>}
				</>
			)}
		/>
	)
}

export default Field
