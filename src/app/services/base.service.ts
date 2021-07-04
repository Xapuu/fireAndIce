import { BehaviorSubject, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from './pagination';
import { ResponseData } from './response-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { skip, takeUntil, tap } from 'rxjs/operators';

interface EntityWithUrl {
  url: string;
}

@Injectable({providedIn:'root'})
export class BaseService<T extends EntityWithUrl, K> {

  nameSpace: string;
  entityDetails$: BehaviorSubject<ResponseData<T>> = new BehaviorSubject({loading: false, value: null});
  entityList$: BehaviorSubject<ResponseData<T[]>> = new BehaviorSubject({loading: false, value: null});

  cache = {}

  listRequestCanceler = new Subject();

  constructor(private http: HttpClient) {}


  loadEntityById(id: string) {
    this.entityDetails$.next({
      loading: true,
      value: null
    })

    const entityUrl = `${environment.apiUrl}/${this.nameSpace}/${id}`;
    const exitingEntity = this.cache[entityUrl];

    if(exitingEntity){
      this.entityDetails$.next({
        loading: false,
        value: exitingEntity
      });
      return
    }

    return this.http
      .get<T>(entityUrl)
      .subscribe((entity) => {
        this.cache[entityUrl] = entity;

        this.entityDetails$.next({
          loading: false,
          value: entity
        });
      });
  }

  getFromCacheById(id: string){
    const entityUrl = `${environment.apiUrl}/${this.nameSpace}/${id}`;
    const exitingEntity = this.cache[entityUrl];

    if(exitingEntity){
      return of(exitingEntity)
    }

    return this.http
      .get<T>(entityUrl).pipe(
        tap((entity) => {
          this.cache[entityUrl] = entity;
        })
      )
  }
  getFromCacheByUrl(url: string){
    const entityUrl = url;
    const exitingEntity = this.cache[entityUrl];

    if(exitingEntity){
      return of(exitingEntity)
    }

    return this.http
      .get<T>(entityUrl).pipe(
        tap((entity) => {
          this.cache[entityUrl] = entity;
        })
      )
  }

  loadEntityList(filters: Partial<K & Pagination> = {}) {
    this.entityList$.next({
      loading: true,
      value: null
    });

    return this.http
      .get<T[]>(`${environment.apiUrl}/${this.nameSpace}`, {
        params: (filters as unknown) as HttpParams,
      }).pipe(
        takeUntil(this.entityList$.pipe(skip(1)))
      )
      .subscribe((entities) => {

        entities.forEach(e => {
          this.cache[e.url] = e;
        })

        this.entityList$.next({
          loading: false,
          value: entities
        });
      });
  }

  clearEntityList() {
    this.entityList$.next({loading: false, value:null});
  }

  clearEntity() {
    this.entityDetails$.next({loading: false, value:null});
  }
}
