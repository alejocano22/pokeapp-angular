import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { barChartOptions as chartOptions } from 'src/app/utils/chart/bar-chart';
import { barChartPrimaryStyle, barChartSecondaryStyle } from 'src/app/utils/chart/bar-chart';

@Component({
  selector: 'app-pokemon-card-chart',
  templateUrl: './pokemon-card-chart.component.html',
  styleUrls: ['./pokemon-card-chart.component.css']
})
export class PokemonCardChartComponent implements OnInit {
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  barChartType: ChartType = 'bar';
  barChartOptions: ChartOptions = chartOptions;
  barChartData: ChartDataSets[];
  barChartLabels: Label[];

  constructor(private pokemonCardService: PokemonCardEntityService) { }

  ngOnInit(): void {
    this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => (pokemon.name === this.currentPokemon.name)))
      ).subscribe((currentPokemonInfo: Pokemon) => {
        if (currentPokemonInfo) {
          this.barChartLabels = currentPokemonInfo.stats.map((stat) => stat['stat']['name']);
          const currentPokemonBaseStat = currentPokemonInfo['stats'].map((stat) => stat['base_stat']);
          this.barChartData = [{
            data: currentPokemonBaseStat,
            label: this.currentPokemon.name,
            ...barChartPrimaryStyle }];
        }
      });

    if (this.comparisonPokemon) {
      this.pokemonCardService.entities$
        .pipe(
          map((pokemonList) => pokemonList.find((pokemon) => (pokemon.name === this.comparisonPokemon.name)))
        ).subscribe((comparisonPokemonInfo: Pokemon) => {
          if (comparisonPokemonInfo && this.isComparing){
            const comparisonPokemonBaseStat = comparisonPokemonInfo.stats.map((stat) => stat['base_stat']);
            this.barChartData.push({
              data: comparisonPokemonBaseStat,
              label: this.comparisonPokemon.name,
              ...barChartSecondaryStyle });
          }
        });
    }
  }
}
