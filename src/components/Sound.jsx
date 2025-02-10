import {
	MenuContent,
	MenuItem,
	MenuRoot
} from "@/components/ui/menu"
import { Button, ButtonGroup, Center, HStack, IconButton, MenuTrigger, Text } from '@chakra-ui/react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'

export const Sound = ({ data }) => {
	const clickHandle = () => {
		const audio = new Audio(data.url)
		audio.volume = data.volume
		audio.play()
	}
	return (
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
				<MenuItem value="new-txt">ああああ</MenuItem>
			</MenuContent>
		</MenuRoot>
	)
}
