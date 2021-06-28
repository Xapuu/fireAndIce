import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization.service';

const expansionAnimation = [
  trigger('buttonMove', [
    state('collapsed, void', style({right: '*'})),
    state('expanded', style({right: '200px'})),
    transition('collapsed => expanded, void => collapsed', [animate('300ms')]),
    transition('expanded => collapsed, void => collapsed', [animate('300ms 320ms')]),
  ]),
  trigger('bodyExpansion', [
    state('collapsed, void', style({height: '0px', visibility: 'hidden'})),
    state('expanded', style({height: '*', visibility: 'visible'})),
    transition('expanded => collapsed, void => collapsed', [animate('300ms')]),
    transition('collapsed => expanded, void => collapsed', [animate('300ms 320ms')]),
  ]),
  trigger('indicatorRotate', [
    state('collapsed, void', style({transform: 'rotate(0deg)'})),
    state('expanded', style({transform: 'rotate(180deg)'})),
    transition('expanded <=> collapsed, void => collapsed', animate(400)),
  ]),
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: expansionAnimation
})
export class SidebarComponent implements OnInit {
  @Input() rightSidebar;
  filterOpen = false;

  userFavorites$

  constructor(private auth: AuthorizationService){}

  ngOnInit(){
    this.userFavorites$ = this.auth.currentUser$.pipe(
      filter(x => !!x),
      map(x => {
        return {
          characters: Object.values(x.favorites.characters).filter(x => !!x).length,
          books: Object.values(x.favorites.books).filter(x => !!x).length,
          houses: Object.values(x.favorites.houses).filter(x => !!x).length,
        }
      }),
    );
  }
  get filterState(){
    return this.filterOpen ? 'expanded' : 'collapsed';
  }

  toggleFilters(){
    this.filterOpen = !this.filterOpen;
  }


}
