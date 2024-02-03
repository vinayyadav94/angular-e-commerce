import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesViewComponent } from './product-categories-view.component';

describe('ProductCategoriesViewComponent', () => {
  let component: ProductCategoriesViewComponent;
  let fixture: ComponentFixture<ProductCategoriesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoriesViewComponent]
    });
    fixture = TestBed.createComponent(ProductCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
