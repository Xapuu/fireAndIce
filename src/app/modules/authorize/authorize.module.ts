import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { AuthorizeRoutingModule } from './authorize-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthorizeComponent
  ],
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthorizeModule { }
