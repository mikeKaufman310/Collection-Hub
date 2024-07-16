import AddCollection from "./AddItem";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import renderWithRouter from '../test-utils';

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