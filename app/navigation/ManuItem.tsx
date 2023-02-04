import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'
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
		<Pressable onPress={() => nav(item.path)}>
			<Feather
				name={item.iconName}
				size={26}
				color={isActive ? 'white' : '#949494'}
			/>
		</Pressable>
	)
}

export default ManuItem
