import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import pokemons from '../data';
// import Pokemon from '../components/Pokemon';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente Pokemon', () => {
  const imgLink = (
    'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'
  );

  const moreDetailsText = 'More details';

  test('Testa se as informações de determinado pokémon são renderizadas.', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(name).not.toHaveTextContent('Charmander');
    expect(name).not.toHaveTextContent('Caterpie');

    const valueWeight = screen.getByTestId('pokemon-weight');
    expect(valueWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(valueWeight).not.toHaveTextContent('Average weight: kg 6.0');

    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('src', imgLink);
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa se há um link para mais informações do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);

    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    expect(url).not.toBe('/pokemons/4');
  });

  test('Testa se, ao clicar no link, renderiza as infos do pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();

    const gameLocation = screen.getByText('Game Locations of Pikachu');
    expect(gameLocation).toBeInTheDocument();

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).not.toHaveTextContent('');
  });

  test('Testa se existe um ícone de estrela nos pokémons favoritados.', () => {
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
  });
});
