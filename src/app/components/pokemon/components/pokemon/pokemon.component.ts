import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonsService } from 'src/app/core/services/pokemon/pokemons.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent implements OnInit {

  pokemon: Pokemon;
  loading = true;
  colors = {
    normal : '#A4ACAF',
    fighting: '#D56723',
    flying: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
    poison: '#B97FC9',
    ground: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    rock: '#A38C21',
    bug: '#729F3F',
    ghost: '#7B62A3',
    steel: '#9EB7B8',
    fire: '#FD7D24',
    water: '#4592C4',
    grass: '#9BCC50',
    electric: '#EED535',
    psychic: '#F366B9',
    ice: '#51C4E7',
    dragon: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    dark: '#707070',
    fairy: '#FDB9E9',
    unknown: '',
    shadow: ''
  };
  constructor(private router: ActivatedRoute, private pokemonsService: PokemonsService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(routeParams => {
      this.getPokemonDetail(routeParams.id);
    });
  }

  public getPokemonDetail(pokemonId: string) {
    this.pokemonsService.findById(pokemonId)
      .pipe(
        take(1)
      )
      .subscribe(
        res => {
          this.pokemon = res.results[0];
          this.loading = false;
        },
        err => {
          console.log(err);
        },
        () => {
            // petición finalizada
        });
  }
}
