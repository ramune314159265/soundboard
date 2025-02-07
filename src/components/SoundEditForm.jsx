import { Slider } from "@/components/ui/slider"
import { Button, FieldLabel, FieldRoot, HStack, Input, VStack } from '@chakra-ui/react'
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
	return (
		<form onSubmit={useFormMethods.handleSubmit((data) => onDataSubmit(data))}>
			<VStack gap="4">
				<FieldRoot>
					<FieldLabel>名前</FieldLabel>
					<Controller
						name="name"
						control={useFormMethods.control}
						render={({ field }) => (
							<Input
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
				</FieldRoot>
				<FieldRoot>
					<FieldLabel>絵文字</FieldLabel>
					<Controller
						name="emoji"
						control={useFormMethods.control}
						render={({ field }) => (
							<Input
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
