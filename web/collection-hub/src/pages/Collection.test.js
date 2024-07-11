import Collection from "./Collection";
import {render, screen} from '@testing-library/react';
import renderWithRouter from "../test-utils";
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('contains home button', () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewCollection" element={<Collection/>}/>
            </Routes>
        </MemoryRouter>
    );

    const homeButtonElement = screen.getByTestId('homeButton');
    expect(homeButtonElement).toBeInTheDocument();
});