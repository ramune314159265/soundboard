import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu'
import { Tooltip } from "@/components/ui/tooltip"
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
							<Tooltip showArrow content="サウンドボードのインポート、エクスポート" openDelay={0} closeDelay={100}>
								<IconButton variant="ghost" borderRadius="full" aria-label="サウンドボードのインポート、エクスポート">
									<HiOutlineArrowUpOnSquareStack></HiOutlineArrowUpOnSquareStack>
								</IconButton>
							</Tooltip>
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
					<Tooltip showArrow content="設定" openDelay={0} closeDelay={100}>
						<IconButton variant="ghost" borderRadius="full" aria-label="設定" onClick={() => setDialogOpen(true)}>
							<HiMiniCog6Tooth></HiMiniCog6Tooth>
						</IconButton>
					</Tooltip>
				</HStack>
			</Flex>
		</Box >
	)
}
