import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  house$ = this.houseService.entityDetails$.pipe(
    filter(x => !!x.value),
    switchMap((x) => {
      let entity = x.value;

      if(entity.overlord){
        return combineLatest([of(x), this.houseService.getFromCacheByUrl(entity.overlord)]).pipe(
          map(([e,over]) => {

            return {
              ...e,
              overload: over
            }


          })
        )
      }



      return of(x)
    }),
    map(x => {
    console.log(x)

    return x;

  }));
  houseId;

  constructor(
    private activeRout: ActivatedRoute,
    private houseService: HouseService
    ) { }

  ngOnInit(): void {
    this.houseId = this.activeRout.snapshot.params.id;

    this.activeRout.params.subscribe(x => {
      this.houseId = null;
      this.houseId = x.id;
    })
  }
}
