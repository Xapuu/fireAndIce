import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faHeartBroken, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

const expansionAnimation = [
  trigger('buttonMove', [
    state('collapsed, void', style({left: '-200px'})),
    state('expanded', style({left: '*'})),
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: expansionAnimation
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() tableConfig;
  @Input() elements$;
  @Input() pageData;
  @Input() favorites;
  @Output() pageEvent = new EventEmitter();
  @Output() rowEvent = new EventEmitter();
  @Output() navigateToEntity = new EventEmitter();

  sub$ = new Subject();

  expanded = false;
  filterOpen = false;

  filterForm = new FormGroup({});
  paginatorForm = new FormGroup({
    pageSize: new FormControl()
  });

  faInfo = faInfo;
  faHeart = faHeartBroken;

  toggleFilters(){
    this.filterOpen = !this.filterOpen;
  }

  get filterState(){
    return this.filterOpen ? 'expanded' : 'collapsed';
  }

  ngOnInit() {

    this.paginatorForm.get('pageSize').setValue(this.pageData.pageSize);

    this.paginatorForm.valueChanges.pipe(
      takeUntil(this.sub$),
      debounceTime(300)
    ).subscribe(filter => {
      this.pageEvent.emit({page:1, ...filter})

    })

    this.tableConfig?.filters?.forEach(element => {
      this.filterForm.addControl(element.key, new FormControl(this.pageData[element.key] ?? null))
    });

    this.filterForm.valueChanges.pipe(
      takeUntil(this.sub$),
      debounceTime(300)
    ).subscribe(x => {
      const filter = Object.entries(x)
        .filter(([key, value]) => value !== null && value !== undefined)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc
        }, {})
      this.pageEvent.emit({...this.pageData, page: 1, ...filter})
    })
  }

  ngOnDestroy() {
    this.sub$.next();
  }

  nextPage() {
    this.pageEvent.emit({ ...this.pageData, page: +this.pageData.page + 1 })
  }

  previousPage() {
    this.pageEvent.emit({ ...this.pageData, page: +this.pageData.page - 1 })
  }

  handleAction(action, element){
    this.rowEvent.emit({action, element})
  }

  navigateTo(prefix: string, fullUrl: string){
    this.navigateToEntity.emit(['/', prefix, fullUrl.slice(fullUrl.lastIndexOf('/')+1)])
  }
}
