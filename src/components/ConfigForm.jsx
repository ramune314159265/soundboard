import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText
} from "@/components/ui/select"
import { Button, createListCollection, FieldHelperText, FieldLabel, FieldRoot, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useConfig } from '../atoms/config'
import { db } from './../db'

export const ConfigForm = ({ contentRef }) => {
	const [config, { setAudioOutputs, resetAllConfigs }] = useConfig()

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
		<VStack gap={4}>
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
			<FieldRoot>
				<FieldLabel>データのリセット・削除</FieldLabel>
				<VStack alignItems="flex-start">
					<Button
						colorPalette="yellow"
						variant="outline"
						size="sm"
						onClick={async () => {
							const cacheId = (await caches.keys()).find(e => e.includes('workbox-precache'))
							await caches.delete(cacheId)
							const registration = await navigator.serviceWorker.getRegistration()
							registration.unregister()
							location.reload()
						}}
					>
						アプリのキャッシュの削除
					</Button>
					<Button
						colorPalette="red"
						variant="outline"
						size="sm"
						onClick={() => {
							if (!confirm('本当に設定をリセットしますか？')) {
								return
							}
							resetAllConfigs()
							location.reload()
						}}
					>
						設定のリセット...
					</Button>
					<Button
						colorPalette="red"
						variant="outline"
						size="sm"
						onClick={async () => {
							if (!confirm('本当にサウンド、カテゴリーを全て削除しますか？')) {
								return
							}
							db.delete()
							location.reload()
						}}
					>
						サウンド・カテゴリーの削除...
					</Button>
				</VStack>
				<FieldHelperText>
					この操作は元に戻すことが出来ません。削除した後は再読み込みされます。
				</FieldHelperText>
			</FieldRoot>
		</VStack>
	)
}
