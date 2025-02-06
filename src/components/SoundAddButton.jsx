import {
	Button, DialogActionTrigger, DialogBackdrop, DialogBody, DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger
} from '@chakra-ui/react'
import { HiMiniPlusCircle } from "react-icons/hi2"

export const SoundAddButton = () => {
	return (
		<DialogRoot
			size="sm"
			closeOnInteractOutside={false}
		>
			<DialogBackdrop></DialogBackdrop>
			<DialogTrigger asChild>
				<Button>
					<HiMiniPlusCircle />サウンドを追加
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>サウンドを追加</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<p>ああああああああああああああああああああああ</p>
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline">キャンセル</Button>
					</DialogActionTrigger>
					<Button>追加</Button>
				</DialogFooter>
			</DialogContent>
		</DialogRoot >
	)
}
