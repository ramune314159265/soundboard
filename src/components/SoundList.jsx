import { SimpleGrid } from '@chakra-ui/react'
import { Sound } from './Sound'
import { SoundAddButton } from './SoundAddButton'

export const SoundList = () => {
	return (
		<SimpleGrid gap={4} p={4} wrap={"wrap"} gridTemplateColumns={"repeat(auto-fill, 12rem)"} justifyContent={"center"}>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<SoundAddButton></SoundAddButton>
		</SimpleGrid>
	)
}
