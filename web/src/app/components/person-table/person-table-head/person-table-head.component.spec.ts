import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableHeadComponent } from './person-table-head.component';

describe('PersonTableHeadComponent', () => {
  let component: PersonTableHeadComponent;
  let fixture: ComponentFixture<PersonTableHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTableHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonTableHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
