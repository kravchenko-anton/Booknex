import I18n from 'i18n-js'
import { ScrollView, Text } from 'react-native'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useFetchSingleUserQuery } from '../../../../store/api/user/query'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'
import Loader from '../../../ui/Loader'
import { SettingsList } from './settingsList'

const Settings = ({ route }: any) => {
	const { uid } = route.params
	const { navigate } = useTypedNavigation()
	const { data } = useFetchSingleUserQuery({ uid, navigate })
	if (!data) return <Loader />
	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header className='mb-4 mt-4'>
					<Text className='text-white text-2xl font-bold'>{I18n.t('Settings')}</Text>
				</Header>
				<SettingsList uid={uid} />
			</ScrollView>
		</Layout>
	)
}

export default Settings
