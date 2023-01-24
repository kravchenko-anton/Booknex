import { Feather } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchBooksQuery } from '../../../store/api/books'
import { useFetchUserQuery } from '../../../store/api/user'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'

const Home = () => {
	const { data, isLoading, error } = useFetchBooksQuery(null)
	const { data: Users } = useFetchUserQuery(null)
	const { control } = useForm()
	const { navigate } = useTypedNavigation()
	return <Layout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className='flex-row flex-1 justify-between items-center'>
				<Image source={require('../../../assets/icon.png')}
				       style={{ width: 210, height: 55, resizeMode: 'contain' }} />
				<View className='bg-blue p-2 items-center rounded-full'>
					<Feather onPress={() => navigate('Search')} name='search' size={24} color='white' />
				</View>
			</View>
			<Text className='mt-4 text-white font-bold text-2xl mb-4'>Top Sellers</Text>
			<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
				{data && data.map(item => (
					<Pressable onPress={() => navigate('BookPage', {
						id: item.id
					})} className='w-[150px] mr-3 h-[250px] ' key={item.id}>
						<Image source={{ uri: item.Image }}
						       className='w-[150px h-[250px] rounded-xl' />
					</Pressable>
				))}
			</ScrollView>
			
			<Text className='mt-4 text-white font-bold text-2xl mb-4'>Top Autors</Text>
			<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
				
				{// TODO: Сделать проверку на популярность
					Users && Users.filter(Users => Users.booksCount >= 0).map(item => (
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
			
			<Text className='mt-8 text-white font-bold text-2xl '>Popular User book</Text>
			{/*Here user books*/}
			<Text>Books</Text>
		</ScrollView>
	</Layout>
}

export default Home