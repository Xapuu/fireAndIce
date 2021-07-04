import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { HouseEntity, HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit, OnChanges {

  @Input() houseId;
  @Input() level = 0;

  house: HouseEntity;
  constructor(
    private houseService: HouseService
  ) {
  }

  ngOnInit(): void {
    this.fetchHouseData(this.houseId)
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    this.fetchHouseData(simpleChanges?.houseId?.currentValue)
  }

  fetchHouseData(houseId: string){
    this.houseService.getFromCacheById(houseId)
      .pipe(first()).subscribe(x => {
        if (x.overlord) {
          x.overlord = x.overlord.slice(x.overlord.lastIndexOf('/') + 1)
        }
        if (x.currentLord) {
          x.currentLord = x.currentLord.slice(x.currentLord.lastIndexOf('/') + 1)
        }
        if (x.heir) {
          x.heir = x.heir.slice(x.heir.lastIndexOf('/') + 1)
        }
        if (x.swornMembers) {
          x.swornMembers = x.swornMembers.map(y => y.slice(y.lastIndexOf('/') + 1))
        }
        this.house = x
      });
  }

}
