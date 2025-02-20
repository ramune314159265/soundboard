import { VStack } from '@chakra-ui/react'
import { useCategory } from '../atoms/categories'
import { CategoryAddButton } from './CategoryAddButton'
import { SoundList } from './SoundList'

export const CategoryList = () => {
	const [categories] = useCategory()
	return (
		<VStack gap={4} w="full">
			{
				Object.values(categories)
					.sort((a, b) => a - b)
					.map(category => {
						return (
							<SoundList categoryUuid={category.uuid} key={category.uuid} />
						)
					})
			}
			<CategoryAddButton></CategoryAddButton>
		</VStack>
	)
}
