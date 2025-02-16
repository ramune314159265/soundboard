import { Button, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlusCircle } from "react-icons/hi2"
import { useSound } from '../atoms/sounds'
import { getNameWithoutExtension } from '../utils/filePath'
import { showOpenFilePicker } from '../utils/showOpenFilePicker'
import { SoundAddDialog } from './SoundAddDialog'

export const SoundAddButton = () => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [file, setFile] = useState(null)
	const [url, setUrl] = useState('')
	const [sounds, { setSounds, addSound }] = useSound()
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
				setUrl(URL.createObjectURL(new Blob([file], { type: file.type })))
				setDialogOpen(true)
			})
			.catch(() => { })
	}
	const submitHandle = async data => {
		setDialogOpen(false)
		const blob = new Blob([file], { type: file.type })
		const uuid = crypto.randomUUID()
		await addSound({ blob, name: data.name, emoji: data.emoji, volume: data.volume[0], uuid, url })
	}

	return (
		<>
			<Button height="5rem" p="2" onClick={buttonHandle}>
				<VStack alignItems="flex-start" width="full" height="full" justifyContent="space-between" gap="0">
					<HiMiniPlusCircle style={{ width: "2rem", height: "2rem" }} />
					<Text fontSize="xs" width="full" textAlign="left">
						サウンドを追加
					</Text>
				</VStack>
			</Button>
			<SoundAddDialog
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
				defaultValues={{ name: getNameWithoutExtension(file?.name ?? '') }}
				url={url}
			></SoundAddDialog>
		</>
	)
}
