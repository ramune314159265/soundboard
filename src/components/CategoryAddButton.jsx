import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlusCircle } from 'react-icons/hi2'
import { useCategory } from '../atoms/categories'
import { CategoryAddDialog } from './CategoryAddDialog'

export const CategoryAddButton = () => {
	const [categories, { addCategory }] = useCategory()
	const [dialogOpen, setDialogOpen] = useState(false)
	const submitHandle = async data => {
		setDialogOpen(false)
		const uuid = crypto.randomUUID()
		await addCategory({ name: data.name, uuid })
	}
	return (
		<>
			<Button onClick={() => setDialogOpen(true)}>
				<HiMiniPlusCircle /> カテゴリーを追加
			</Button>
			<CategoryAddDialog
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
				defaultValues={{}}
			></CategoryAddDialog>
		</>
	)
}
