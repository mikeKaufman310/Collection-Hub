import AddCollection from "./AddItem";
import {screen} from '@testing-library/react';
import renderWithRouter from '../test-utils';

/**
 * Test Suite for unit testing web frontend add collection page
 * @author Michael Kaufman
 */

test('expect home button to be present on render', ()=>{
    renderWithRouter(<AddCollection/>);
    const homeButton = screen.getByTestId("homeButton");
    expect(homeButton).toBeInTheDocument();
});

test('expect input and button div to be present on render', ()=>{
    renderWithRouter(<AddCollection/>);
    const inputAndButton = screen.getByTestId("inputtAndButton");
    expect(inputAndButton).toBeInTheDocument();
});