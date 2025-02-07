import Dexie from 'dexie'

const db = new Dexie('soundDatabase')

db.version(1).stores({
	sounds: '++id'
})

export const addSound = async ({ blob, name, emoji, volume, uuid }) => {
	try {
		await db.sounds.add({ blob, name, emoji, volume, uuid })
	} catch (e) {
		console.error(e)
	}
}
