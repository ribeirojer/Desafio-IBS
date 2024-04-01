import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { Address } from '../../Address';
import { EditAddressModalComponent } from '../edit-address-modal/edit-address-modal.component';
import { DeleteAddressModalComponent } from '../delete-address-modal/delete-address-modal.component';

@Component({
  selector: 'app-address-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddAddressModalComponent, EditAddressModalComponent, DeleteAddressModalComponent],
  templateUrl: './address-table.component.html',
  styleUrl: './address-table.component.css'
})

export class AddressTableComponent {
  @Input() addresses: Address[]= [];
  isShowAddModal: boolean = false;
  isShowEditModal: boolean = false;
  isShowDeleteModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedAddress: any = null;

  constructor() { }

  showAddModal() {
    this.isShowAddModal = true;
  }
  closeAddModal() {
    this.isShowAddModal = false;
  }
  showEditModal(address: Address) {
    this.selectedAddress = address;
    this.isShowEditModal = true;
  }
  closeEditModal() {
    this.isShowEditModal = false;
    this.selectedAddress = null;
  }
  showDeleteModal(address: Address) {
    this.selectedAddress = address;
    console.log(this.selectedAddress);
    this.isShowDeleteModal = true;
  }
  closeDeleteModal() {
    this.isShowDeleteModal = false;
  }
  
  // Método para calcular o índice inicial do primeiro item na página atual
  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Método para calcular o índice final do último item na página atual
  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.addresses.length - 1);
  }
   // Método para avançar para a próxima página
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // Método para retroceder para a página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Método para calcular o número total de páginas
  totalPages(): number {
    return Math.ceil(this.addresses.length / this.itemsPerPage);
  }
  
}
