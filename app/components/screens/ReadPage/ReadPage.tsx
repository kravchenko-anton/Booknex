import { ReaderProvider } from '@epubjs-react-native/core'
import Loader from '../../ui/Loader'
import ReaderComponent from './ReaderComponent'

const ReadPage = ({ route }: any) => {
	const { epub, LastReadPage, BookId } = route.params
	if (!epub) return <Loader />
	return (
		<ReaderProvider>
			<ReaderComponent LastReadPage={LastReadPage} BookId={BookId} epub={epub} />
		</ReaderProvider>
	)
}

export default ReadPage
