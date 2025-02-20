import { SimpleGrid } from '@chakra-ui/react'
import { useCategory } from '../atoms/categories'
import { useSound } from '../atoms/sounds'
import { Sound } from './Sound'
import { SoundAddButton } from './SoundAddButton'

export const SoundList = ({ categoryUuid }) => {
	const [sounds] = useSound()
	const [categories] = useCategory()
	return (
		<SimpleGrid gap={4} p={4} wrap={"wrap"} gridTemplateColumns={"repeat(auto-fill, 8rem)"} gridTemplateRows={"repeat(auto-fill, 5rem)"} justifyContent={"center"}>
			{
				Object.values(categories[categoryUuid].soundUuids)
					.filter(soundUuid => sounds[soundUuid])
					.map(soundUuid => {
						return (
							<Sound data={sounds[soundUuid]} key={soundUuid} />
						)
					})
			}
			<SoundAddButton categoryUuid={categoryUuid}></SoundAddButton>
		</SimpleGrid>
	)
}
