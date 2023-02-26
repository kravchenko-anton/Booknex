import I18n from 'i18n-js'
import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import AnimatedScrollView from 'react-native-reanimated/lib/types/reanimated2/component/ScrollView'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import {
	useFetchActionBooksQuery,
	useFetchAllBooksQuery,
	useFetchMostPopularBooksQuery
} from '../../../store/api/book/query'
import { useFetchUserQuery } from '../../../store/api/user/query'
import AnimatedBookFlatList from '../../ui/animateList/animatedBookFlatList'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'

const Search = () => {
	const { control, watch } = useForm()
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchAllBooksQuery(null)
	const { data: Users } = useFetchUserQuery(null)
	const { data: ActionBook } = useFetchActionBooksQuery(null)
	const { data: MostPopular } = useFetchMostPopularBooksQuery(null)
	if (!book || !Users || !ActionBook || !MostPopular) return <Loader />
	return (
		<Layout className='h-full'>
			<Field
				control={control}
				name={'Search'}
				placeholder={I18n.t('TypeSomething')}
			/>
			{watch('Search', '') !== '' ? (
				<AnimatedFlatList
					data={book.filter(item => item.Name.includes(watch('Search')))}
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
										{user.photoURL ? (
											<Image
												source={{ uri: user.photoURL }}
												className='w-[100px] border-2 border-primary h-[100px] rounded-full'
											/>
										) : (
											<ClearUserLogo letter={user.name} width={100} height={100} />
										)}
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
			) : (
				<View className='flex-1'>
					<ScrollView showsVerticalScrollIndicator={false} className='h-full flex-1'>
						<View className='mb-6'>
							<Text className='text-white text-2xl font-bold mt-4 mb-4'>
								{I18n.t('MostPopularBooks')} 😎
							</Text>
							<AnimatedBookFlatList data={MostPopular.slice(0, 10)} />
						</View>
						<Text className='text-white text-2xl font-bold mt-4 mb-4'>
							{I18n.t('ActionBooks')} 👨‍🎤
						</Text>
						<AnimatedBookFlatList data={ActionBook.slice(0, 10)} />

						<View className='my-6'>
							<Text className='text-white text-2xl font-bold mt-4 mb-4'>
								{I18n.t('MayBeYouLike')} 😍
							</Text>
							<AnimatedBookFlatList data={book.slice(0, 10)} />
						</View>
					</ScrollView>
				</View>
			)}
		</Layout>
	)
}

export default Search
