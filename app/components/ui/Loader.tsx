import { FC } from 'react'
import { ActivityIndicator } from 'react-native'

export interface ILoader {
	rest?: any
}

const Loader: FC<ILoader> = ({ rest }) => {
	return <ActivityIndicator color='#702DF5' style={{ height: "100%" }}
	                          className='justify-center items-center' {...rest}
	                          size={'large'} />
}

export default Loader