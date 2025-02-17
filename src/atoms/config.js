import { atom, useAtom } from 'jotai'

export const configAtom = atom(localStorage.getItem('ramune314159265.soundboard.config') === null ? {
	audioOutputs: ['']
} : JSON.parse(localStorage.getItem('ramune314159265.soundboard.config')))

export const useConfig = () => {
	const [config, setConfig] = useAtom(configAtom)

	const setAudioOutputs = (outputs) => {
		const newConfig = {
			...config,
			audioOutputs: outputs
		}
		localStorage.setItem('ramune314159265.soundboard.config', JSON.stringify(newConfig))
		setConfig(newConfig)
	}

	return [config, { setConfig, setAudioOutputs }]
}
