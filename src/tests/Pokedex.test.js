import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from './handleWithRouter';
import App from '../App';

const mockPokemos = [
  {
    averageWeight: {
      measurementUnit: 'kg',
      value: '50',
    },
    foundAt: [{
      location: 'testeLocation',
      map: 'testeMap',
    }],
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
    foundAt: [{
      location: 'testeLocation2',
      map: 'testeMap2',
    }],
    id: 2,
    image: 'teste2.png',
    moreInfo: 'testeInfo2',
    name: 'testePokemon2',
    summary: 'testeSummary2',
    type: 'testeType2',
  },
];

const pokemonNameId = 'pokemon-name';
describe('Requisito 5', () => {
  test(`Teste se a página contém um heading h2
  com o texto Encountered pokémons`, () => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ {
        1: true,
        2: false,
      } }
    />);

    const foundPokemon = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(foundPokemon).toBeDefined();
  });

  test(`Teste se é exibido o próximo pokémon da
  lista quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ {
        1: true,
        2: false,
      } }
    />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeDefined();
  });

  test(`Os próximos pokémons da lista devem ser mostrados,
  um a um, ao clicar sucessivamente no botão`, () => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ {
        1: true,
        2: false,
      } }
    />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    const pokeName = screen.getByText(/testePokemon2/i);
    expect(pokeName).toBeDefined();
  });

  test(`O primeiro pokémon da lista deve ser mostrado ao
  clicar no botão, se estiver no último pokémon da lista.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ {
        1: true,
        2: false,
      } }
    />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeDefined();
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ mockPokemos }
      isPokemonFavoriteById={ {
        1: true,
        2: false,
      } }
    />);

    const pokeName = screen.getAllByTestId(pokemonNameId);
    expect(pokeName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const numOfFilter = 7;
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filterButtons).toHaveLength(numOfFilter);
    expect(screen.getAllByRole('button', { name: 'Electric' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Fire' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Bug' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Poison' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Psychic' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Normal' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Dragon' })).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByTestId(pokemonNameId)).toHaveTextContent('Charmander');
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonNameId)).toHaveTextContent('Rapidash');
    expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId(pokemonNameId)).toHaveTextContent('Pikachu');
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonNameId)).toHaveTextContent('Charmander');
  });
});
