import { SimpleGrid } from '@chakra-ui/react'
import { useSound } from '../atoms/sounds'
import { Sound } from './Sound'
import { SoundAddButton } from './SoundAddButton'

export const SoundList = () => {
	const [sounds, { setSounds, addSound }] = useSound()
	return (
		<SimpleGrid gap={4} p={4} wrap={"wrap"} gridTemplateColumns={"repeat(auto-fill, 12rem)"} gridTemplateRows={"repeat(auto-fill, 3rem)"} justifyContent={"center"}>
			{
				Object.values(sounds).map((sound, i) => {
					return (
						<Sound emoji={sound.emoji} name={sound.name} key={i} />
					)
				})
			}
			<SoundAddButton></SoundAddButton>
		</SimpleGrid>
	)
}
