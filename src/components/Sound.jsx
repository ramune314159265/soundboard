import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger
} from "@/components/ui/menu"
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import { memo, useCallback, useState } from 'react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { useConfig } from '../atoms/config'
import { useSound } from '../atoms/sounds'
import { SoundEditDialog } from './SoundEditDialog'

export const Sound = memo(({ data, enableMenu }) => {
	const [sounds, { deleteSound, editSound }] = useSound()
	const [config] = useConfig()
	const [dialogOpen, setDialogOpen] = useState(false)
	const clickHandle = useCallback(() => {
		config.audioOutputs.forEach(output => {
			const audio = new Audio(data.url)
			audio.volume = data.volume
			audio.setSinkId(output)
			audio.play()
		})
	}, [config.audioOutputs, data.url, data.volume])
	const submitHandle = useCallback(async newData => {
		setDialogOpen(false)
		await editSound(data.uuid, { name: newData.name, emoji: newData.emoji, volume: newData.volume[0] })
	}, [data.uuid, editSound])
	return (
		<>
			<MenuRoot>
				<Box
					width="8rem"
					height="5rem"
					position="relative"
				>
					<Button
						p="2"
						width="full"
						height="full"
						cursor="pointer"
						variant="surface"
						onClick={clickHandle}
					>
						<VStack alignItems="flex-start" width="full" height="full" justifyContent="space-between" gap="0">
							<Box
								aspectRatio="1/1"
								bg="bg.emphasized"
								p="1"
								borderRadius="full"
								fontSize="lg"
							>
								<Center w="full" h="full">{data.emoji}</Center>
							</Box>
							<Text fontSize="xs" width="full" textAlign="left" truncate>
								{data.name}
							</Text>
						</VStack>
					</Button>
					{enableMenu !== false ?
						<Box position="absolute" top="2" right="2" zIndex="1">
							<MenuTrigger>
								<HiOutlineEllipsisVertical style={{ width: "1.25rem", height: "1.25rem" }} />
							</MenuTrigger>
						</Box> : <></>
					}
				</Box >
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
})

Sound.displayName = 'Sound'
