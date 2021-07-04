import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseHierarchyComponent } from './house-hierarchy.component';

describe('HouseHierarchyComponent', () => {
  let component: HouseHierarchyComponent;
  let fixture: ComponentFixture<HouseHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
