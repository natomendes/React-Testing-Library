import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './handleWithRouter';

const mockPokemos = [
  {
    averageWeight: {
      measurementUnit: 'kg',
      value: '50',
    },
    foundAt: {
      location: 'testeLocation',
      map: 'testeMap',
    },
    id: 1,
    image: 'teste.png',
    moreInfo: 'testeInfo',
    name: 'pikachu',
    summary: 'testeSummary',
    type: 'testeType',
  },
  {
    averageWeight: {
      measurementUnit: 'kg',
      value: '60',
    },
    foundAt: {
      location: 'testeLocation2',
      map: 'testeMap2',
    },
    id: 2,
    image: 'teste2.png',
    moreInfo: 'testeInfo2',
    name: 'testePokemon2',
    summary: 'testeSummary2',
    type: 'testeType2',
  },
];

describe('Requisito 3', () => {
  test(`Teste se é exibida na tela a mensagem No favorite pokemon found,
   caso a pessoa não tenha pokémons favoritos;`, () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavPoke = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPoke).toBeDefined();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemos } />);

    const favPoke1Name = screen.getByText(/pikachu/i);
    const favPoke2Name = screen.getByText(/testePokemon2/i);
    expect(favPoke1Name).toBeDefined();
    expect(favPoke2Name).toBeDefined();
  });
});
