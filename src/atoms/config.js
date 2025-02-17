import { atom, useAtom } from 'jotai'

export const configAtom = atom({})

export const useConfig = () => {
	const [config, setConfig] = useAtom(configAtom)

	const setAudioOutputs = (outputs) => {
		const newConfig = {
			...config,
			audioOutputs: outputs
		}
		console.log(newConfig)
		setConfig(newConfig)
	}

	return [config, { setConfig, setAudioOutputs }]
}
