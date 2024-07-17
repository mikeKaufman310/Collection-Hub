import Item from "./Item";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';

/**
 * Test Suite for unit testing web frontend item page
 * @author Michael Kaufman
 */

test('warning appears on delete click', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewItem" element={<Item/>}/>
            </Routes>
        </MemoryRouter>
    );

    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    const warning = screen.getByTestId('warning');
    expect(warning).toBeVisible();
});

test('warning is not present when no delete click', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewItem" element={<Item/>}/>
            </Routes>
        </MemoryRouter>
    );

    let warning;
    try{
        warning  = screen.getByTestId('warning');
    }catch(e){
        warning = 0;
    }
    expect(warning).toBe(0);
});

test('contains header', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewItem" element={<Item/>}/>
            </Routes>
        </MemoryRouter>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
});

test('contains info', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewItem" element={<Item/>}/>
            </Routes>
        </MemoryRouter>
    );
    const infoElement = screen.getByTestId('info');
    expect(infoElement).toBeInTheDocument();
});