import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { AirbnbRating, Rating } from 'react-native-ratings'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import {
	useAddBookReviewMutation,
	useAddBookToFavoriteMutation,
	useDeleteBookFromFavoriteMutation,
	useFetchSingleBookQuery
} from '../../../store/api/books'
import { useFetchMyProfileQuery } from '../../../store/api/user'
import { animation, BottomAnimation, BottomAnimationEndToStart } from '../../../utils/TextAnimation'
import { useScaleOnMount } from '../../../utils/useBounces'
import Field from '../../ui/field/field'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import CommentElement from '../../ui/ratingElement'
import Statistics from '../../ui/statistics'

const SingleBookPage = ({ route }: any) => {
	//TODO: small component, add all logic in oher component
	const { id } = route.params
	const { goBack, navigate } = useTypedNavigation()
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { control, reset, handleSubmit } = useForm()
	const { data: book, isLoading, error } = useFetchSingleBookQuery(id)
	const [addBook] = useAddBookToFavoriteMutation()
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const [removeFromFavorite] = useDeleteBookFromFavoriteMutation()
	const [isVisible, setIsVisible] = useState(false)
	const [visibleButton, setVisibleButton] = useState(true)
	const [RatingCount, setRatingCount] = useState(0)
	const [addBookReview] = useAddBookReviewMutation()
	const [lastReadPage, setLastReadPage] = useState('')
	const { styleAnimation } = useScaleOnMount()
	
	useFocusEffect(() => {
		const parseLastPage = async () => {
			try {
				// @ts-ignore, if using after !book i see error 'more rerenders'
				const value = await AsyncStorage.getItem(book.epubDoc)
				if (value !== null) {
					setLastReadPage(value)
				}
			} catch (e) {
			}
		}
		parseLastPage()
	})
	if (!book || !Profile) return <Loader />
	const total = Object.values(book.comments).reduce((t, { rating }) => t + rating, 0) / (book.comments.length ? book.comments.length : book.comments.constructor.length)
	const isFavorite = Profile?.favoritesBook?.some(item => item.id === book.id)
	
	
	const Favoritedata = {
		Image: book.Image,
		Name: book.Name,
		genre: book.genre,
		autor: book.autor,
		description: book.description,
		id: book.id
	}
	
	const SubmitReview = (data: any) => {
		const RevieStructire = {
			message: data.message,
			rating: (RatingCount !== 0) ? RatingCount : 3,
			create_At: new Date(),
			userUid: Profile.uid
		}
		addBookReview({ id, rating: RevieStructire, profile: Profile })
		reset()
	}
	return <Layout>
		<View className='h-full'>
			<ModalPopup height={300} isVisible={isVisible} setIsVisible={setIsVisible} title={'Add review'}>
				<AirbnbRating
					size={40}
					defaultRating={3}
					
					count={5}
					onFinishRating={(raitingCount) => setRatingCount(raitingCount)}
				/>
				<View className='h-full items-end'>
					<Field control={control} name={'message'} placeholder={'Stay Message'}
					       className=' text-start' rules={{
						required: 'Please, stay message!',
						minLength: {
							value: 20,
							message: 'You text must be a minimum 20 letter!'
						}
					}} />
					<Pressable onPress={handleSubmit(SubmitReview)}
					           className='bg-primary p-2  rounded-lg flex  mt-2 w-[200px]'><Text
						className='text-white font-bold text-2xl text-center'>Send
						Review</Text></Pressable>
				</View>
			</ModalPopup>
			
			
			<Animatable.View className=' absolute z-50 bottom-3 flex-row left-28 right-28 items-center justify-between'
			                 animation={visibleButton ? BottomAnimation : BottomAnimationEndToStart}>
				<Pressable
					className=' bg-primary rounded-lg p-4 flex-row justify-between w-full'
					onPress={() => navigate('ReadPage', {
						epub: book.epubDoc, LastReadPage: lastReadPage
					})}>
					<Text className=' text-white text-xl font-bold'>Go Read</Text>
					<FontAwesome5 name='book-reader' size={24} color='white' />
				</Pressable>
			</Animatable.View>
			<ScrollView onTouchEndCapture={() => setVisibleButton(!visibleButton)}
			            showsVerticalScrollIndicator={false}>
				
				<View className='flex-row justify-between mt-4 '>
					<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
					{!isFavorite ?
						<Feather onPress={() => addBook({ currentUserUID: StateUser?.uid, book: Favoritedata })} name='heart'
						         size={24}
						         color='white' /> :
						<AntDesign onPress={() => removeFromFavorite({ currentUserUID: StateUser?.uid, book: Favoritedata })}
						           name='delete'
						           size={24}
						           color='white' />}
				</View>
				
				<View className='flex-row  justify-between mt-8'>
					<Animated.View entering={FadeInDown} style={styleAnimation}>
						<Image source={{ uri: book.Image }} className='w-[150px] mr-3 h-[250px] rounded-xl' />
					</Animated.View>
					<Animatable.View animation={animation} className='flex-1'>
						<Text
							className='text-white font-bold text-2xl mt-6'>{book.Name}</Text>
						<Text
							className='text-gray  text-lg mt-2 font-semibold mb-2'>{book.autor.join(', ')}</Text>
						
						<View className='flex-row gap-1 items-center mb-2'>
							<Rating
								ratingCount={5} tintColor='#121212' startingValue={total} showRating={false} imageSize={24}
								readonly={true}
								jumpValue={1}
							/>
							<Text className='text-white text-lg font-bold'>/ ({Object.values(book.comments).length})</Text>
						</View>
						<Text
							className='text-gray text-lg'>{book.bookLanguage}</Text>
						<View className='mt-2 flex-wrap flex-row'>
							{book.genre.map(item => (
								<Text key={item} className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'>{item}</Text>
							))}
						</View>
					</Animatable.View>
				</View>
				<Statistics FirstDescription={'Years'} FirstHeading={book.penData} SecondHeading={book.antalSider.toString()}
				            SecondDescription={'Pages'} ThirdHeading={Object.values(book.comments).length.toString()}
				            ThirdDescription={'Reviews'} />
				<View>
					<Text className='text-white  font-bold  text-2xl mt-6'>Description</Text>
					<Animatable.Text animation={animation} numberOfLines={4}
					                 className='text-gray text-[16px] mt-2'>{book.description}</Animatable.Text>
				</View>
				
				<View className='flex-row justify-between
			items-center'>
					<Text className='text-white  font-bold  text-2xl mt-6'>Review</Text>
					<Text onPress={() => setIsVisible(true)} className='text-gray text-lg mt-6'>Add</Text>
				
				</View>
				<Animatable.View animation={animation} className='mb-2 flex-1'>
					{book.comments.length ? book.comments.map(comments => (
						<CommentElement key={comments.create_At} rating={comments.rating} BookId={comments.BookId}
						                create_At={comments.create_At}
						                message={comments.message} userUid={comments.userUid} />
					)) : <Text className='text-gray text-xl'>None review!</Text>}
				</Animatable.View>
			
			</ScrollView>
		</View>
	</Layout>
}

export default SingleBookPage