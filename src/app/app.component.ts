import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }


  ngOnInit(){
    this.authService.login('a', 'b').subscribe()
  }

  logout() {
    this.authService.logout()
  }
}
