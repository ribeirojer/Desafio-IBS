import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Person';

@Component({
  selector: 'app-edit-person-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-person-modal.component.html',
  styleUrl: './edit-person-modal.component.css'
})
export class EditPersonModalComponent {
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

  editPerson() {
    this.errorMessage = '';
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.gender = this.gender.trim();
    this.birthday = this.birthday.trim();
    this.maritalstatus = this.maritalstatus.trim();

    if (!this.name) {
      this.errorMessage = 'Por favor, preencha o nome.';
      return;
    }
    if (!this.gender) {
      this.errorMessage = 'Por favor, preencha o gênero.';
      return;
    }
    if (!this.birthday) {
      this.errorMessage = 'Por favor, preencha a data de nascimento.';
      return;
    }
    if (!this.maritalstatus) {
      this.errorMessage = 'Por favor, preencha o estado civil.';
      return;
    } 
    if (!this.email) {
      this.errorMessage = 'Por favor, preencha o email.';
      return;
    }
    
    this.errorMessage = '';

    const person = {
      name: this.name,
      email: this.email,
      gender: this.gender,
      birthDay: this.birthday,
      maritalStatus: this.maritalstatus,
    }

    this.http.put<any>(environment.apiUrl + '/person/' + this.person?.id, person)
      .subscribe(
        response => {
          console.log(response)
          this.closeModal.emit();
        },
        error => {
          console.error('update person failed:', error);
          this.errorMessage = 'Houve um problema.';
        }
      );
  }
}
