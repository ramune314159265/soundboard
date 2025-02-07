export const getExtension = path => {
	if (path.includes('.')) {
		return path.split('.').at(-1)
	} else {
		return path.split('/').at(-1)
	}
}

export const getPath = path => {
	const array = path.split('/')
	array.pop()
	return array.join('/') + '/'
}

export const getName = path => {
	return path.split('/').at(-1)
}

export const getNameWithoutExtension = path => {
	const name = path.split('/').at(-1)
	const array = name.split('.')
	array.pop()
	return array.join('.')
}
