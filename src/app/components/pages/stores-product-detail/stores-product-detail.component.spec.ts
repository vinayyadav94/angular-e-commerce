import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresProductDetailComponent } from './stores-product-detail.component';

describe('StoresProductDetailComponent', () => {
  let component: StoresProductDetailComponent;
  let fixture: ComponentFixture<StoresProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoresProductDetailComponent]
    });
    fixture = TestBed.createComponent(StoresProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
