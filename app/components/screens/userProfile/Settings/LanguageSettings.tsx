import { Text, View } from 'react-native'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'

const LanguageSettings = () => {
	return <Layout>
		<Header className='mb-4 mt-4'>
			<Text	className='text-white text-2xl font-bold'>Language settings</Text>
		</Header>
		<Text className='text-white text-2xl font-bold'>LanguageChange</Text>
	</Layout>
}

export default LanguageSettings
