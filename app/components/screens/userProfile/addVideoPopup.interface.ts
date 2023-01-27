import { Control, FieldValues } from 'react-hook-form'

export interface IAddVideoPopup {
	control: Control<FieldValues, any>
	open: boolean
	handleSubmit: any
	EpubUrlPatch: any
	UploadBook: Function
	pickEpub: Function
	value: any
	items: { label: string, value: string }[]
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	setItems: any
	ImageUrlPatch: any
	pickImage: Function
	setValue: any
}