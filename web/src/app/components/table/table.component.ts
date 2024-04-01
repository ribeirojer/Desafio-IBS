import { Component, Input } from '@angular/core';
import { Person } from '../../Person';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditPersonModalComponent } from '../edit-person-modal/edit-person-modal.component';
import { DeletePersonModalComponent } from '../delete-person-modal/delete-person-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, EditPersonModalComponent, DeletePersonModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() person: Person = {
    id: 0,
    name: '',
    gender: '',
    birthday: '',
    maritalstatus: '',
    email: '',
    is_admin: false,
  };
  selectedPerson: any = null;

  isShowEditModal: boolean = false;
  isShowDeleteModal: boolean = false;

  showEditModal(person: Person) {
    this.selectedPerson = person;
    this.isShowEditModal = true;
  }
  closeEditModal() {
    this.isShowEditModal = false;
    this.selectedPerson = null;
  }
  showDeleteModal(person: Person) {
    this.selectedPerson = person;
    console.log(this.selectedPerson);
    this.isShowDeleteModal = true;
  }
  closeDeleteModal() {
    this.isShowDeleteModal = false;
  }
}
