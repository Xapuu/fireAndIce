import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/services/pagination';
import { filter, map } from 'rxjs/operators';
import { generateDefaultPagination } from 'src/app/core/utilities/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterEntity, CharacterService } from 'src/app/services/character.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pageData: Pagination = generateDefaultPagination();

  characters$ = this.book.entityList$.pipe(filter((x) => !x.loading), map(x => x.value));
  favorites$: Observable<any>;

  tableConfig = {
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
    ],
    filters: [
      {
        name: 'name',
        key: 'name',
        type: 'STRING',
      },
      {
        name: 'gender',
        key: 'gender',
        type: 'STRING',
      },
      {
        name: 'culture',
        key: 'culture',
        type: 'STRING',
      },
      {
        name: 'born',
        key: 'born',
        type: 'STRING',
      },
      {
        name: 'died',
        key: 'died',
        type: 'STRING',
      },
      {
        name: 'isAlive',
        key: 'isAlive',
        type: 'BOOLEAN',
      },
    ]
  }

  constructor(
    public book: CharacterService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public auth: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.favorites$ = this.auth.currentUser$.pipe(map(x => x?.favorites?.characters))

    this.activeRoute.queryParams.pipe()
      .subscribe(x => {
        if (Object.keys(x).length) {
          this.pageData = generateDefaultPagination(x);
        }
        this.book.loadEntityList(this.pageData);
      })
  }

  handlePageEvent(pageEvent: Pagination) {
    this.router.navigate(['character'], { queryParams: { ...pageEvent } });
  }

  handleRowEvent({ action, element }: { action: any, element: CharacterEntity }) {
    if (action.type === 'details') {
      let entityId = element.url.slice(element.url.lastIndexOf('/') + 1)
      this.router.navigate(['/', 'house', entityId])
    }

    if (action.type === 'toggleFavorites') {
      this.auth.toggleFavorite('characters', element.url)
    }
  }

  navigateTo(urlLocation: string[]) {
    this.router.navigate(urlLocation);
  }
}
