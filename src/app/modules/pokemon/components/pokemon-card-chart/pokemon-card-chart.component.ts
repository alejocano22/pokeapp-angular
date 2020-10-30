import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Pokemon } from '../../models/pokemon';
import { barChartOptions as chartOptions } from 'src/app/utils/chart/bar-chart';
import { barChartPrimaryStyle, barChartSecondaryStyle } from 'src/app/utils/chart/bar-chart';

@Component({
  selector: 'app-pokemon-card-chart',
  templateUrl: './pokemon-card-chart.component.html',
  styleUrls: ['./pokemon-card-chart.component.css']
})
export class PokemonCardChartComponent {
  @Input() isComparing: boolean;
  @Input()
  set currentPokemon(currentPokemon: Pokemon) {
    this.currentPokemonInformation = currentPokemon;
    this.fillPokemonChartData(currentPokemon);
  }

  @Input()
  set comparisonPokemon(comparisonPokemon: Pokemon) {
    this.comparisonPokemonInformation = comparisonPokemon;
    this.fillPokemonChartData(comparisonPokemon);
  }

  currentPokemonInformation: Pokemon;
  comparisonPokemonInformation: Pokemon;
  barChartType: ChartType = 'bar';
  barChartOptions: ChartOptions = chartOptions;
  barChartData: ChartDataSets[];
  barChartLabels: Label[];

  constructor() { }

  fillPokemonChartData(pokemon: Pokemon): void {
    if (pokemon) {
      if (!this.isComparing) {
        this.barChartLabels = pokemon.stats.map((stat) => stat.stat.name);
        const currentPokemonBaseStat = pokemon.stats.map((stat) => stat.base_stat);
        this.barChartData = [{
          data: currentPokemonBaseStat,
          label: pokemon.name,
          ...barChartPrimaryStyle }];
      } else {
        const comparisonPokemonBaseStat = pokemon.stats.map((stat) => stat.base_stat);
        this.barChartData.push({
          data: comparisonPokemonBaseStat,
          label: pokemon.name,
          ...barChartSecondaryStyle });
      }
    }
  }
}
