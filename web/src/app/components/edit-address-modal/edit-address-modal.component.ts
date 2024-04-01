import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../Address';

@Component({
  selector: 'app-edit-address-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.css'
})
export class EditAddressModalComponent {
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
  
  onCepInputChange(): void {
    if (this.cep.length === 8) {
      this.buscarCep(this.cep);
    }
  }

  buscarCep(cep: string): void {
  this.cep = cep;
  this.http.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .subscribe((data: any) => {
      console.log(data)
      this.street = data.street;
      this.neighborhood = data.neighborhood;
      this.city = data.city;
      this.state = data.state;
    });
}

  editAddress(): void{
    this.errorMessage = '';
    this.cep = this.cep.trim();
    this.street = this.street.trim();
    this.number = this.number.trim();
    this.complement = this.complement.trim();
    this.neighborhood = this.neighborhood.trim();
    this.city = this.city.trim();
    this.state = this.state.trim();

   if (!this.cep) {
      this.errorMessage = 'Por favor, digite o CEP.';
      return;
    }
    if (!this.street) {
      this.errorMessage = 'Por favor, digite a rua.';
      return;
    }
    if (!this.number) {
      this.errorMessage = 'Por favor, digite o número.';
      return;
    }
    if (!this.neighborhood) {
      this.errorMessage = 'Por favor, digite o bairro.';
      return;
    }
    if (!this.city) {
      this.errorMessage = 'Por favor, digite a cidade.';
      return;
    }
    if (!this.state) {
      this.errorMessage = 'Por favor, digite o estado.';
      return;
    }
    this.errorMessage = '';

    const address = {
      personid: localStorage.getItem("id"),
      cep: this.cep,
      street: this.street,
      number: this.number,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state
    }

    this.http.put<any>(environment.apiUrl + '/address/' + this.address?.id, address)
      .subscribe(
        response => {
          console.log(response.updatedAddress)
          
      this.closeModal.emit();

        },
        error => {
          console.error('Add address failed:', error);
          this.errorMessage = 'Houve um problema.';
        }
      );
  
  

  }
}
