import Dexie from 'dexie'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const soundsAtom = atom({})

const db = new Dexie('soundDatabase')

db.version(2).stores({
	sounds: '++id,name,uuid'
})

export const useSound = () => {
	const [sounds, setSounds] = useAtom(soundsAtom)

	useEffect(() => {
		db.sounds.toArray()
			.then(sounds => {
				const data = {}
				sounds.forEach(sound => {
					const url = URL.createObjectURL(sound.blob)
					data[sound.uuid] = { ...sound, url }
				})
				setSounds(data)
			})
	}, [setSounds])

	const addSound = async ({ blob, name, emoji, volume, uuid, url }) => {
		try {
			await db.sounds.add({ blob, name, emoji, volume, uuid })
		} catch (e) {
			console.error(e)
		}
		const data = {
			...sounds,
			[uuid]: { blob, name, emoji, volume, uuid, url }
		}
		setSounds(data)
	}
	const deleteSound = async (uuid) => {
		try {
			const data = await db.sounds.get({ uuid })
			await db.sounds.delete(data.id)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(sounds)
		delete copy[uuid]
		setSounds(copy)
	}
	return [sounds, { setSounds, addSound, deleteSound }]
}
