import { Button, HStack, Text } from '@chakra-ui/react'

export const Sound = ({ name, emoji }) => {
	return (
		<Button
			size={"xl"}
			variant={"surface"}
			height={"3rem"}
		>
			<HStack>
				<Text >{emoji}</Text>
				<Text>{name}</Text>
			</HStack>
		</Button>
	)
}
