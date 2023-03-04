import React from 'react'
import { Iuser } from '../../../../store/api/api.types'

export interface IaddBook {
	user: { email: string; uid: string }
	CurrentUser: Iuser
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
