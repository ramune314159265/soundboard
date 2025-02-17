import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText
} from "@/components/ui/select"
import { createListCollection, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useConfig } from '../atoms/config'

export const ConfigForm = ({ contentRef }) => {
	const [config, { setConfig, setAudioOutputs }] = useConfig()

	const [audioOutputList, setAudioOutputList] = useState(createListCollection({ items: [{ label: 'デフォルト', value: '' }] }))
	useEffect(() => {
		(async () => {
			await navigator.mediaDevices.getUserMedia({ audio: true })
			const devices = await navigator.mediaDevices.enumerateDevices()
			setAudioOutputList(
				createListCollection({
					items: [
						{ label: 'デフォルト', value: '' },
						...devices
							.filter(d => d.kind === 'audiooutput' && d.deviceId !== 'default')
							.map(d => { return { label: d.label, value: d.deviceId } })
					]
				})
			)
		})()
	}, [setAudioOutputList])
	return (
		<VStack>
			<SelectRoot multiple collection={audioOutputList} value={config.audioOutputs} onValueChange={e => setAudioOutputs(e.value)}>
				<SelectLabel>音声出力先(複数可)</SelectLabel>
				<SelectTrigger>
					<SelectValueText placeholder="出力先を選択"></SelectValueText>
				</SelectTrigger>
				<SelectContent portalRef={contentRef} >
					{audioOutputList.items.map(device => (
						<SelectItem item={device.value} key={device.value}>{device.label}</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
		</VStack>
	)
}
