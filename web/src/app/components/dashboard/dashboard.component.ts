import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  cep: string = '';
  address: string = '';
  number: string = '';

  addresses: any[] = [];

  // Variáveis para armazenar os detalhes do endereço a ser editado
  editCep: string = '';
  editAddressInput: string = '';
  editNumber: string = '';

  ngOnInit(): void {
    // Método para carregar os endereços existentes ao inicializar o componente
    this.loadAddresses();
  }

  loadAddresses(): void {
    // Fazendo uma requisição HTTP GET para obter os endereços do servidor
    this.http.get<any[]>('https://api.example.com/addresses')
      .subscribe(
        addresses => {
          this.addresses = addresses;
        },
        error => {
          console.error('Error loading addresses:', error);
        }
      );
  }

  constructor(private http: HttpClient) {}

  addAddress(): void {
    const addressData = {
      cep: this.cep,
      address: this.address,
      number: this.number
    };

    // Aqui você pode fazer uma solicitação HTTP para adicionar o endereço
    console.log('Address added:', addressData);
  }

  editAddress(address: any): void {
    // Aqui você pode fazer uma requisição HTTP PUT para atualizar o endereço no servidor
    console.log('Editing address:', address);
  }
  deleteAddress(address: any): void {
    // Aqui você pode fazer uma solicitação HTTP para excluir o endereço
    console.log('Address deleted:', address);
    // Remova o endereço da lista localmente após a exclusão bem-sucedida
    const index = this.addresses.indexOf(address);
    if (index !== -1) {
      this.addresses.splice(index, 1);
    }
  }
}
