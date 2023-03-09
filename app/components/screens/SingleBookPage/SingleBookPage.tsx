import { FontAwesome5 } from '@expo/vector-icons'
import I18n from 'i18n-js'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { AirbnbRating } from 'react-native-ratings'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'

import { animation, BottomAnimation, BottomAnimationEndToStart } from '../../../utils/TextAnimation'
import Header from '../../ui/header'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import CommentElement from '../../ui/ratingElement'
import Statistics from '../../ui/statistics'
import AddBookRating from './ui/AddBookRating'
import BookFavoritesButton from './ui/BookFavoritesButton'
import { useSingleBook } from './useSingleBook'

const SingleBookPage = ({ route }: any) => {
	const { id } = route.params
	const { navigate } = useTypedNavigation()
	const {
		StateUser,
		book,
		Profile,
		isLoading,
		setVisibleButton,
		setIsVisible,
		isVisible,
		visibleButton,
		lastReadPage,
		styleAnimation
	} = useSingleBook(id)
	if (!book || !Profile || isLoading) return <Loader />
	const total =
		Object.values(book.comments).reduce((t, { rating }) => t + rating, 0) /
		(book.comments.length
			? book.comments.length
			: book.comments.constructor.length)
	return (
		<Layout>
			<View className='h-full'>
				<ModalPopup
					height={300}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					title={'Add review'}
				>
					<AddBookRating id={id} Profile={Profile} />
				</ModalPopup>
				
				
				<Animatable.View
					className=' absolute z-50 bottom-3 flex-row left-28 right-28 items-center justify-between'
					animation={visibleButton ? BottomAnimation : BottomAnimationEndToStart}
				>
					<Pressable
						className=' bg-primary rounded-lg p-4 flex-row justify-between w-full'
						onPress={() =>
							navigate('ReadPage', {
								epub: book.epubDoc,
								LastReadPage: lastReadPage,
								BookId: book.id
							})
						}
					>
						<Text className=' text-white text-xl font-bold'>{I18n.t('Go Read')}</Text>
						<FontAwesome5 name='book-reader' size={24} color='white' />
					</Pressable>
				</Animatable.View>
				<ScrollView
					onTouchEndCapture={() => setVisibleButton(!visibleButton)}
					showsVerticalScrollIndicator={false}
				>
					<Header className='mt-4'>
						
						<BookFavoritesButton
							book={book}
							Profile={Profile}
							StateUser={StateUser}
						/>
					</Header>
					<View className='flex-row  justify-between mt-8'>
						<Animated.View entering={FadeInDown} style={styleAnimation}>
							<Image
								source={{ uri: book.Image }}
								className='w-[150px] mr-3 h-[250px] rounded-xl'
							/>
						</Animated.View>
						<Animatable.View animation={animation} className='flex-1'>
							<Text numberOfLines={2} className='text-white font-bold text-2xl mt-6'>
								{book.Name}
							</Text>
							<Text numberOfLines={1} className='text-gray  text-lg mt-2 font-semibold mb-2'>
								{book.autor.join(', ')}
							</Text>
							
							<View className='flex-row items-center mb-2'>
								<AirbnbRating
									size={20}
									defaultRating={total}
									count={5}
									showRating={false}
									isDisabled={true}
								/>
								<Text className='text-white text-lg font-bold'>
									/ ({Object.values(book.comments).length})
								</Text>
							</View>
							<Text className='text-gray text-lg'>{book.bookLanguage}</Text>
							<View className='mt-2 flex-wrap flex-row'>
								{book.genre.map(item => (
									<Text
										key={item}
										className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
									>
										{item}
									</Text>
								))}
							</View>
						</Animatable.View>
					</View>
					<Statistics
						FirstDescription={I18n.t('Years')}
						FirstHeading={book.penData}
						SecondHeading={book.antalSider.toString()}
						SecondDescription={I18n.t('Pages')}
						ThirdHeading={Object.values(book.comments).length.toString()}
						ThirdDescription={I18n.t('UserReviews')}
					/>
					<Text className='text-white  font-bold  text-2xl mt-6'>
						{I18n.t('Description')}
					</Text>
					<Animatable.Text
						animation={animation}
						numberOfLines={4}
						className='text-gray text-[16px] mt-2'
					>
						{book.description}
					</Animatable.Text>
					<View
						className='flex-row justify-between
			items-center'
					>
						<Text className='text-white  font-bold  text-2xl mt-6'>
							{I18n.t('Reviews')}
						</Text>
						<Text
							onPress={() => setIsVisible(true)}
							className='text-gray text-lg mt-6'
						>
							{I18n.t('add')}
						</Text>
					</View>
					<Animatable.View animation={animation} className='mb-2 flex-1'>
						{book.comments.length ? (
							book.comments.map(comments => (
								<CommentElement
									key={comments.create_At}
									rating={comments.rating}
									BookId={comments.BookId}
									create_At={comments.create_At}
									message={comments.message}
									userUid={comments.userUid}
								/>
							))
						) : (
							<Text className='text-gray text-xl'>{I18n.t('None review!')}</Text>
						)}
					</Animatable.View>
				</ScrollView>
			</View>
		</Layout>
	)
}

export default SingleBookPage
