import {
	PopoverContent,
	PopoverRoot,
	PopoverTrigger
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Button, FieldLabel, FieldRoot, Group, HStack, Input, VStack } from '@chakra-ui/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export const SoundEditForm = ({ onDataSubmit, onCancel, defaultValues }) => {
	const useFormMethods = useForm({
		defaultValues: {
			name: '',
			emoji: '',
			volume: [1],
			...defaultValues,
		}
	})
	const [emoji, setEmoji] = useState("🎉")
	return (
		<form onSubmit={useFormMethods.handleSubmit((data) => onDataSubmit({ ...data, emoji }))}>
			<VStack gap="4">
				<FieldRoot>
					<FieldLabel>絵文字＆名前</FieldLabel>
					<Group width="full">
						<PopoverRoot placement="right">
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
									searchPosition="none"
									value={emoji}
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
							<Slider
								width="full" max={1} min={0} step={0.01}
								value={field.value}
								disabled={field.disabled}
								name={field.name}
								onValueChange={({ value }) => {
									field.onChange(value)
								}}
							/>
						)}
					/>
				</FieldRoot>
				<HStack width="full" justifyContent="space-between">
					<Button variant="outline" onClick={() => onCancel()}>キャンセル</Button>
					<Button type="submit">追加</Button>
				</HStack>
			</VStack>
		</form>
	)
}
