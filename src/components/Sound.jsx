import {
	MenuContent,
	MenuContextTrigger,
	MenuItem,
	MenuRoot,
} from "@/components/ui/menu"
import { Button, ButtonGroup, HStack, IconButton, Text } from '@chakra-ui/react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'

export const Sound = ({ data }) => {
	const clickHandle = () => {
		const audio = new Audio(data.url)
		audio.volume = data.volume
		audio.play()
	}
	return (
		<MenuRoot width="12rem" height={"3rem"}>
			<MenuContextTrigger>
				<ButtonGroup attached variant="surface" width="full" height="full">
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
						<HiOutlineEllipsisVertical />
					</IconButton>
				</ButtonGroup>
			</MenuContextTrigger>
			<MenuContent>
				<MenuItem value="new-txt">ああああ</MenuItem>
			</MenuContent>
		</MenuRoot>
	)
}
