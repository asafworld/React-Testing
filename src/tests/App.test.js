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

describe('Testa o componente App.', () => {
  test('Testa se há um link para o componente Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
  });

  test('Testa se há um link para o componente About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
  });

  test('Testa se há um link para o componente Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('Testa se Home é renderizada, ao clicar no link Home (url: /)', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const presentUrl = history.location.pathname;
    expect(presentUrl).toBe('/');
  });

  test('Testa se About é renderizada, ao clicar no link About (url: /about)', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);
    const presentUrl = history.location.pathname;
    expect(presentUrl).toBe('/about');
  });

  test('Testa se Fav.P é renderizada, ao clicar no link Fav.P (url: /favorites)', () => {
    const { history } = renderWithRouter(<App />);
    const favePoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favePoke);
    const presentUrl = history.location.pathname;
    expect(presentUrl).toBe('/favorites');
  });

  test('Testa No Found é renderizado ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-e-uma-pagina');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
    const imgAlt = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgAlt).toBeInTheDocument();
  });
});
