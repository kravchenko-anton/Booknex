import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchAllBooksQuery } from '../../../store/api/books'
import { useFetchUserQuery } from '../../../store/api/user'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import Field from '../../ui/field/field'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'

const Search = () => {
	const { control, watch } = useForm()
	const { data: book, isLoading, error } = useFetchAllBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const { data: Users } = useFetchUserQuery(null)
	if (!book || isLoading) return <Loader />
	return <Layout>
		<Field control={control} name={'Search'} placeholder={'Type something...'} />
		<View className='h-full'>
			<AnimatedFlatList data={book.filter(item => item.Name.includes(watch('Search')))} />
		</View>
	</Layout>
}

export default Search