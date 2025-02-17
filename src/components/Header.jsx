import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { HiMiniCog6Tooth } from 'react-icons/hi2'
import { useConfigDialog } from '../atoms/configDialog'

export const Header = () => {
	const [dialogOpen, setDialogOpen] = useConfigDialog()
	return (
		<Box bg="bg.panel" height="full" px="1rem" userSelect="none">
			<Flex height="full" alignItems="center" justifyContent="space-between">
				<Heading>
					サウンドボード
				</Heading>
				<IconButton variant="ghost" borderRadius="full" onClick={() => setDialogOpen(true)}>
					<HiMiniCog6Tooth></HiMiniCog6Tooth>
				</IconButton>
			</Flex>
		</Box >
	)
}
