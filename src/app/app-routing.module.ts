import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'book',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  },
  {
    path: 'character',
    loadChildren: () => import('./modules/character/character.module').then(m => m.CharacterModule)
  },
  {
    path: 'house',
    loadChildren: () => import('./modules/house/house.module').then(m => m.HouseModule)
  },
  {
    path: 'authorize',
    loadChildren: () => import('./modules/authorize/authorize.module').then(m => m.AuthorizeModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'house'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
