import { atom, useAtom } from 'jotai'

export const configAtom = atom({
	audioOutputs: ['']
})

export const useConfig = () => {
	const [config, setConfig] = useAtom(configAtom)

	const setAudioOutputs = (outputs) => {
		const newConfig = {
			...config,
			audioOutputs: outputs
		}
		setConfig(newConfig)
	}

	return [config, { setConfig, setAudioOutputs }]
}
