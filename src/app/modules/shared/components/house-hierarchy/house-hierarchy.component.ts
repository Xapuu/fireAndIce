import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { HouseEntity, HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house-hierarchy',
  templateUrl: './house-hierarchy.component.html',
  styleUrls: ['./house-hierarchy.component.scss']
})
export class HouseHierarchyComponent implements OnInit {


  @Input() houseId;
  @Input() level = 0;

  faInfo = faInfo;

  house: HouseEntity;
  constructor(
    private houseService: HouseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchHouseData(this.houseId)
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    this.fetchHouseData(simpleChanges?.houseId?.currentValue)
  }

  goToHouse(){
    this.router.navigate(['/','house',this.houseId])
  }

  fetchHouseData(houseId: string){
    this.houseService.getFromCacheById(houseId)
      .pipe(first()).subscribe(x => {

        if (x.overlord) {
          x.overlord = x.overlord.slice(x.overlord.lastIndexOf('/') + 1)
        }

        this.house = x
      });
  }
}
