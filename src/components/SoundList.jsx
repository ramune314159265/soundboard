import { Button, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { HiMiniPlusCircle } from "react-icons/hi2"
import { Sound } from './Sound'

export const SoundList = () => {
	return (
		<SimpleGrid gap={4} p={4} wrap={"wrap"} gridTemplateColumns={"repeat(auto-fill, 12rem)"} justifyContent={"center"}>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Sound emoji={"😋"} name={"あああ"}></Sound>
			<Button>
				<HStack>
					<Icon>
						<HiMiniPlusCircle />
					</Icon>
					<Text>サウンドを追加</Text>
				</HStack>
			</Button>
		</SimpleGrid>
	)
}
