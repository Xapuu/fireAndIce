import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

export interface UserEntity {
  username: string;
  favorites: {
    books: Record<string, boolean>;
    characters: Record<string, boolean>;
    houses: Record<string, boolean>
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  currentUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject(null)

  constructor() { }

  login(username : string, password){

    return of('Mock of success request').pipe(
      map(() => {
        this.currentUser$.next({
          username,
          favorites: {
            "books": {
              // Uncomment the following code for mock data
              // "https://anapioficeandfire.com/api/books/1": true,
              // "https://anapioficeandfire.com/api/books/2": true,
              // "https://anapioficeandfire.com/api/books/3": true,
              // "https://anapioficeandfire.com/api/books/4": true,
              // "https://anapioficeandfire.com/api/books/5": true,
              // "https://anapioficeandfire.com/api/books/6": true,
              // "https://anapioficeandfire.com/api/books/7": true,
              // "https://anapioficeandfire.com/api/books/8": true,
              // "https://anapioficeandfire.com/api/books/9": true,
              // "https://anapioficeandfire.com/api/books/10": true,
              // "https://anapioficeandfire.com/api/books/11": true,
              // "https://anapioficeandfire.com/api/books/12": true
            },
            "characters": {
            // Uncomment the following code for mock data
            //   "https://anapioficeandfire.com/api/characters/1": true,
            //   "https://anapioficeandfire.com/api/characters/2": true,
            //   "https://anapioficeandfire.com/api/characters/3": true,
            //   "https://anapioficeandfire.com/api/characters/4": true,
            //   "https://anapioficeandfire.com/api/characters/5": true,
            //   "https://anapioficeandfire.com/api/characters/6": true,
            //   "https://anapioficeandfire.com/api/characters/7": true,
            //   "https://anapioficeandfire.com/api/characters/8": true,
            //   "https://anapioficeandfire.com/api/characters/9": true,
            //   "https://anapioficeandfire.com/api/characters/10": true,
            //   "https://anapioficeandfire.com/api/characters/11": true,
            //   "https://anapioficeandfire.com/api/characters/12": true,
            //   "https://anapioficeandfire.com/api/characters/13": true,
            //   "https://anapioficeandfire.com/api/characters/14": true,
            //   "https://anapioficeandfire.com/api/characters/15": true,
            //   "https://anapioficeandfire.com/api/characters/16": true,
            //   "https://anapioficeandfire.com/api/characters/17": true,
            //   "https://anapioficeandfire.com/api/characters/18": true,
            //   "https://anapioficeandfire.com/api/characters/19": true,
            //   "https://anapioficeandfire.com/api/characters/20": true
            },
            "houses": {
            // Uncomment the following code for mock data
            //   "https://anapioficeandfire.com/api/houses/1": true,
            //   "https://anapioficeandfire.com/api/houses/2": true,
            //   "https://anapioficeandfire.com/api/houses/3": true,
            //   "https://anapioficeandfire.com/api/houses/4": true,
            //   "https://anapioficeandfire.com/api/houses/5": true,
            //   "https://anapioficeandfire.com/api/houses/6": true,
            //   "https://anapioficeandfire.com/api/houses/7": true,
            //   "https://anapioficeandfire.com/api/houses/8": true,
            //   "https://anapioficeandfire.com/api/houses/9": true,
            //   "https://anapioficeandfire.com/api/houses/10": true,
            //   "https://anapioficeandfire.com/api/houses/11": true,
            //   "https://anapioficeandfire.com/api/houses/12": true,
            //   "https://anapioficeandfire.com/api/houses/13": true,
            //   "https://anapioficeandfire.com/api/houses/14": true,
            //   "https://anapioficeandfire.com/api/houses/15": true,
            //   "https://anapioficeandfire.com/api/houses/16": true,
            //   "https://anapioficeandfire.com/api/houses/17": true,
            //   "https://anapioficeandfire.com/api/houses/18": true,
            //   "https://anapioficeandfire.com/api/houses/19": true,
            //   "https://anapioficeandfire.com/api/houses/20": true
            }
          }
        })
        return this.currentUser$
      })
    )

  }

  register(username, password){
    return of('Mock of success request').pipe(
      switchMap(() => this.login(username, password))
    )
  }

  logout(){
    this.currentUser$.next(null)
  }

  addFavorite(collection, id){
    this.currentUser$.pipe(
      first(),
      map(userData => {
        this.currentUser$.next({
          ...userData,
          favorites:{
            ...userData.favorites,
            [collection]: {
              ...userData.favorites[collection],
              [id]: true
            }
          }
        })
      })
    ).subscribe()
  }

  removeFavorite(collection, id){
    this.currentUser$.pipe(
      first(),
      map(userData => {
        this.currentUser$.next({
          ...userData,
          favorites:{
            ...userData.favorites,
            [collection]: {
              ...userData.favorites[collection],
              [id]: false
            }
          }
        })
      })
    ).subscribe()
  }

  toggleFavorite(collection, id){
    this.currentUser$.pipe(
      first(),
      map(userData => {
        this.currentUser$.next({
          ...userData,
          favorites:{
            ...userData.favorites,
            [collection]: {
              ...userData.favorites[collection],
              [id]: !userData.favorites[collection][id]
            }
          }
        })
      })
    ).subscribe()
  }
}
