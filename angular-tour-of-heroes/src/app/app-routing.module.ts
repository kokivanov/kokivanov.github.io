import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {path: "", component: HeroListComponent}, 
  {path: "messages", component: MessagesComponent},
  {path: "heroes/:id", component: HeroFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
