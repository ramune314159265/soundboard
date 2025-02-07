import {
	DialogBackdrop, DialogBody, DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlusCircle } from "react-icons/hi2"
import { addSound } from '../sounddb'
import { getNameWithoutExtension } from '../utils/filePath'
import { showOpenFilePicker } from '../utils/showOpenFilePicker'
import { SoundEditForm } from './SoundEditForm'

export const SoundAddButton = () => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [file, setFile] = useState(null)
	const buttonHandle = () => {
		showOpenFilePicker({
			excludeAcceptAllOption: true,
			multiple: false,
			types: [
				{
					description: "音楽ファイル",
					accept: {
						"audio/*": [],
					},
				}
			]
		})
			.then(async e => {
				const file = await e[0].getFile()
				setFile(file)
				setDialogOpen(true)
			})
			.catch(() => { })
	}
	const submitHandle = async data => {
		setDialogOpen(false)
		const blob = new Blob([file], { type: file.type })
		await addSound({ ...data, blob })
	}

	return (
		<>
			<Button height="100%" onClick={buttonHandle}>
				<HiMiniPlusCircle />サウンドを追加
			</Button>
			<DialogRoot
				size="md"
				closeOnInteractOutside={false}
				open={dialogOpen}
			>
				<DialogBackdrop></DialogBackdrop>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>サウンドを追加</DialogTitle>
					</DialogHeader>
					<DialogBody>
						<SoundEditForm
							onDataSubmit={submitHandle}
							onCancel={() => setDialogOpen(false)}
							defaultValues={{ name: getNameWithoutExtension(file?.name ?? '') }}
						/>
					</DialogBody>
				</DialogContent>
			</DialogRoot >
		</>
	)
}
