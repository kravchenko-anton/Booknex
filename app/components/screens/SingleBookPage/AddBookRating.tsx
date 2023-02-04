import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { Iuser } from '../../../store/api/api.types'
import { useAddBookReviewMutation } from '../../../store/api/books'
import Field from '../../ui/field/field'

const AddBookRating: FC<{ Profile: Iuser; id: any }> = ({ Profile, id }) => {
	const { control, reset, handleSubmit } = useForm()

	const [RatingCount, setRatingCount] = useState(0)
	const [addBookReview] = useAddBookReviewMutation()
	const SubmitReview = (data: any) => {
		const RevieStructire = {
			message: data.message,
			rating: RatingCount !== 0 ? RatingCount : 3,
			create_At: new Date(),
			userUid: Profile.uid
		}
		addBookReview({ id, rating: RevieStructire, profile: Profile })
		reset()
	}
	return (
		<View>
			<AirbnbRating
				size={40}
				defaultRating={3}
				count={5}
				onFinishRating={raitingCount => setRatingCount(raitingCount)}
			/>
			<View className='h-full items-end'>
				<Field
					control={control}
					name={'message'}
					placeholder={'Stay Message'}
					className=' text-start'
					rules={{
						required: 'Please, stay message!',
						minLength: {
							value: 20,
							message: 'You text must be a minimum 20 letter!'
						}
					}}
				/>
				<Pressable
					onPress={handleSubmit(SubmitReview)}
					className='bg-primary p-2  rounded-lg flex  mt-2 w-[200px]'
				>
					<Text className='text-white font-bold text-2xl text-center'>
						Send Review
					</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default AddBookRating
