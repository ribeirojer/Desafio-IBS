import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login(): void {

    const loginData = {
      email: this.email,
      password: this.password
    };
    console.log(loginData);

    this.http.post<any>(environment.apiUrl + '/login', loginData)
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
