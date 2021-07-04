import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  @ViewChild('form') formRef: ElementRef;


  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private render: Renderer2,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  singUpFocus() {
    this.render.removeClass(this.formRef.nativeElement, 'bounceRight')
    this.render.addClass(this.formRef.nativeElement, 'bounceLeft')
  }

  loginFocus() {
    this.render.removeClass(this.formRef.nativeElement, 'bounceLeft')
    this.render.addClass(this.formRef.nativeElement, 'bounceRight')
  }

  login() {
    const formValue = this.userForm.getRawValue()
    this.authService.login(formValue.email, formValue.password)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }

  register() {
    const formValue = this.userForm.getRawValue()
    this.authService.register(formValue.email, formValue.password)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }

}
