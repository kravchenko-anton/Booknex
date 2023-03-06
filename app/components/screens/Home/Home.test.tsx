import { render, screen } from '@testing-library/react-native'
import Home from './Home'

test('HomeTest', async () => {
	render(<Home />)
	expect(screen.getByTestId('First text!!!')).toBeInTheDocument()
})
