import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import { useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import {
	useAddBookToFavoriteMutation,
	useDeleteBookFromFavoriteMutation,
	useFetchSingleBookQuery
} from '../../../store/api/books'
import { useFetchMyProfileQuery } from '../../../store/api/user'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import CommentElement from '../../ui/ratingElement'
import Statistics from '../../ui/statistics'

const SingleBookPage = ({ route }: any) => {
	const { id } = route.params
	const { goBack, navigate } = useTypedNavigation()
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { data: book, isLoading, error } = useFetchSingleBookQuery(id)
	const [addBook] = useAddBookToFavoriteMutation()
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const [removeFromFavorite] = useDeleteBookFromFavoriteMutation()
	const [visibleButton, setVisibleButton] = useState(true)
	if (!book) return <Loader  />
	const total = Object.values(book.comments).reduce((t, { rating }) => t + rating, 0) / book.comments.constructor.length
	const isFavorite = Profile?.favoritesBook?.some(item => item.id === id)
	return <Layout>
		<View className='h-full'>
		
		{visibleButton ?
			<Pressable onPress={() => navigate('ReadPage', {
				epub: book.epubDoc
			})} className=' absolute z-10 bottom-3 flex-row  left-24 right-24 items-center justify-center bg-primary rounded-lg p-4'>
				<FontAwesome5 name="book-reader" size={24} color="white" />
				<Text className=' ml-5 text-white text-xl font-bold'>Go Read</Text></Pressable> : null}
		
		<ScrollView onScrollAnimationEnd={() => setVisibleButton(!visibleButton)} showsVerticalScrollIndicator={false}>
			
			<View className='flex-row justify-between mt-4 '>
				<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
				{!isFavorite ? <Feather onPress={() => addBook({ currentUserUID: StateUser?.uid, book })} name='heart' size={24}
				                        color='white' /> :
					<AntDesign onPress={() => removeFromFavorite({ currentUserUID: StateUser?.uid, book })} name='delete'
					           size={24}
					           color='white' />}
			</View>
			
			<View className='flex-row  justify-between mt-8'>
				<Image source={{ uri: book.Image }} className='w-[150px] mr-3 h-[250px] rounded-xl' />
				<View className='flex-1'>
					<Text
						className='text-white font-bold text-2xl mt-6'>{book.Name}</Text>
					<Text
						className='text-gray  text-lg mt-2 mb-2'>{book.autor.join(', ')}</Text>
					
					<View className='flex-row gap-1 items-center mb-2'>
						<Rating
							ratingCount={5} tintColor='#121212' startingValue={total} showRating={false} imageSize={24}
							readonly={true}
							jumpValue={2}
						/>
						<Text className='text-white text-lg font-bold'>/ ({Object.values(book.comments).length})</Text>
					</View>
					<View className='mt-2 flex-wrap flex-row'>
						{book.genre.map(item => (
							<Text key={item} className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'>{item}</Text>
						))}
					</View>
				</View>
			</View>
			<Statistics FirstDescription={'Years'} FirstHeading={book.penData} SecondHeading={book.antalSider.toString()}
			            SecondDescription={'Pages'} ThirdHeading={Object.values(book.comments).length.toString()}
			            ThirdDescription={'Revies'} />
			<View>
				<Text className='text-white  font-bold  text-2xl mt-6'>Description</Text>
				<Text numberOfLines={4} className='text-gray text-[16px] mt-2'>{book.description}</Text>
			</View>
			
			<View className='flex-row justify-between
			items-center'>
				<Text className='text-white  font-bold  text-2xl mt-6'>Revie</Text>
				<Text className='text-gray text-lg mt-6'>Add</Text>
			
			</View>
			<View className='mb-2 flex-1'>
				{book.comments.length ? book.comments.map(comments => (
					<CommentElement key={comments.create_At} rating={comments.rating} BookId={comments.BookId}
					                create_At={comments.create_At}
					                message={comments.message} user={comments.user} />
				)) : <Text className='text-gray text-xl'>None review!</Text>}
			</View>
		
		</ScrollView>
		</View>
	</Layout>
}

export default SingleBookPage