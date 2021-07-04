import { Component, OnInit } from '@angular/core';
import { BookEntity, BookService } from 'src/app/services/book.service';
import { Pagination } from 'src/app/services/pagination';
import { filter, map } from 'rxjs/operators';
import { generateDefaultPagination } from 'src/app/core/utilities/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pageData: Pagination = generateDefaultPagination();

  books$ = this.book.entityList$.pipe(filter((x) => !x.loading), map(x => x.value));
  favorites$: Observable<any>;

  tableConfig = {
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
    ],
    filters: [
      {
        name: 'name',
        key: 'name',
        type: 'STRING',
      },
      {
        name: 'fromReleaseDate',
        key: 'fromReleaseDate',
        type: 'DATE',
      },
      {
        name: 'toReleaseDate',
        key: 'toReleaseDate',
        type: 'DATE',
      },
    ]
  }


  constructor(
    public book: BookService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public auth: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.favorites$ = this.auth.currentUser$.pipe(map(x => x?.favorites?.books))

    this.activeRoute.queryParams.pipe()
      .subscribe(x => {
        if (Object.keys(x).length) {
          this.pageData = generateDefaultPagination(x);
        }
        this.book.loadEntityList(this.pageData);
      })
  }

  handlePageEvent(pageEvent: Pagination){
    this.router.navigate(['book'], {queryParams: {...pageEvent}});
  }

  handleRowEvent({ action, element }: { action: any, element: BookEntity }) {
    if (action.type === 'details') {
      let entityId = element.url.slice(element.url.lastIndexOf('/') + 1)
      this.router.navigate(['/', 'house', entityId])
    }

    if (action.type === 'toggleFavorites') {
      this.auth.toggleFavorite('books', element.url)
    }
  }
}
