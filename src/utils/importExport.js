import { BlobReader, BlobWriter, TextReader, ZipReader, ZipWriter } from '@zip.js/zip.js'
import { db } from '../db'
import { showOpenFilePicker } from './showOpenFilePicker'

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

export const importSoundsData = async blob => {
	const zipFileReader = new BlobReader(blob)
	const zipReader = new ZipReader(zipFileReader)
	const entries = await zipReader.getEntries()
	const soundsArray = JSON.parse(await (await entries.find(e => e.filename === 'sounds.json').getData(new BlobWriter())).text())
	const categoriesArray = JSON.parse(await (await entries.find(e => e.filename === 'categories.json').getData(new BlobWriter())).text())
	await Promise.all(soundsArray
		.map(sound => (async () => {
			const blob = await entries.find(e => e.filename === sound.uuid).getData(new BlobWriter())
			await db.sounds.add({ ...sound, blob })
		})())
	)
	await Promise.all(categoriesArray
		.map(category => (async () => {
			await db.categories.add(category)
		})())
	)
	location.reload()
}

export const getImportSoundsData = async () => {
	try {
		const files = await showOpenFilePicker({
			multiple: false,
			types: [
				{
					description: "サウンドボードエクスポートデータ",
					accept: {
						"application/soundboard": ['.rsbd'],
					},
				}
			]
		})
		const file = await files[0].getFile()
		const blob = new Blob([file], { type: file.type })
		await importSoundsData(blob)
	} catch (e) {
		console.error(e)
	}
}
