import I18n from 'i18n-js'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { Iuser } from '../../../../store/api/api.types'
import { useAddBookReviewMutation } from '../../../../store/api/book/mutation'
import Field from '../../../ui/field/field'

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
				reviews={[
					I18n.t('Terrable'),
					I18n.t('Bad'),
					I18n.t('Normal'),
					I18n.t('Good'),
					I18n.t('Excellent')
				]}
				onFinishRating={raitingCount => setRatingCount(raitingCount)}
			/>
			<View className='h-full items-end'>
				<Field
					control={control}
					name={'message'}
					placeholder={I18n.t('TypeSomething')}
					className=' text-start'
					rules={{
						required: I18n.t('TypeSomething'),
						minLength: {
							value: 20,
							message: I18n.t('You text must be a minimum 20 letter!')
						}
					}}
				/>
				<Pressable
					onPress={handleSubmit(SubmitReview)}
					className='bg-primary p-2  rounded-lg flex  mt-2 w-[250px]'
				>
					<Text className='text-white font-bold text-2xl text-center'>
						{I18n.t('Send Review')}
					</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default AddBookRating
