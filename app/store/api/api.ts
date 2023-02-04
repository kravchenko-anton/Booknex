import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
//export const db = getFirestore(app) inside firebase setting

export const api = createApi({
	reducerPath: 'book',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['book', 'user'],
	endpoints: builder => ({})
})
