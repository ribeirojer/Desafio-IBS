import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../Person';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-person-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-person-modal.component.html',
  styleUrl: './delete-person-modal.component.css'
})
export class DeletePersonModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() person: Person | null = null;
  @Input() isShowEditModal: boolean = false;

  name: string = '';
  email: string = '';
  gender: string = '';
  birthday: string = '';
  maritalstatus: string = '';
  errorMessage: string = "";
  
  constructor(private http: HttpClient) {}

  handleClick() {
    this.closeModal.emit();
  }
  
  ngOnInit(): void {
    if (this.person) {
      this.name = this.person.name;
      this.email = this.person.email;
      this.gender = this.person.gender;
      this.birthday = this.person.birthday;
      this.maritalstatus = this.person.maritalstatus;
    }
  }

  deletePerson() {
    this.errorMessage = '';
    this.http.delete<any>(environment.apiUrl + '/person/' + this.person?.id)
      .subscribe(
        response => {
          console.log(response)
          this.closeModal.emit();
        },
        error => {
          console.error('delete person failed:', error);
          this.errorMessage = 'Houve um problema.';
        }
      );
  }
}
