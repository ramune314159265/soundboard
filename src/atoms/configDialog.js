import { atom, useAtom } from 'jotai'

export const configDialogAtom = atom(false)

export const useConfigDialog = () => {
	const [open, setOpen] = useAtom(configDialogAtom)
	return [open, setOpen]
}
