import { isRejectedWithValue } from '@reduxjs/toolkit'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { Middleware, MiddlewareAPI } from 'redux'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			Toast.show({
				text1: I18n.t('RTK error'),
				text2: action.error,
				type: 'error'
			})
		}

		return next(action)
	}
