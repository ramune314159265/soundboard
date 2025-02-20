import Dexie from 'dexie'

export const db = new Dexie('ramune314159265.soundboard')

db.version(1).stores({
	sounds: 'uuid, name',
	categories: 'uuid, name'
})
