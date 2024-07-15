import Collection from "./Collection";
import {render, screen, fireEvent} from '@testing-library/react';
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

test('contains add item button', () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewCollection" element={<Collection/>}/>
            </Routes>
        </MemoryRouter>
    );

    const addItemButton = screen.getByTestId('addItemButton');
    expect(addItemButton).toBeInTheDocument();
});

test('contains delete collection button', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewCollection" element={<Collection/>}/>
            </Routes>
        </MemoryRouter>
    );

    const deleteButton = screen.getByTestId('deleteButton');
    expect(deleteButton).toBeInTheDocument();
});

test('contains header', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewCollection" element={<Collection/>}/>
            </Routes>
        </MemoryRouter>
    );

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
});

test('warning appears on delete click', ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/viewCollection', state: { element: {name: "mockCollection"} } }]}>
            <Routes>
                <Route path="/viewCollection" element={<Collection/>}/>
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
                <Route path="/viewCollection" element={<Collection/>}/>
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