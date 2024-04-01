import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Person';
import { AddPersonModalComponent } from '../add-person-modal/add-person-modal.component';
import { EditPersonModalComponent } from '../edit-person-modal/edit-person-modal.component';
import { DeletePersonModalComponent } from '../delete-person-modal/delete-person-modal.component';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPersonModalComponent, EditPersonModalComponent, DeletePersonModalComponent],
  templateUrl: './people-table.component.html',
  styleUrl: './people-table.component.css'
})

export class PeopleTableComponent {
  @Input() people: Person[] = [];
  isShowAddModal: boolean = false;
  isShowEditModal: boolean = false;
  isShowDeleteModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedPerson: any = null;

  constructor() { }

  showAddModal() {
    this.isShowAddModal = true;
  }
  closeAddModal() {
    this.isShowAddModal = false;
  }
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
