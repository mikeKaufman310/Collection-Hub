import Home from "./Home";
import {screen} from '@testing-library/react';
import renderWithRouter from '../test-utils';

/**
 * Test Suite for unit testing web frontend home page
 * @author Michael Kaufman
 */

test('contains header', ()=>{
    renderWithRouter(<Home />);
    const headerElement = screen.getByText(/CollectionHub/i);
    expect(headerElement).toBeInTheDocument();
});

test('contains add collection button', ()=>{
    renderWithRouter(<Home />);
    const addCollectionButton = screen.getByTestId('addCollectionButton');
    expect(addCollectionButton).toBeInTheDocument();
});

test('contains collection button', ()=>{
    renderWithRouter(<Home />);
    const collectionButton = screen.getByTestId('collectionButton');
    expect(collectionButton).toBeInTheDocument();
})