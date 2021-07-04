import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/services/pagination';
import { filter, map } from 'rxjs/operators';
import { generateDefaultPagination } from 'src/app/core/utilities/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseEntity, HouseService } from 'src/app/services/house.service';
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pageData: Pagination = generateDefaultPagination();

  houses$ = this.house.entityList$.pipe(filter((x) => !x.loading), map(x => x.value));

  favorites$: Observable<any>

  tableConfig = {
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
    filters: [
      {
        name: 'name',
        key: 'name',
        type: 'STRING',
      },
      {
        name: 'region',
        key: 'region',
        type: 'STRING',
      },
      {
        name: 'words',
        key: 'words',
        type: 'STRING',
      },
      {
        name: 'hasWords',
        key: 'hasWords',
        type: 'BOOLEAN',
      },
      {
        name: 'hasTitles',
        key: 'hasTitles',
        type: 'BOOLEAN',
      },
      {
        name: 'hasSeats',
        key: 'hasSeats',
        type: 'BOOLEAN',
      },
      {
        name: 'hasDiedOut',
        key: 'hasDiedOut',
        type: 'BOOLEAN',
      },
    ]
  }

  constructor(
    public house: HouseService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public auth: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.favorites$ = this.auth.currentUser$.pipe(map(x => x?.favorites?.houses))
    this.activeRoute.queryParams.pipe()
      .subscribe(x => {
        if (Object.keys(x).length) {
          this.pageData = generateDefaultPagination(x);
        }
        this.house.loadEntityList(this.pageData);
      })
  }

  handlePageEvent(pageEvent: Pagination) {
    this.router.navigate(['character'], { queryParams: { ...pageEvent } });
  }

  handleRowEvent({ action, element }: { action: any, element: HouseEntity }) {
    if (action.type === 'details') {
      let entityId = element.url.slice(element.url.lastIndexOf('/') + 1)
      this.router.navigate(['/', 'house', entityId])
    }

    if (action.type === 'toggleFavorites') {
      this.auth.toggleFavorite('houses', element.url)
    }
  }
}
