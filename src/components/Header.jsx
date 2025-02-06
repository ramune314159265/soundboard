import { Box, Flex, Heading } from '@chakra-ui/react'

export const Header = () => {
	return (
		<Box bg="bg.panel" height={"100%"} px={"1rem"} userSelect={"none"}>
			<Flex height={"100%"} alignItems={"center"}>
				<Heading>
					サウンドボード
				</Heading>
			</Flex>
		</Box >
	)
}
