import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';


@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PokemonRoutingModule,
    FormsModule
  ],
  exports: [
    PokemonComponent
  ],
  providers: [

  ]
})
export class PokemonModule { }
