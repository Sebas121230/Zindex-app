import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionComponent } from './calificacion.component';

describe('CalificacionComponent', () => {
  let component: CalificacionComponent;
  let fixture: ComponentFixture<CalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionComponent]
    });
    fixture = TestBed.createComponent(CalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
