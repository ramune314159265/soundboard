import { SimpleGrid } from '@chakra-ui/react'
import { useSound } from '../atoms/sounds'
import { Sound } from './Sound'
import { SoundAddButton } from './SoundAddButton'

export const SoundList = () => {
	const [sounds, { setSounds, addSound }] = useSound()
	return (
		<SimpleGrid gap={4} p={4} wrap={"wrap"} gridTemplateColumns={"repeat(auto-fill, 8rem)"} gridTemplateRows={"repeat(auto-fill, 5rem)"} justifyContent={"center"}>
			{
				Object.values(sounds).map((sound, i) => {
					return (
						<Sound data={sound} key={i} />
					)
				})
			}
			<SoundAddButton></SoundAddButton>
		</SimpleGrid>
	)
}
