import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableRowComponent } from './person-table-row.component';

describe('PersonTableRowComponent', () => {
  let component: PersonTableRowComponent;
  let fixture: ComponentFixture<PersonTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
