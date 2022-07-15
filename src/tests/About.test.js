import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './handleWithRouter';

describe('Requisito 2', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titleAbout).toBeDefined();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen
      .getByText(
        /this application simulates a pokédex/i,
        {
          exact: false,
        },
      );
    const secondParagraph = screen
      .getByText(
        /One can filter Pokémons by type/i,
        {
          exact: false,
        },
      );

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgPokedex).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
