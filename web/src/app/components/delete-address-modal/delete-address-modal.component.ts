import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../Address';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-address-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-address-modal.component.html',
  styleUrl: './delete-address-modal.component.css'
})
export class DeleteAddressModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() address: Address | null = null;
  @Input() isShowEditModal: boolean = false;

  cep: string = '';
  street: string = '';
  number: string = '';
  complement: string = '';
  neighborhood: string = '';
  city: string = '';
  state: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    if (this.address) {
      this.cep = this.address.cep;
      this.street = this.address.street;
      this.number = this.address.number;
      this.complement = this.address.complement;
      this.neighborhood = this.address.neighborhood;
      this.city = this.address.city;
      this.state = this.address.state;
    }
  }

  handleClick() {
    this.closeModal.emit();
  }
  

  deleteAddress(): void{
    this.http.delete<any>(environment.apiUrl + '/address/' + this.address?.id)
      .subscribe(
        response => {
          console.log(response)
          
      this.closeModal.emit();

        },
        error => {
          console.error('Add address failed:', error);
          this.errorMessage = 'Houve um problema.';
        }
      );}
}
