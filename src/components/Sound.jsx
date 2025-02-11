import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger
} from "@/components/ui/menu"
import { Button, ButtonGroup, Center, HStack, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { useSound } from '../atoms/sounds'
import { SoundEditDialog } from './SoundEditDialog'

export const Sound = ({ data }) => {
	const [sounds, { setSounds, addSound, deleteSound, editSound }] = useSound()
	const [dialogOpen, setDialogOpen] = useState(false)
	const clickHandle = () => {
		const audio = new Audio(data.url)
		audio.volume = data.volume
		audio.play()
	}
	const submitHandle = async newData => {
		setDialogOpen(false)
		await editSound(data.uuid, { name: newData.name, emoji: newData.emoji, volume: newData.volume[0] })
	}
	return (
		<>
			<MenuRoot>
				<ButtonGroup attached variant="surface" width="12rem" height="3rem">
					<Button
						size="xl"
						width="9rem"
						height="full"
						flexGrow={1}
						onClick={clickHandle}
					>
						<HStack maxWidth="full">
							<Text>{data.emoji}</Text>
							<Text truncate>{data.name}</Text>
						</HStack>
					</Button>
					<IconButton size="xl" height="full">
						<MenuTrigger width="full" height="full" >
							<Center>
								<HiOutlineEllipsisVertical />
							</Center>
						</MenuTrigger>
					</IconButton>
				</ButtonGroup>
				<MenuContent>
					<MenuItem
						value="edit"
						onClick={() => setDialogOpen(true)}
					>
						編集
					</MenuItem>
					<MenuItem
						value="delete"
						color="fg.error"
						_hover={{ bg: "bg.error", color: "fg.error" }}
						onClick={() => deleteSound(data.uuid)}
					>
						削除
					</MenuItem>
				</MenuContent>
			</MenuRoot>
			<SoundEditDialog
				data={data}
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
			></SoundEditDialog>
		</>
	)
}
