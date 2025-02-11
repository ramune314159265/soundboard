import {
	DialogBackdrop, DialogBody, DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle
} from '@/components/ui/dialog'
import { SoundForm } from './SoundForm'

export const SoundEditDialog = ({ dialogState, onDataSubmit, data }) => {
	return (
		<DialogRoot
			size="sm"
			closeOnInteractOutside={false}
			open={dialogState.dialogOpen}
		>
			<DialogBackdrop></DialogBackdrop>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>サウンドをを編集</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<SoundForm
						onDataSubmit={onDataSubmit}
						onCancel={() => dialogState.setDialogOpen(false)}
						defaultValues={{ name: data.name, emoji: data.emoji, volume: [data.volume] }}
						url={data.url}
					/>
				</DialogBody>
			</DialogContent>
		</DialogRoot >
	)
}
