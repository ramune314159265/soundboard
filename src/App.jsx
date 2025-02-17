import { Grid, GridItem } from '@chakra-ui/react'
import { ConfigDialog } from './components/ConfigDialog'
import { Header } from './components/Header'
import { SoundList } from './components/SoundList'

function App() {
	return (
		<>
			<Grid templateRows={"3rem 1fr"} width={"100%"} height={"100%"}>
				<GridItem>
					<Header></Header>
				</GridItem>
				<GridItem overflowY={"auto"}>
					<SoundList></SoundList>
				</GridItem>
			</Grid>
			<ConfigDialog></ConfigDialog>
		</>
	)
}

export default App
