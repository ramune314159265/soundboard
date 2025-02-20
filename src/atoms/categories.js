import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { db } from '../db'

export const categoriesAtom = atom({})

export const useCategory = () => {
	const [categories, setCategories] = useAtom(categoriesAtom)

	useEffect(() => {
		db.categories.toArray()
			.then(categories => {
				const data = {}
				categories.forEach(category => {
					data[category.uuid] = category
				})
				setCategories(data)
			})
	}, [setCategories])

	const addCategory = async ({ uuid, name }) => {
		const index = Object.keys(categories).length
		try {
			await db.categories.add({ uuid, name, soundUuids: [], index })
		} catch (e) {
			console.error(e)
		}
		const data = {
			...categories,
			[uuid]: { uuid, name, soundUuids: [], index }
		}
		setCategories(data)
	}
	const deleteCategory = async (uuid) => {
		try {
			await db.categories.delete(uuid)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(categories)
		delete copy[uuid]
		setCategories(copy)
	}
	const editCategory = async (uuid, newData) => {
		try {
			await db.categories.update(uuid, newData)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(categories)
		copy[uuid] = {
			...categories[uuid],
			...newData
		}
		setCategories(copy)
	}
	const addSoundToCategory = async (uuid, soundUuid) => {
		const categoryData = categories[uuid]
		categoryData.soundUuids.push(soundUuid)
		const data = {
			...categories,
			[uuid]: categoryData
		}
		try {
			await db.categories.update(uuid, categoryData)
		} catch (e) {
			console.error(e)
		}
		setCategories(data)
	}
	return [categories, { setCategories, addCategory, deleteCategory, editCategory, addSoundToCategory }]
}
