import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { generateDefaultPagination } from 'src/app/core/utilities/pagination';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { BookService } from 'src/app/services/book.service';
import { CharacterService } from 'src/app/services/character.service';
import { HouseService } from 'src/app/services/house.service';
import { Pagination } from 'src/app/services/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bookPageData$: BehaviorSubject<Pagination> = new BehaviorSubject(generateDefaultPagination());
  characterPageData$: BehaviorSubject<Pagination> = new BehaviorSubject(generateDefaultPagination());
  housePageData$: BehaviorSubject<Pagination> = new BehaviorSubject(generateDefaultPagination());

  books$
  favoriteBooks: any = []

  characters$
  favoriteCharacters: any = []

  houses$
  favoriteHouses: any = []

  currentUser$ = this.authorize.currentUser$;
  constructor(
    private authorize: AuthorizationService,
    private bookService: BookService,
    private characterService: CharacterService,
    private houseService: HouseService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.books$ = combineLatest([this.authorize.currentUser$, this.bookPageData$]).pipe(
      filter(([user, pageData]) => !!user && !!user.favorites),
      map(([user, pageData]) =>
        Object.entries(user.favorites.books)
          .filter(([url, state]) => !!state).slice((Number(pageData.page) - 1) * Number(pageData.pageSize), Number(pageData.page) * Number(pageData.pageSize))
      ),
      switchMap(favoriteUrls => {
        this.favoriteBooks = favoriteUrls.reduce((acc, [a, b]) => {
          acc[a] = b;
          return acc;
        }, {});
        return combineLatest(
          favoriteUrls.map(([url]) => this.bookService.getFromCacheByUrl(url))
        )
      })
    )
    this.characters$ = combineLatest([this.authorize.currentUser$, this.characterPageData$]).pipe(
      filter(([user, pageData]) => !!user && !!user.favorites),
      map(([user, pageData]) =>
        Object.entries(user.favorites.characters)
          .filter(([url, state]) => !!state).slice((Number(pageData.page) - 1) * Number(pageData.pageSize), Number(pageData.page) * Number(pageData.pageSize))
      ),
      switchMap(favoriteUrls => {
        this.favoriteCharacters = favoriteUrls.reduce((acc, [a, b]) => {
          acc[a] = b;
          return acc;
        }, {});
        return combineLatest(
          favoriteUrls.map(([url]) => this.characterService.getFromCacheByUrl(url))
        )
      })
    )

    this.houses$ = combineLatest([this.authorize.currentUser$, this.housePageData$]).pipe(
      filter(([user, pageData]) => !!user && !!user.favorites),
      map(([user, pageData]) =>
        Object.entries(user.favorites.houses)
          .filter(([url, state]) => !!state).slice((Number(pageData.page) - 1) * Number(pageData.pageSize), Number(pageData.page) * Number(pageData.pageSize))
      ),
      switchMap(favoriteUrls => {
        this.favoriteHouses = favoriteUrls.reduce((acc, [a, b]) => {
          acc[a] = b;
          return acc;
        }, {});
        return combineLatest(
          favoriteUrls.map(([url]) => this.houseService.getFromCacheByUrl(url))
        )
      })
    )

  }

  handlePageEvent(e, collection: string) {
    this[collection].next(e);
  }

  handleRowEvent(
    { action, element }: { action: any, element: Partial<{ url: string }> },
    destination: string
  ) {
    if (action.type === 'details') {
      let entityId = element.url.slice(element.url.lastIndexOf('/') + 1)
      this.router.navigate(['/', destination, entityId])
    }

    if (action.type === 'toggleFavorites') {
      this.authorize.toggleFavorite(destination + 's', element.url)
    }
  }

  bookTableConfig = {
    columns: [
      {
        name: 'Name',
        type: 'TEXT',
        key: 'name'
      },
      {
        name: 'Authors',
        type: 'TEXT-LIST',
        key: 'authors'
      },
      {
        name: 'publisher',
        type: 'TEXT',
        key: 'publisher'
      },
      {
        name: 'country',
        type: 'TEXT',
        key: 'country'
      },
      {
        name: 'released',
        type: 'DATE',
        key: 'released'
      },
      {
        name: 'mediaType',
        type: 'TEXT',
        key: 'mediaType'
      },
      {
        name: 'characters',
        type: 'ELEMENT-COUNT',
        key: 'characters'
      },
      {
        name: 'povCharacters',
        type: 'ELEMENT-COUNT',
        key: 'povCharacters'
      },
      {
        type: 'ACTION',
        actions: [
          {
            name: 'Details',
            withAuth: false,
            icon: faInfo,
            type: 'details'
          },
          {
            name: 'Add to favorites',
            withAuth: true,
            icon: faHeart,
            type: 'toggleFavorites'
          }
        ]
      }
    ]
  }


  characterTableConfig = {
    columns: [
      {
        name: 'Name',
        type: 'TEXT',
        key: 'name'
      },
      {
        name: 'gender',
        type: 'TEXT',
        key: 'gender'
      },
      {
        name: 'culture',
        type: 'TEXT',
        key: 'culture'
      },
      {
        name: 'died',
        type: 'TEXT',
        key: 'died'
      },
      {
        name: 'playedBy',
        type: 'TEXT-LIST',
        key: 'playedBy'
      },
      {
        name: 'allegiances',
        label: 'Go to house',
        type: 'NAVIGATE-LIST',
        navigationPrefix: 'house',
        key: 'allegiances'
      },
      {
        name: 'tvSeries',
        type: 'ELEMENT-COUNT',
        key: 'tvSeries'
      },
      {
        name: 'povBooks',
        type: 'ELEMENT-COUNT',
        key: 'povBooks'
      },
      {
        type: 'ACTION',
        actions: [
          {
            name: 'Details',
            withAuth: false,
            icon: faInfo,
            type: 'details'
          },
          {
            name: 'Add to favorites',
            withAuth: true,
            icon: faHeart,
            type: 'toggleFavorites'
          }
        ]
      }
    ]
  }

  houseTableConfig = {
    columns: [
      {
        name: 'Name',
        type: 'TEXT',
        key: 'name'
      },
      {
        name: 'region',
        type: 'TEXT',
        key: 'region'
      },
      {
        name: 'diedOut',
        type: 'TEXT',
        key: 'diedOut'
      },
      {
        name: 'ancestralWeapons',
        type: 'TEXT-LIST',
        key: 'ancestralWeapons'
      },
      {
        name: 'swornMembers',
        type: 'ELEMENT-COUNT',
        key: 'swornMembers'
      },
      {
        type: 'ACTION',
        actions: [
          {
            name: 'Details',
            withAuth: false,
            icon: faInfo,
            type: 'details'
          },
          {
            name: 'Add to favorites',
            withAuth: true,
            icon: faHeart,
            type: 'toggleFavorites'
          }
        ]
      }
    ],
  }
}
