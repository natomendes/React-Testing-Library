import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './handleWithRouter';

beforeEach(() => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', {
    name: /more details/i,
  }));
});

describe('Requisito 7', () => {
  test(`A página deve conter um texto <name> Details,
  onde <name> é o nome do pokémon`, () => {
    expect(screen.getByRole('heading', {
      name: /pikachu details/i,
    })).toBeDefined();
  });

  test(`**Não** deve existir o link de navegação para os detalhes
  do pokémon selecionado`, () => {
    expect(screen.queryByText(/more details/i)).toBeNull();
  });

  test(`A seção de detalhes deve conter um heading
   h2 com o texto Summary`, () => {
    expect(screen.getByRole('heading', {
      name: /summary/i,
    })).toBeDefined();
  });

  test(`A seção de detalhes deve conter um parágrafo com 
  o resumo do pokémon específico sendo visualizado.
  </details>`, () => {
    expect(screen.getByText(
      /this intelligent pokémon roasts/i,
    )).toBeDefined();
  });

  test(`Na seção de detalhes deverá existir um heading h2 
    com o texto Game Locations of <name>`, () => {
    expect(screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    })).toBeDefined();
  });

  test(`Todas as localizações do pokémon devem ser
  mostradas na seção de detalhes`, () => {
    expect(screen.getAllByRole('img', {
      name: 'Pikachu location',
    })).toHaveLength(2);
  });

  test(`Todas as localizações do pokémon devem ser
  mostradas na seção de detalhes`, () => {
    const locationImg = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(locationImg[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText(/kanto viridian forest/i))
      .toBeDefined();
    expect(screen.getByText(/kanto power plant/i))
      .toBeDefined();
  });

  test(`A página deve exibir um checkbox 
  que permite favoritar o pokémon`, () => {
    expect(screen.getByLabelText('Pokémon favoritado?'))
      .toBeDefined();
  });

  test(`Cliques alternados no checkbox devem adicionar
  e remover respectivamente o pokémon da lista de favoritos`, () => {
    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    const favIcon = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favIcon).toBeNull();
    userEvent.click(favoriteCheckbox);
    expect(favIcon).toBeDefined();
  });
});
