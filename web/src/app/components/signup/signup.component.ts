import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(private http: HttpClient) {}

  signup(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
    };
    console.log(userData);

    this.http.post<any>(environment.apiUrl + '/signup', userData)
      .subscribe(
        response => {
          console.log('Sign up successful:', response);
          // Aqui você pode adicionar lógica para redirecionar o usuário para a próxima página após o cadastro
        },
        error => {
          console.error('Sign up failed:', error);
          // Aqui você pode adicionar lógica para lidar com erros de cadastro, como exibir uma mensagem de erro para o usuário
        }
      );
  }
}
