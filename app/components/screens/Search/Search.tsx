import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchBooksQuery } from '../../../store/api/books'
import { useFetchUserQuery } from '../../../store/api/user'
import ClearUserLogo from '../../ui/clearUserLogo'
import Field from '../../ui/field/field'
import Layout from '../../ui/Layout/Layout'

const Search = () => {
	// Fucing firebase dont do normal search, i had to default js search
	//TODO: После добавления юзеров сделать в поиске и поиск по книгам и юзера а не ток в колекции book
	const { control, watch } = useForm()
	const { data: book, isLoading, error } = useFetchBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const { data: Users } = useFetchUserQuery(null)
	
	return <Layout>
		<Field control={control} name={'Search'} placeholder={'Type something...'} />
		<Text className='mt-4 text-white font-bold text-2xl mb-4'>Book</Text>
		<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
			{book && book.filter(book => book.Name.includes(watch('Search'))).map(item => (
				<Pressable onPress={() => navigate('BookPage', {
					id: item.id
				})} className='w-[150px] mr-3 h-[250px] ' key={item.id}>
					<Image source={{ uri: item.Image }}
					       className='w-[150px h-[250px] rounded-xl' />
				</Pressable>
			))}
		</ScrollView>
		
		<Text className='mt-4 text-white font-bold text-2xl mb-4'>User</Text>
		<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
			
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
							className='text-gray text-md font-bold mt-2'>{item.name ? item.name : item.email.split('@')[0]}</Text>
					</Pressable>
				))}
		</ScrollView>
	</Layout>
}

export default Search