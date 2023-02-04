import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { api } from './api/api'
import { rtkQueryErrorLogger } from './middlewares/error.middleware'
import { rootReducer } from './RootReducer'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(api.middleware)
})

export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof rootReducer>
