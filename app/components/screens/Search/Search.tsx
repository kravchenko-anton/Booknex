import I18n from 'i18n-js'
import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import {
	useFetchAllBooksQuery,
	useFetchMostPopularBooksQuery,
	useFetchRandomBooksQuery
} from '../../../store/api/book/query'
import { useFetchUserQuery } from '../../../store/api/user/query'
import AnimatedBookFlatList from '../../ui/animateList/animatedBookFlatList'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'
import HorizontalBookItem from '../../ui/horizontalBookItem/horizontalBookItem'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import Carousel from './ui/Carousel'

const Search = () => {
	const { control, watch } = useForm()
	const { navigate } = useTypedNavigation()
	const { data: book } = useFetchAllBooksQuery(null)
	const { data: Users } = useFetchUserQuery(null)
	const { data: MostPopular } = useFetchMostPopularBooksQuery(null)
	const { data: RandomBook } = useFetchRandomBooksQuery(null)
	console.log(Users?.filter((user: { name: string }) =>
		user.name.includes(watch('Search'))).length ? 134 : 0, 'ads')
	if (!book || !Users || !MostPopular || !RandomBook) return <Loader />
	return (
		<Layout className=' p-0 h-full'>
			<View className='p-3 m-0 w-full'>
				<Field
					control={control}
					name={'Search'}
					placeholder={I18n.t('TypeSomething')}
				/>
			</View>
			{watch('Search', '') !== '' ? (
				<View className='p-3 pt-0 flex-1'>
					<AnimatedFlatList
						data={book.filter(item => item.Name.includes(watch('Search')))}
						contentHeight={Users?.filter((user: { name: string }) =>
							user.name.includes(watch('Search'))).length ? 134 : 0}>
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
					</AnimatedFlatList>
				</View>
			) : (
				<>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text className='text-2xl text-center mb-4 text-white font-bold'>{I18n.t('MayBeYouLike')} 🥰</Text>
						<Carousel />
						
						<Text className='text-white ml-3 text-2xl font-bold mt-4 mb-2'>
							{I18n.t('Random Books')} 😜</Text>
						<View className='p-3'>
							
							<HorizontalBookItem imageUrl={RandomBook.Image} navigate={() => navigate('BookPage', { id: RandomBook.id })}
							                    title={RandomBook.Name} author={RandomBook.autor} buttonText={'Read'}>
								<View className='flex-row items-center mb-[5px]'>
									<AirbnbRating
										size={20}
										defaultRating={Object.values(RandomBook.comments).reduce((t, { rating }) => t + rating, 0) /
											(RandomBook.comments.length
												? RandomBook.comments.length
												: RandomBook.comments.constructor.length)}
										count={5}
										showRating={false}
										isDisabled={true} />
									<Text className='text-white text-lg font-bold'>
										/ ({Object.values(RandomBook.comments).length})
									</Text>
								</View>
								
								<Text numberOfLines={2} className='mb-[9px] text-gray text-lg'> {RandomBook.description}</Text>
							</HorizontalBookItem>
							<Text className='text-white text-2xl font-bold mt-10 mb-4'>
								{I18n.t('MostPopularBooks')} 😎
							</Text>
							<AnimatedBookFlatList data={MostPopular.slice(0, 10)} />
						</View>
					</ScrollView>
				</>
			
			
			)}
		</Layout>
	)
}

export default Search
