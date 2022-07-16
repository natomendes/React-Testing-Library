import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './handleWithRouter';
import pokemons from '../data';

describe('Requisito 6', () => {
  test(`Teste se é renderizado um card
   com as informações de determinado pokémon:`, () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
    />);
    expect(screen.getByTestId('pokemon-name'))
      .toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type'))
      .toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    expect(screen.getByRole('img', {
      name: /pikachu sprite/i,
    }))
      .toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test(`Teste se o card do pokémon indicado na Pokédex contém um link de
   navegação para exibir detalhes deste pokémon. O link deve possuir a URL
   /pokemons/<id>, onde <id> é o id do pokémon exibido;`, () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
    />);
    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemons[0] }
    />);
    expect(screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    })).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
