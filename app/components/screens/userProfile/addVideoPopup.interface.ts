import React from 'react'
import { Iuser } from '../../../store/api/api.types'

export interface IaddVideo {
	user: { email: string; uid: string }
	CurrentUser: Iuser
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
