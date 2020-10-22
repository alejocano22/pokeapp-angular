import { Component, Input, OnChanges } from '@angular/core';
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
export class PokemonCardChartComponent implements OnChanges {
  @Input() currentPokemon: Pokemon;
  @Input() comparisonPokemon: Pokemon;
  @Input() isComparing: boolean;
  barChartType: ChartType = 'bar';
  barChartOptions: ChartOptions = chartOptions;
  barChartData: ChartDataSets[];
  barChartLabels: Label[];

  constructor() { }

  ngOnChanges(): void {
    if (this.currentPokemon) {
      this.barChartLabels = this.currentPokemon.stats.map((stat) => stat['stat']['name']);
      const currentPokemonBaseStat = this.currentPokemon['stats'].map((stat) => stat['base_stat']);
      this.barChartData = [{
        data: currentPokemonBaseStat,
        label: this.currentPokemon.name,
        ...barChartPrimaryStyle }];
    }
    if (this.comparisonPokemon && this.isComparing) {
      const comparisonPokemonBaseStat = this.comparisonPokemon.stats.map((stat) => stat['base_stat']);
      this.barChartData.push({
        data: comparisonPokemonBaseStat,
        label: this.comparisonPokemon.name,
        ...barChartSecondaryStyle });
    }
  }
}
