import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login(): void {
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('https://api.example.com/login', loginData)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          // Aqui você pode adicionar lógica para redirecionar o usuário para a próxima página após o login
        },
        error => {
          console.error('Login failed:', error);
          // Aqui você pode adicionar lógica para lidar com erros de login, como exibir uma mensagem de erro para o usuário
        }
      );
  }
}
