import {
	DialogBackdrop, DialogBody, DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle
} from '@/components/ui/dialog'
import { SoundForm } from './SoundForm'

export const SoundAddDialog = ({ dialogState, onDataSubmit, defaultValues, url }) => {
	return (
		<DialogRoot
			size="sm"
			closeOnInteractOutside={false}
			open={dialogState.dialogOpen}
		>
			<DialogBackdrop></DialogBackdrop>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>サウンドを追加</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<SoundForm
						onDataSubmit={onDataSubmit}
						onCancel={() => dialogState.setDialogOpen(false)}
						defaultValues={defaultValues}
						url={url}
					/>
				</DialogBody>
			</DialogContent>
		</DialogRoot >
	)
}
