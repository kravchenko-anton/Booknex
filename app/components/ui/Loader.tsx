import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

const Loader = ({ ...rest }: ActivityIndicatorProps) => {
	return (
		<ActivityIndicator
			color='#702DF5'
			style={{ height: '100%' }}
			className='justify-center items-center'
			size={'large'}
			{...rest}
		/>
	)
}

export default Loader
