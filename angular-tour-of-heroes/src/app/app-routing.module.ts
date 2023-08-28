import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {path: "", component: HeroListComponent}, 
  {path: "messages", component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
