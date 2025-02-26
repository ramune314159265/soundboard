import { BlobReader, BlobWriter, TextReader, ZipWriter } from '@zip.js/zip.js'
import { db } from '../db'

export const exportSoundsData = async () => {
	const sounds = await db.sounds.toArray()
	const categories = await db.categories.toArray()
	const soundsJsonReader = new TextReader(JSON.stringify(sounds))
	const categoriesJsonReader = new TextReader(JSON.stringify(categories))

	const zipFileWriter = new BlobWriter()
	const zipWriter = new ZipWriter(zipFileWriter)
	await zipWriter.add('sounds.json', soundsJsonReader)
	await zipWriter.add('categories.json', categoriesJsonReader)
	await Promise.all(sounds.map(sound => {
		const blobReader = new BlobReader(sound.blob)
		return zipWriter.add(sound.uuid, blobReader)
	}))
	await zipWriter.close()

	const blob = await zipFileWriter.getData()
	return blob
}

export const downloadSoundsData = async () => {
	const blob = await exportSoundsData()
	const a = document.createElement('a')
	const url = URL.createObjectURL(blob)
	a.href = url
	a.download = 'soundboard.rsbd'
	a.click()
	URL.revokeObjectURL(url)
}
