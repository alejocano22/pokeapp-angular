import { environment } from 'src/environments/environment';

export const getPokemonImageUrl = (id: number): string => {
  return environment.pokemonImagesUrl + id.toString() + '.png?raw=true';
};
