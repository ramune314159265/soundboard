export const showFilePicker = (options) => {
	return new Promise((resolve, reject) => {
		if (!window.showOpenFilePicker) {
			const input = document.createElement('input')
			input.type = 'file'
			input.multiple = options.multiple ?? false
			input.accept = options.type ? Object.values(options.type.map(i => Object.values(Object(i?.accept)).join(','))) : null

			input.addEventListener('change', () => {
				resolve([...input.files])
			}, { once: true })

			input.addEventListener('cancel', () => {
				reject(new Error('canceled'))
			}, { once: true })

			input.click()
		} else {
			showOpenFilePicker(options)
				.then(e => {
					return Promise.all(e.map(i => i.getFile()))
				})
				.then(e => {
					resolve(e)
				})
		}
	})
}
