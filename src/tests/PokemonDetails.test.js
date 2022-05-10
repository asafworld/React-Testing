import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente Pokemon Details', () => {
  const moreDetailsText = 'More details';
  // const { history } = renderWithRouter(<App />);
  test('Testa se as infos do Pokemon estão detalhadas', () => {
    const { container } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();

    const mdnull = screen.queryByText('More Details');
    expect(mdnull).toBeNull();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const paragraphs = container.querySelectorAll('p');
    console.log(paragraphs[3].innerHTML);
    expect(paragraphs[3]).not.toHaveTextContent('');
  });

  test('Testa a seção de mapas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    const gameLocation = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 });
    expect(gameLocation).toBeInTheDocument();

    const srcOne = (
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'
    );

    const srcTwo = (
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'
    );

    const pikachuLoc = 'Pikachu location';

    const two = 2;
    const habits = screen.getAllByAltText(pikachuLoc);
    expect(habits.length).not.toBe(0);
    expect(habits.length).toBe(two);

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', srcOne);
    expect(images[1]).toHaveAttribute('alt', pikachuLoc);
    expect(images[2]).toHaveAttribute('src', srcTwo);
    expect(images[2]).toHaveAttribute('alt', pikachuLoc);

    const habitOne = screen.getByText('Kanto Viridian Forest');
    expect(habitOne).toBeInTheDocument();
    const habitTwo = screen.getByText('Kanto Power Plant');
    expect(habitTwo).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const favIcon = screen.getAllByRole('img');
    expect(favIcon[1]).toBeInTheDocument();
    expect(favIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favIcon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(checkbox);
    expect(favIcon[1]).not.toBeInTheDocument();
    userEvent.click(checkbox);
    const faveAlttext = screen.getByAltText('Pikachu is marked as favorite');
    expect(faveAlttext).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(faveAlttext).not.toBeInTheDocument();
  });
});
