import { Dimensions, Platform } from 'react-native'

export const SPACING = 20

const { width } = Dimensions.get('window')
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
