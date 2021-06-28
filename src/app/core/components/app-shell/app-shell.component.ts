import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

const expansionAnimation = [
  trigger('rightAnimation', [
    state('left, void', style({width: '50px'})),
    state('right', style({width: '200px'})),
    transition('left <=> right, void => left', [animate('300ms')]),
  ]),
  trigger('leftAnimation', [
    state('left, void', style({width: '200px'})),
    state('right', style({width: '50px'})),
    transition('left <=> right, void => left', [animate('300ms')]),
  ]),
];

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  animations: expansionAnimation
})
export class AppShellComponent {

  focusedSidebar = 'left';

  focusSidebar(sidebarOnFocus: string) {
    this.focusedSidebar = sidebarOnFocus;
    console.log(this.focusedSidebar)
  }

}
