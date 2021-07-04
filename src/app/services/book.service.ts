import { Injectable } from '@angular/core';
import { BaseService } from './base.service';


export interface BookEntity {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  country: string;
  mediaType: string;
  released: Date;
  characters: string[];
  povCharacters: string[];
}

export interface BookFilter {
  name: string;
  fromReleaseDate: Date;
  toReleaseDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService<BookEntity, BookFilter>{
  nameSpace = 'books';
}
