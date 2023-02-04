import { useForm } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchAllBooksQuery } from '../../../store/api/books'
import { useFetchUserQuery } from '../../../store/api/user'
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
		<Layout>
			<Field control={control} name={'Search'} placeholder={'Type something...'} />
			{watch('Search') !== '' ? (
				<View className='h-full'>
					{Users.filter(user => user.name.includes(watch('Search'))).length > 0 ? (
						<ScrollView
							horizontal={true}
							className='h-[160px] mt-1'
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
					<AnimatedFlatList
						data={book.filter(item => item.Name.includes(watch('Search')))}
					/>
				</View>
			) : null}
		</Layout>
	)
}

export default Search
