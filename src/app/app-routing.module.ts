import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import { ErrorComponent  } from './error/error.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: 'HomeComponent', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
