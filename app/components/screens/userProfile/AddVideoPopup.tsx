import { Pressable, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Field from '../../ui/field/field'
import { IAddVideoPopup } from './addVideoPopup.interface'


const AddVideoPopup = (props: IAddVideoPopup) => {
	return <View className='h-full'>
		<Field control={props.control} name={'Name'} placeholder='Book name' rules={{
			required: 'Name requered!'
		}} />
		<Field control={props.control} rules={{
			required: 'description requered!'
		}} name={'Description'} placeholder={'Book description'}
		       className='h-[40px]' />
		<View>
			<Text className='text-blue text-xl font-bold'>Genre</Text>
			<DropDownPicker
				open={props.open}
				value={props.value}
				multiple={true}
				items={props.items}
				setOpen={props.setOpen}
				setValue={props.setValue}
				setItems={props.setItems}
			/>
		</View>
		<View className='gap-1 mt-1 flex-row justify-between w-full items-center'>
			<View>
				<Field control={props.control} rules={{
					required: 'data requered!'
				}} name={'penData'} placeholder={'Pen data '} />
			</View><View>
			<Field rules={{
				required: 'Page count requered!'
			}} control={props.control} name={'antalSider'} placeholder={'Page count'} />
		</View>
			<View>
				<Field rules={{
					required: 'Language requered!'
				}} control={props.control} name={'bookLanguage'} placeholder={'Language '} />
			</View>
		</View>
		<View className='mt-3  flex-row justify-between items-center'>
			<Text numberOfLines={1}
			      className='text-2xl w-[60%] text-blue font-bold'>{!props.ImageUrlPatch ? 'Select cover photo' : props.ImageUrlPatch}</Text>
			<Pressable onPress={() => props.pickImage()} className='bg-primary p-2 rounded-lg'><Text
				className='text-white font-bold text-xl'>Select
				📷</Text></Pressable>
		</View>
		
		<View className='mt-3  flex-row justify-between items-center'>
			<Text numberOfLines={1}
			      className='text-2xl w-[60%] text-blue font-bold'>{!props.EpubUrlPatch ? 'Select epub file' : props.EpubUrlPatch}</Text>
			<Pressable onPress={() => props.pickEpub()} className='bg-primary p-2 rounded-lg'><Text
				className='text-white font-bold text-xl'>Select
				📚</Text></Pressable>
		</View>
		
		
		<View className='mt-4 flex items-center'>
			<Pressable onPress={props.handleSubmit(props.UploadBook)} className='bg-blue p-4 rounded-lg'><Text
				className='text-white font-bold text-xl'>Add book 📩</Text></Pressable>
		</View>
	</View>
}

export default AddVideoPopup