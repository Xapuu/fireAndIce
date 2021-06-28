import { Directive, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { AuthorizationService } from '../../../services/authorization.service';

@Directive({
  selector: '[appNotAuth]'
})
export class AuthNotDirective implements OnDestroy {

  sub$ = new Subject();
  viewRef: EmbeddedViewRef<any>;

  @Input() appAuth = true;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {

    this.authService.currentUser$.pipe(
      map(x => !!x),
      distinctUntilChanged(),
      takeUntil(this.sub$)
    )
      .subscribe(authorize => {
        if (!authorize) {
          this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          if (this.viewRef) {
            this.viewContainer.detach()
          }
        }
      })
  }

  ngOnDestroy() {
    this.sub$.next()
  }

}
