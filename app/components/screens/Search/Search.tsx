import { useForm } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchAllBooksQuery } from '../../../store/api/book/query'
import { useFetchUserQuery } from '../../../store/api/user/query'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'

const Search = () => {
	const { control, watch } = useForm()
	const { data: book } = useFetchAllBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const { data: Users } = useFetchUserQuery(null)
	if (!book || !Users) return <Loader />
	return (
		<Layout className='h-full'>
			<Field control={control} name={'Search'} placeholder={'Type something...'} />
			<AnimatedFlatList
				data={book.filter(item => watch('Search') ? item.Name.includes(watch('Search')) : item)}
			>
				<View>
					{watch('Search') != '' &&
					Users.filter(user => user.name.includes(watch('Search'))).length > 0 ? (
						<ScrollView
							horizontal={true}
							className='h-[130px] mt-1'
							showsHorizontalScrollIndicator={false}
						>
							{Users.filter((user: { name: string }) =>
								user.name.includes(watch('Search'))
							).map(user => (
								<Pressable
									onPress={() =>
										navigate('AutorProfile', {
											uid: user.uid
										})
									}
									key={user.uid}
									className='items-center text-center h-full mr-3'
								>
									<ClearUserLogo letter={user.name} width={100} height={100} />
									<Text
										numberOfLines={1}
										className='mt-1 max-w-[80px] text-center text-white font-bold'
									>
										{user.name}
									</Text>
								</Pressable>
							))}
						</ScrollView>
					) : null}
				</View>
			</AnimatedFlatList>
		</Layout>
	)
}

export default Search
