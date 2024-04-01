import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-person-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-person-modal.component.html',
  styleUrl: './add-person-modal.component.css'
})
export class AddPersonModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  name: string = '';
  gender: string = '';
  birthday: string = '';
  maritalstatus: string = '';
  email: string = '';
  errorMessage: string = "";
  
  constructor(private http: HttpClient) {}

  handleClick() {
    this.closeModal.emit();
  }
  formatDateInput(input: any) {
    // Remove todos os caracteres que não sejam números
    let value = input.value.replace(/\D/g, '');

    // Formate a data no formato DD/MM/AAAA
    if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }
    if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }

    // Atualize o valor do campo de entrada
    input.value = value;
}


  addPerson() {
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

    this.http.post<any>(environment.apiUrl + '/person', person)
      .subscribe(
        response => {
          console.log(response)
          this.closeModal.emit();
        },
        error => {
          console.error('Add person failed:', error);
          this.errorMessage = 'Houve um problema.';
        }
      );
  }
}
