import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import { About } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente About', () => {
  const text1 = (
    'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
  );

  const text2 = (
    'One can filter Pokémons by type, and see more details for each one of them'
  );

  const imgLink = (
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );

  test('Testa se há informações sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const simulatesText = screen.queryByText(text1);
    expect(simulatesText).toBeInTheDocument();
    expect(simulatesText).not.toBe(null);
    const filterText = screen.queryByText(text2);
    expect(filterText).toBeInTheDocument();
    expect(filterText).not.toBe(null);
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingAbout).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imgLink);
  });
});
