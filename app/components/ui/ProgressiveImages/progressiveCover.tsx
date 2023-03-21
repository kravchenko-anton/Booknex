import { useNetInfo } from '@react-native-community/netinfo'
import { FC, useEffect, useState } from 'react'
import { Image, Text, View, ViewProps } from 'react-native'

interface ProgressiveCoverProps extends ViewProps {
	uri: string
	width: number | string
	height: number | string
	bookName: string
	bookAuthor?: string[] | string
	borderRadius?: number
}

const ProgressiveCover: FC<ProgressiveCoverProps> = ({
	                                                     uri, width, height, bookName, borderRadius, bookAuthor, ...rest
                                                     }) => {
	const [imageLoad, setImageLoad] = useState(false)
	const { isConnected } = useNetInfo()
	// 6 hours for this decision 🙃
	useEffect(() => {
		async function load() {
			
			// @ts-ignore
			await Image.queryCache([uri]).then((results) => {
				if (results[uri]) {
					setImageLoad(true)
				} else {
					if (isConnected === true) {
						const imageLoader = Image.prefetch(uri)
						imageLoader.then(() => setImageLoad(true)).catch(() => setImageLoad(false))
					} else {
						setImageLoad(false)
					}
				}
			})
		}
		
		load()
	}, [])
	
	return <View {...rest}>
		
		{imageLoad ?
			<Image
				source={{ uri }}
				style={{ height, width, borderRadius }}
			/>
			: <View style={{ width, height, backgroundColor: '#1E212C', borderRadius }}>
				<Text numberOfLines={2}
				      className='text-center text-white mx-2 mt-4 text-lg font-bold'>{bookName}</Text>
				{bookAuthor ? <View>
						<Text numberOfLines={1} className='text-white text-center mt-1'>_______</Text>
						<Text numberOfLines={1} className='text-white text-center mt-1'>{bookAuthor}</Text>
					</View>
					: null}
			</View>}
	
	</View>
}

export default ProgressiveCover
