import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { CharacterEntity, CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() characterId;

  faInfo = faInfo;

  character: CharacterEntity;
  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchHouseData(this.characterId)
  }

  ngOnChanges(simpleChanges: SimpleChanges){
    this.fetchHouseData(simpleChanges?.characterId?.currentValue)
  }

  fetchHouseData(characterId: string){
    this.characterService.getFromCacheById(characterId)
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
        this.character = x
      });
  }

  goToCharacter(){
    this.router.navigate(['/','character',this.characterId])
  }
}
