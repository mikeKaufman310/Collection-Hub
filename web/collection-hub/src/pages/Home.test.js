import Home from "./Home";
//import App from "./App";
import {screen} from '@testing-library/react';
import renderWithRouter from '../test-utils'

test('contains header', ()=>{
    renderWithRouter(<Home />);
    const headerElement = screen.getByText(/CollectionHub/i);
    expect(headerElement).toBeInTheDocument();
});