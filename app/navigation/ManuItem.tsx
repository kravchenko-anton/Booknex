import { Feather } from '@expo/vector-icons'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC } from 'react'
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
		<RNBounceable bounceEffectIn={1.2} onPress={() => nav(item.path)}>
			<Feather
				name={item.iconName}
				size={30}
				color={isActive ? 'white' : '#949494'}
			/>
		</RNBounceable>
	)
}

export default ManuItem
