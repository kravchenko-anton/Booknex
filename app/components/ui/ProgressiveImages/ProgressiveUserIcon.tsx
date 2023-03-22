import { useNetInfo } from '@react-native-community/netinfo'
import { FC, memo, useEffect, useState } from 'react'
import { Image, Text, View, ViewProps } from 'react-native'
import ClearUserLogo from '../clearUserLogo'

interface ProgressiveUserLogoProps extends ViewProps {
	uri: string
	width: number | string
	height: number | string
	userName:   string
}

const ProgressiveUserLogo: FC<ProgressiveUserLogoProps> =
	({
		 uri, width, height, userName, ...rest
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
							imageLoader.then(() => setImageLoad(true)).catch(() => {
								setImageLoad(false)
							})
						} else {
							setImageLoad(false)
						}
					}
				}).catch(() => setImageLoad(false))
			}
			
			load()
		}, [imageLoad, isConnected])
		
		return <View {...rest}>
			
			{imageLoad ?
				<Image
					source={{ uri }}
					style={{ height, width, borderRadius: 100 }}
				/>
				: <ClearUserLogo letter={userName} width={width} height={height}/>}
		
		</View>
	}

export default memo(ProgressiveUserLogo)
