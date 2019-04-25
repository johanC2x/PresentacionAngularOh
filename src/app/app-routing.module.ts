import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonaComponent} from '../app/persona/persona.component';

const routes: Routes = [
  {path: '', redirectTo: 'persona', pathMatch: 'full'},
  {path: 'persona', component: PersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
