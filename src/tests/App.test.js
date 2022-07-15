import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './handleWithRouter';

describe('Requisito 1', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', {
        name: /home/i,
      });
      const linkAbout = screen.getByRole('link', {
        name: /about/i,
      });
      const linkFavPoke = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });

      expect(linkHome).toBeDefined();
      expect(linkAbout).toBeDefined();
      expect(linkFavPoke).toBeDefined();
    });

  it('Teste se a aplicação é redirecionada para página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', {
        name: /home/i,
      });
      userEvent.click(linkHome);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

  it('Teste se a aplicação é redirecionada para página inicial ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(linkAbout);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

  it('Teste se a aplicação é redirecionada para página inicial ao clicar no link Fav.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavPoke = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      userEvent.click(linkFavPoke);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  it('Teste se é redirecionada para Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/linkqualquer');

      const notFoundText = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });

      expect(notFoundText).toBeDefined();
    });
});
