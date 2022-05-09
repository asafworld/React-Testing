import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente Favorite Pokemons', () => {
  test('Testa se é exibida mensagem quando não há favoritos', () => {
    const emptyArr = [];
    renderWithRouter(<FavoritePokemons pokemons={ emptyArr } />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('Testa os pokemons favoritos são exibidos', () => {
    const nine = 9;
    const propsLength = pokemons.length;
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favePokemons = screen.getAllByTestId('pokemon-name');
    expect(favePokemons.length).not.toBe(0);
    expect(favePokemons.length).toBe(nine);
    expect(favePokemons.length).toBe(propsLength);
  });
});
