import { Button, FieldLabel, FieldRoot, HStack, Input, VStack } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'

export const CategoryForm = ({ onDataSubmit, onCancel, defaultValues }) => {
	const useFormMethods = useForm({
		defaultValues: {
			name: '',
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
				</FieldRoot>
				<HStack width="full" justifyContent="space-between">
					<Button variant="outline" onClick={() => onCancel()}>キャンセル</Button>
					<Button type="submit">OK</Button>
				</HStack>
			</VStack>
		</form>
	)
}
