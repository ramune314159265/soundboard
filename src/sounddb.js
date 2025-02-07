import Dexie from 'dexie'

const db = new Dexie('soundDatabase')

db.version(1).stores({
	sounds: '++id'
})

export const addSound = async (sound) => {
	try {
		await db.sounds.add(sound)
	} catch (e) {
		console.error(e)
	}
}
