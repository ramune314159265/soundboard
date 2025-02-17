import {
	DialogBackdrop,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@chakra-ui/react'
import { useRef } from 'react'
import { useConfigDialog } from '../atoms/configDialog'
import { ConfigForm } from './ConfigForm'

export const ConfigDialog = () => {
	const [dialogOpen, setDialogOpen] = useConfigDialog()
	const contentRef = useRef(null)
	return (
		<DialogRoot
			size="md"
			open={dialogOpen}
		>
			<DialogBackdrop></DialogBackdrop>
			<DialogContent ref={contentRef}>
				<DialogHeader>
					<DialogTitle>設定</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<ConfigForm contentRef={contentRef}></ConfigForm>
				</DialogBody>
				<DialogFooter>
					<Button onClick={() => setDialogOpen(false)}>完了</Button>
				</DialogFooter>
			</DialogContent>
		</DialogRoot >
	)
}
