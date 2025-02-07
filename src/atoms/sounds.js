import Dexie from 'dexie'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const soundsAtom = atom({})

const db = new Dexie('soundDatabase')

db.version(1).stores({
	sounds: '++id'
})

export const useSound = () => {
	const [sounds, setSounds] = useAtom(soundsAtom)

	useEffect(() => {
		db.sounds.toArray()
			.then(sounds => {
				const data = {}
				sounds.forEach(sound => {
					data[sound.uuid] = sound
				})
				setSounds(data)
			})
	}, [setSounds])

	const addSound = async ({ blob, name, emoji, volume, uuid }) => {
		try {
			await db.sounds.add({ blob, name, emoji, volume, uuid })
		} catch (e) {
			console.error(e)
		}
		const data = {
			...sounds,
			[uuid]: { blob, name, emoji, volume, uuid }
		}
		setSounds(data)
	}
	return [sounds, { setSounds, addSound }]
}
