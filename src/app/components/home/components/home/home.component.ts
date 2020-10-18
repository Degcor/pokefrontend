import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Pokemon } from 'src/app/core/models/pokemon';
import { SearchResult } from 'src/app/core/models/response/search-results';
import { Search } from 'src/app/core/models/search/search';
import { PokemonsService } from 'src/app/core/services/pokemon/pokemons.service';
import { UtilFunctions } from 'src/app/utils/CommonsUtils';
import Swiper from 'swiper';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  loading = true;
  showDefaultGrid: boolean;
  test: boolean;
  pokemonList: Pokemon[];
  mySwiper: Swiper;

  totalRecords: number;
  page: number;
  pageSize: number;
  asyncPokemonList: Observable<Pokemon[]>;


  constructor(private pokemonsService: PokemonsService, private snackBar: MatSnackBar) {
    this.showDefaultGrid = false;
    this.test = false;
    this.pokemonList = [];
    this.page = 1;
    this.pageSize = 20;
    this.totalRecords = 0;
  }

  ngOnInit() {
    this.findPokemonsByLucky();
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 3000,
      }
    });
  }

  doSearch(event: Search): void {
    if (event) {
      this.test = true;
      this.page = 1;
      if (this.searchingById(event)) {
        this.findPokemon(event.id);
      } else {
        this.showDefaultGrid = false;
        this.pokemonList = [];
        this.loading = true;
        this.getPokemonList(event);
      }
    }
  }

  doTryLuck(event: boolean): void {
    if (event) {
      this.loading = true;
      this.showDefaultGrid = false;
      this.test = false;
      this.totalRecords = 0;
      this.showSnackBar();
      this.findPokemonsByLucky();
    }
  }

  pageChanged(page: number): void {
    this.page = page;
    this.getPokemonList(null);
  }

  private findPokemonsByLucky(): void {
    this.pokemonsService.findAllPokemons().pipe(take(1)).subscribe(resp => {
      this.findPokemonsByIds(resp.count, 8);
    });
  }

  private findPokemonsByIds(totalPokemons: number, pokemonsToShow: number): void {
    const ids = UtilFunctions.getRamdomIdsToFinds(totalPokemons, pokemonsToShow);
    this.pokemonsService.findPokemonsByIds(ids).pipe(take(1)).subscribe(response => {
      this.pokemonList = response.results;
      this.loading = false;
      this.showDefaultGrid = true;
    });
  }

  private getPokemonList(search: Search): void {
    this.asyncPokemonList = this.loadPokemons(search).pipe(
      tap(response => {
        this.totalRecords = response.count;
        this.loading = false;
      }),
      map (response => response.results)
    );
  }

  private loadPokemons(search: Search): Observable<SearchResult<Pokemon>> {
    return this.pokemonsService.findByFiltersAndPage(search);
  }

  private findPokemon(id: number): void {
    let doFindById = true;
    if (this.pokemonList.length === 1) {
      if (this.pokemonList[0].id === id) {
        doFindById = false;
      }
    }
    if (doFindById) {
      this.findPokemonById(id.toString());
    }
  }

  private findPokemonById(id: string): void {
    this.showDefaultGrid = false;
    this.pokemonList = [];
    this.loading = true;
    this.pokemonsService.findById(id).pipe(take(1)).subscribe(
      response => {
        this.pokemonList.push(response);
        this.loading = false;
        this.showDefaultGrid = true;
      });
  }

  private searchingById(search: Search): boolean {
    let itstrue = false;
    if (search && search.id !== 0 ) {
      itstrue = true;
    }
    return itstrue;
  }

  private showSnackBar(): void {
    const message = 'Pika pika pikachuuu !';
    const setAutoHide = true;
    const autoHide = 1500;
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    const config = new MatSnackBarConfig();
    config.verticalPosition = verticalPosition;
    config.horizontalPosition = horizontalPosition;
    config.duration = setAutoHide ? autoHide : 0;
    this.snackBar.open(message, undefined, config);
  }
}
