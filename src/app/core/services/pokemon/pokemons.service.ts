import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../../models/pokemon';
import { SearchResult } from '../../models/response/search-results';
import { Search } from '../../models/search/search';

@Injectable({
  providedIn: 'root'
})

export class PokemonsService {

  constructor(private http: HttpClient) {

  }

  findAllPokemons() {
    return this.http.get<any>(`${environment.POKEMON_API}/pokemons/`);
  }

  findPokemonsByIds(ids: any) {
    return this.http.get<any>(`${environment.POKEMON_API}/pokemons/${ids}`);
  }

  findByFiltersAndPage(search: Search): Observable<SearchResult<Pokemon>> {
    let url = `${environment.POKEMON_API}/pokemons?`;
    if (search) {
      if (search.name !== '') {
        url += `name=${search.name}`;
      }
      if (search.type) {
        url += url.includes('=') ? `&filter:type=${search.type}` : `filter:type=${search.type}`;
      }
      if (search.sort) {
        url += url.includes('=') ? `&sort=${search.sort}` : `sort=${search.sort}`;
      }
    }
    console.log(url);
    return this.http.get<any>(url);
  }

  findById(id: string) {
    console.log(`${environment.POKEMON_API}/pokemons/${id}`);
    return this.http.get<any>(`${environment.POKEMON_API}/pokemons/${id}`);
  }
}
