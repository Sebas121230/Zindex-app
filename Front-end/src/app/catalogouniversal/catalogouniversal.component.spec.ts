import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogouniversalComponent } from './catalogouniversal.component';

describe('CatalogouniversalComponent', () => {
  let component: CatalogouniversalComponent;
  let fixture: ComponentFixture<CatalogouniversalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogouniversalComponent],
    });
    fixture = TestBed.createComponent(CatalogouniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
