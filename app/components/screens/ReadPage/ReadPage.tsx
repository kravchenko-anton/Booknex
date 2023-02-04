import { ReaderProvider } from '@epubjs-react-native/core'
import Loader from '../../ui/Loader'
import ReaderComponent from './ReaderComponent'

const ReadPage = ({ route }: any) => {
	const { epub, LastReadPage } = route.params
	if (!epub) return <Loader />
	return (
		<ReaderProvider>
			<ReaderComponent LastReadPage={LastReadPage} epub={epub} />
		</ReaderProvider>
	)
}

export default ReadPage
