import AddItem from "./AddItem";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {render, screen} from '@testing-library/react';

/**
 * Test Suite for unit testing web frontend add item page
 * @author Michael Kaufman
 */

test('inputs appear on page render', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/addItem" element={<AddItem/>}/>
            </Routes>
        </MemoryRouter>
    );

    const inputs = screen.getByTestId("inputs");
    expect(inputs).toBeInTheDocument();
});