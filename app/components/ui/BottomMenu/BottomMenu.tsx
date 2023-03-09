import { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import ManuItem from '../../../navigation/ManuItem'
import { menuItems } from '../../../navigation/menuItem'

const BottomMenu: FC<{ currentRoute: string | undefined }> = ({
	                                                              currentRoute
                                                              }) => {
	const { navigate } = useTypedNavigation()
	const { bottom } = useSafeAreaInsets()
	
	return (
		<View
			style={{ paddingBottom: bottom + 5 }}
			className='flex-row bg-[#181818]  h-[60px] pt-0  items-center pl-10 pr-10 w-full  justify-between'
		>
			{menuItems.map(item => (
				<ManuItem
					item={item}
					key={item.path}
					nav={navigate}
					currentRoute={currentRoute}
				/>
			))}
		</View>
	)
}

export default BottomMenu
