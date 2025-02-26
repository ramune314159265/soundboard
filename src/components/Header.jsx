import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu'
import { Box, Flex, Heading, HStack, IconButton } from '@chakra-ui/react'
import { HiMiniCog6Tooth, HiOutlineArrowUpOnSquareStack } from 'react-icons/hi2'
import { useConfigDialog } from '../atoms/configDialog'
import { downloadSoundsData, getImportSoundsData } from '../utils/importExport'

export const Header = () => {
	const [dialogOpen, setDialogOpen] = useConfigDialog()
	return (
		<Box bg="bg.panel" height="full" px="1rem" userSelect="none">
			<Flex height="full" alignItems="center" justifyContent="space-between">
				<Heading>
					サウンドボード
				</Heading>
				<HStack>
					<MenuRoot>
						<MenuTrigger asChild>
							<IconButton variant="ghost" borderRadius="full">
								<HiOutlineArrowUpOnSquareStack></HiOutlineArrowUpOnSquareStack>
							</IconButton>
						</MenuTrigger>
						<MenuContent>
							<MenuItem value="export" onClick={() => downloadSoundsData()}>
								エクスポート
							</MenuItem>
							<MenuItem value="import" onClick={() => getImportSoundsData()}>
								インポート
							</MenuItem>
						</MenuContent>
					</MenuRoot>
					<IconButton variant="ghost" borderRadius="full" onClick={() => setDialogOpen(true)}>
						<HiMiniCog6Tooth></HiMiniCog6Tooth>
					</IconButton>
				</HStack>
			</Flex>
		</Box >
	)
}
