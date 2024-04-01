import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';
import { Router } from '@angular/router';

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
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.email = this.email.trim();
    this.password = this.password.trim();

   if (!this.email) {
      this.errorMessage = 'Por favor, preencha o seu email.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMessage = 'Por favor, preencha um email válido.';
      return;
    }
    if (!this.email.includes('.com')) {
      this.errorMessage = 'Por favor, preencha um email válido.';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Por favor, preencha a sua senha.';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(environment.apiUrl + '/login', loginData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.person.id);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login ou senha incorretos.';
        }
      );
  }
}
