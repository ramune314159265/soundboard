import {
	PopoverContent,
	PopoverRoot,
	PopoverTrigger
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Button, FieldLabel, FieldRoot, Group, HStack, Input, Text, VStack } from '@chakra-ui/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Sound } from './Sound'

export const SoundForm = ({ onDataSubmit, onCancel, defaultValues, url }) => {
	const useFormMethods = useForm({
		defaultValues: {
			name: '',
			emoji: '🎉',
			volume: [1],
			...defaultValues,
		}
	})
	const [name, setName] = useState(defaultValues?.name ?? '')
	const [emoji, setEmoji] = useState(defaultValues?.emoji ?? "🎉")
	const [volume, setVolume] = useState(defaultValues?.volume ?? [1])
	return (
		<form onSubmit={useFormMethods.handleSubmit((data) => onDataSubmit({ ...data, emoji }))}>
			<VStack gap="4">
				<FieldRoot>
					<FieldLabel>絵文字＆名前</FieldLabel>
					<Group width="full">
						<PopoverRoot placement="right" positioning={{ placement: "right-start" }}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
								>{emoji}</Button>
							</PopoverTrigger>
							<PopoverContent>
								<Picker
									emojiStyle="native"
									data={data}
									locale="ja"
									value={emoji}
									searchPosition="none"
									onEmojiSelect={e => {
										setEmoji(e.native)
									}}
								/>
							</PopoverContent>
						</PopoverRoot>
						<Controller
							name="name"
							control={useFormMethods.control}
							render={({ field }) => (
								<Input
									width="full"
									disabled={field.disabled}
									name={field.name}
									value={field.value}
									required={true}
									onChange={e => {
										setName(e.target.value)
										field.onChange(e.target.value)
									}}
								/>
							)}
						/>
					</Group>
				</FieldRoot>
				<FieldRoot>
					<FieldLabel>音量</FieldLabel>
					<Controller
						name="volume"
						control={useFormMethods.control}
						render={({ field }) => (
							<HStack width="full" gap={4}>
								<Slider
									width="full" max={1} min={0} step={0.01}
									value={field.value}
									disabled={field.disabled}
									name={field.name}
									onValueChange={({ value }) => {
										setVolume(value)
										field.onChange(value)
									}}
								/>
								<Text width="12">{Math.floor(volume[0] * 100)}%</Text>
							</HStack>
						)}
					/>
				</FieldRoot>
				<FieldRoot>
					<FieldLabel>試聴</FieldLabel>
					<Sound data={{ name, emoji, url, volume: volume[0] }}></Sound>
				</FieldRoot>
				<HStack width="full" justifyContent="space-between">
					<Button variant="outline" onClick={() => onCancel()}>キャンセル</Button>
					<Button type="submit">OK</Button>
				</HStack>
			</VStack>
		</form>
	)
}
