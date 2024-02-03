import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStoreComponent } from './products-store.component';

describe('ProductsStoreComponent', () => {
  let component: ProductsStoreComponent;
  let fixture: ComponentFixture<ProductsStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsStoreComponent]
    });
    fixture = TestBed.createComponent(ProductsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
