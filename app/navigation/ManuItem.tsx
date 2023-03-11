import { Feather } from '@expo/vector-icons'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC } from 'react'
import { View } from 'react-native'
import { menuItems } from './menuItem'
import { TypeRootStackParamList } from './navigationTypes'

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void

interface IMenuItemProps {
	// @ts-ignore
	item: menuItems
	nav: TypeNavigate
	currentRoute?: string
}

const ManuItem: FC<IMenuItemProps> = ({ nav, item, currentRoute }) => {
	const isActive = currentRoute === item.path
	return (
		<RNBounceable bounceVelocityIn={1.2} delayHoverIn={0} onPress={() => nav(item.path)}>
			<View style={{ backgroundColor: isActive ? '#702DF5' : '#121212' }}
			      className='items-center justify-center p-1.5 rounded-lg'>
				<Feather
					name={item.iconName}
					size={30}
					color={isActive ? 'white' : '#949494'}
				/>
			</View>
		</RNBounceable>
	)
}

export default ManuItem
