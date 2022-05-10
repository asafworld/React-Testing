import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente Pokedex', () => {
  const next = 'Próximo pokémon';
  test('Testa se a página contém um h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se exibe o próximo pokémon se clicla no botão Próximo pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: next });
    expect(nextButton).toBeInTheDocument();

    const poke1 = screen.getByText('Pikachu');
    expect(poke1).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(poke1).not.toBeUndefined();

    const poke2 = screen.getByText('Charmander');
    expect(poke2).toBeInTheDocument();

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const newPoke = screen.getByText('Pikachu');
    expect(newPoke).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez.', () => {
    const one = 1;
    const nine = 9;
    renderWithRouter(<App />);
    const favePokemons = screen.getAllByTestId('pokemon-name');
    expect(favePokemons.length).toBe(one);
    expect(favePokemons.length).not.toBe(nine);
  });

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    const buttonsObj = [
      {
        name: 'All',
      },
      {
        name: 'Electric',
      },
      {
        name: 'Fire',
      },
      {
        name: 'Bug',
      },
      {
        name: 'Poison',
      },
      {
        name: 'Psychic',
      },
      {
        name: 'Normal',
      },
      {
        name: 'Dragon',
      },
    ];

    renderWithRouter(<App />);
    buttonsObj.forEach((obj) => {
      const response = screen.getByRole('button', { name: obj.name });
      expect(response).toBeInTheDocument();
      userEvent.click(response);
    });

    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    const nextButton = screen.getByRole('button', { name: next });
    expect(nextButton).toBeDisabled();

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();

    const nextButtonConst = screen.getByRole('button', { name: 'Próximo pokémon' });
    const poke1 = screen.getByText('Pikachu');
    expect(poke1).toBeInTheDocument();

    userEvent.click(nextButtonConst);
    expect(poke1).not.toBeUndefined();

    const poke2 = screen.getByText('Charmander');
    expect(poke2).toBeInTheDocument();

    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);
    userEvent.click(nextButtonConst);

    const newPoke = screen.getByText('Pikachu');
    expect(newPoke).toBeInTheDocument();

    expect(screen.getAllByTestId('pokemon-type-button').length).not.toBe(0);
  });
});
