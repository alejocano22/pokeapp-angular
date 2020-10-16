import { pokemonImagesUrl } from '../const/images';

export const getPokemonImageUrl = (id: number): string => {
  return pokemonImagesUrl + id.toString() + '.png?raw=true';
};
