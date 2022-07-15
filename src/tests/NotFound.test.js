import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './handleWithRouter';

describe('Requisito 4', () => {
  test(`Teste se a página contém um heading h2
  com o texto Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeDefined();
  });
  test(`Teste se a página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound).toBeDefined();
    expect(imgNotFound).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
