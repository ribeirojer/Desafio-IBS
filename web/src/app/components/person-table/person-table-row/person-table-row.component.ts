import { Component, Input } from '@angular/core';
import { Person } from '../../../Person';

@Component({
  selector: 'app-person-table-row',
  standalone: true,
  imports: [],
  templateUrl: './person-table-row.component.html',
  styleUrl: './person-table-row.component.css'
})
export class PersonTableRowComponent {
  constructor() {}

  ngOnInit(): void {}
  
@Input() person: Person  = {
  id: 0,
  name: '',
  gender: '',
  birthday: '',
  maritalstatus: '',
  email: '',
  is_admin: false
};
}
