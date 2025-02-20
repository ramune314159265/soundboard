import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { db } from '../db'

export const soundsAtom = atom({})

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
			await db.sounds.delete(uuid)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(sounds)
		delete copy[uuid]
		setSounds(copy)
	}
	const editSound = async (uuid, newData) => {
		try {
			await db.sounds.update(uuid, newData)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(sounds)
		copy[uuid] = {
			...sounds[uuid],
			...newData
		}
		setSounds(copy)
	}
	return [sounds, { setSounds, addSound, deleteSound, editSound }]
}
