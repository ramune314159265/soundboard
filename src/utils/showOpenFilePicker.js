//https://github.com/jsxtools/show-open-file-picker/blob/main/showOpenFilePicker.js
export const showOpenFilePicker = (() => {
	if (globalThis.showOpenFilePicker) return globalThis.showOpenFilePicker

	const mapOfFiles = new WeakMap()
	const prototypeOfFileSystemHandle = FileSystemHandle.prototype
	const prototypeOfFileSystemFileHandle = FileSystemFileHandle.prototype

	const input = document.createElement('input')

	const getFileHandle = file => {
		const fileHandle = create(prototypeOfFileSystemFileHandle)

		mapOfFiles.set(fileHandle, file)

		return fileHandle
	}

	const getAcceptType = type => values(Object(type?.accept)).join(',')

	const resolveFilePicker = (resolve, reject) => {
		input.click()

		input.addEventListener('change', () => {
			resolve([...input.files].map(getFileHandle))

			input.value = ''
		}, { once: true })

		input.addEventListener('cancel', () => {
			reject(new DOMException('The user aborted a request.'))
		}, { once: true })
	}

	const { create, defineProperties, getOwnPropertyDescriptors, values } = Object
	const { name, kind, ...descriptorsOfFileSystemHandle } = getOwnPropertyDescriptors(prototypeOfFileSystemHandle)

	input.type = 'file'

	defineProperties(prototypeOfFileSystemHandle, {
		...descriptorsOfFileSystemHandle,
		...getOwnPropertyDescriptors({
			get name() {
				return mapOfFiles.get(this)?.name ?? name.call(this)
			},
			get kind() {
				return mapOfFiles.has(this) ? 'file' : kind.call(this)
			},
		}),
	})

	return (options = null) => {
		input.multiple = Boolean(options?.multiple)
		input.accept = [].concat(options?.types ?? []).map(getAcceptType).join(',')

		return new Promise(resolveFilePicker)
	}
})()
