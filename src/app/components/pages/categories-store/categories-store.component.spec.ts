import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesStoreComponent } from './categories-store.component';

describe('CategoriesStoreComponent', () => {
  let component: CategoriesStoreComponent;
  let fixture: ComponentFixture<CategoriesStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesStoreComponent]
    });
    fixture = TestBed.createComponent(CategoriesStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
