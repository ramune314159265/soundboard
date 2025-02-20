import {
	DialogBackdrop, DialogBody, DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle
} from '@/components/ui/dialog'
import { CategoryForm } from './CategoryForm'

export const CategoryAddDialog = ({ dialogState, onDataSubmit, defaultValues }) => {
	return (
		<DialogRoot
			size="sm"
			closeOnInteractOutside={false}
			open={dialogState.dialogOpen}
		>
			<DialogBackdrop></DialogBackdrop>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>カテゴリーを追加</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<CategoryForm
						onDataSubmit={onDataSubmit}
						onCancel={() => dialogState.setDialogOpen(false)}
						defaultValues={defaultValues}
					/>
				</DialogBody>
			</DialogContent>
		</DialogRoot >
	)
}
