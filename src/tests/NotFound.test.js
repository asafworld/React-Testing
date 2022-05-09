import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testa o componente NotFound', () => {
  test('Testa se a página possui heading com texto específico', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading',
      { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
    const emoji = screen.getByRole('img', { name: /crying emoji/i });
    expect(emoji).toBeInTheDocument();
  });

  test('Testa se renderiza a imagem específica', () => {
    const img = (
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    );
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', img);
  });
});
