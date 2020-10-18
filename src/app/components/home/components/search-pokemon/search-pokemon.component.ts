import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Search } from 'src/app/core/models/search/search';


@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  @Output() public filters = new EventEmitter<Search>();
  @Output() public tryLuck = new EventEmitter<boolean>();

  pokemonId: string;
  pokemonName: string;
  pokemonType: string;
  pokemonSort: string;

  constructor() {
    this.pokemonName = '';
  }

  ngOnInit() {
  }

  // Funciones del componentes
  search(): void {
    const search: Search = new Search();
    search.id = this.getId();
    search.name = this.pokemonName;
    search.type = this.pokemonType;
    search.sort = this.pokemonSort;
    this.filters.emit(search);
  }

  doTryLuck(): void {
    this.tryLuck.emit(true);
  }

  getId(): number {
    let id = 0;
    if (this.pokemonId && this.pokemonId !== '') {
      id = parseFloat(this.pokemonId);
    }
    return id;
  }
}
