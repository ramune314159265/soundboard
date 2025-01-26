import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'

function App() {
	return (
		<Grid  templateRows={"3rem 1fr"} height={"100dvh"}>
			<GridItem>
				<Header></Header>
			</GridItem>
			<GridItem>

			</GridItem>
		</Grid>
	)
}

export default App
