import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

export interface CharacterEntity {
  url: string;
  name:string;
  gender:string;
  culture:string;
  born:string;
  died:string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiance: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface CharacterFilters {
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  isAlive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService<CharacterEntity, CharacterFilters>{
  nameSpace = 'characters';
}
