import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/models/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon: Pokemon;

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

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  pokmenonView(idx: number) {
    console.log('hola');
    console.log(idx);
    this.router.navigate(['/pokemon', idx]);
  }
}
