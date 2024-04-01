import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';
import { Router } from '@angular/router';

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
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  signup(): void {
    this.errorMessage = '';
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();
    this.confirm_password = this.confirm_password.trim();

    if (!this.name) {
       this.errorMessage = 'Por favor, preencha o seu nome.';
       return;
     }
     if (!this.name.trim()) {
       this.errorMessage = 'Por favor, preencha o seu nome.';
       return;
     }
     if (this.name.length < 3) {
       this.errorMessage = 'O nome deve ter pelo menos 3 caracteres.';
       return;
     }
     if (!this.name.match(/^[a-zA-Z]+$/)) {
       this.errorMessage = 'O nome deve conter apenas letras.';
       return;
     }
    if (!this.email) {
       this.errorMessage = 'Por favor, preencha o seu email.';
       return;
     }
     if (!this.email.trim()) {
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
     if (!this.confirm_password) {
       this.errorMessage = 'Por favor, confirme a sua senha.';
       return;
     }
     if (this.password !== this.confirm_password) {
       this.errorMessage = 'As senhas não conferem.';
       return;
     }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
    };

    this.http.post<any>(environment.apiUrl + '/signup', userData)
      .subscribe(
        response => {
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirm_password = '';
          this.errorMessage = '';
          localStorage.setItem('session', response.session);
          localStorage.setItem('user', response.user);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Sign up failed:', error);
          this.errorMessage = 'Erro ao cadastrar usuário. Tente novamente mais tarde.';
        }
      );
  }
}
