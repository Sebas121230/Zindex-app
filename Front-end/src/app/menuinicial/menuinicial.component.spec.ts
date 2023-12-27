import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuinicialComponent } from './menuinicial.component';

describe('MenuinicialComponent', () => {
  let component: MenuinicialComponent;
  let fixture: ComponentFixture<MenuinicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuinicialComponent]
    });
    fixture = TestBed.createComponent(MenuinicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
