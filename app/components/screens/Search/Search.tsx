import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchAllBooksQuery } from '../../../store/api/books'
import { useFetchUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'
import Layout from '../../ui/Layout/Layout'

const Search = () => {
	// Fucing firebase dont do normal search, i had to default js search
	//TODO: После добавления юзеров сделать в поиске и поиск по книгам и юзера а не ток в колекции book
	const { control, watch } = useForm()
	const { data: book, isLoading, error } = useFetchAllBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const { data: Users } = useFetchUserQuery(null)
	
	return <Layout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<Field control={control} name={'Search'} placeholder={'Type something...'} />
			<ScrollView className='mb-4 mt-4' showsHorizontalScrollIndicator={false} horizontal={true}>
				
				{
					Users
					&& Users.filter(Users => (Users.name ? Users.name.includes(watch('Search')) : Users.email.includes(watch('Search')))).map(item => (
						<Pressable onPress={() => navigate('AutorProfile', { uid: item.uid })} key={item.uid}
						           className='items-center justify-center  mr-4'>
							{item.photoURL ? <Image source={{ uri: item.photoURL }} className='w-[100px] h-[100px] rounded-full' />
								:
								<ClearUserLogo height={100} width={100} letter={item.email} />
							}
							<Text
								className='text-gray text-md font-bold mt-2'>{item.name}</Text>
						</Pressable>
					))}
			</ScrollView>
			
			{book && book.filter(book => book.Name.includes(watch('Search'))).map(item => (
				<BookItems key={item.id} image={item.Image} id={item.id} description={item.description} name={item.Name}
				           autor={item.autor}
				           genre={item.genre} />
			))}
		</ScrollView>
	
	
	</Layout>
}

export default Search