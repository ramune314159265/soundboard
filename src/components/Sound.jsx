import { Button, HStack, Text } from '@chakra-ui/react'

export const Sound = ({ data }) => {
	const clickHandle = () => {
		const audio = new Audio(data.url)
		audio.volume = data.volume
		audio.play()
	}
	return (
		<Button
			size={"xl"}
			variant={"surface"}
			height={"3rem"}
			onClick={clickHandle}
		>
			<HStack>
				<Text >{data.emoji}</Text>
				<Text>{data.name}</Text>
			</HStack>
		</Button>
	)
}
