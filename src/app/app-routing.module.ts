import { AddPlayerComponent } from './add-player/add-player.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPlayersComponent } from './show-players/show-players.component';

const routes: Routes = [
  {path: 'addPlayer', component: AddPlayerComponent},
  {path: 'showPlayer', component: ShowPlayersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
