import I18n from 'i18n-js'
import Lottie from 'lottie-react-native'
import { useRef } from 'react'
import { Platform, Text, View } from 'react-native'
import Layout from './Layout/Layout'

const NoInternet = () => {
	let animationRef = useRef<Lottie>(null)
	return <Layout className='h-full'>
		<View className='flex-1 mt-4 rounded-lg justify-center items-center'>
			<Lottie
				renderMode={Platform.OS === 'ios' ? 'HARDWARE' : 'SOFTWARE'}
				loop={true}
				ref={animationRef}
				style={{ height: 300, width: 400 }}
				onLayout={() => animationRef.current?.play()}
				source={require(
					'../../assets/9293-not-signal-no-internet-access-and-connection-lost-placeholder.json'
				)}
			/>
			<Text
				className='text-3xl mt-4 font-bold text-white text-center justify-center'>{I18n.t('dontHaveInternetAndSavedData')} 🤷‍♂️</Text>
		</View>
	</Layout>
}

export default NoInternet
