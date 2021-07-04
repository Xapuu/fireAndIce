import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HouseComponent } from './components/house/house.component';
import { HouseHierarchyComponent } from './components/house-hierarchy/house-hierarchy.component';
import { CharacterComponent } from './components/character/character.component';
import { AuthDirective } from './directives/auth.directive';
import { AuthNotDirective } from './directives/not-auth.directive';


@NgModule({
  declarations: [
    TableComponent,
    HouseComponent,
    HouseHierarchyComponent,
    CharacterComponent,
    AuthDirective,
    AuthNotDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    TableComponent,
    HouseComponent,
    AuthDirective,
    AuthNotDirective,
    CharacterComponent
  ]
})
export class SharedModule { }
