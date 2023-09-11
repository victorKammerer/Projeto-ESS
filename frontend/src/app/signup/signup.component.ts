import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {} as User;
  formErrors: { [key: string]: string } = {};

  submitForm() {
    // Limpa mensagens de erro antes de realizar a validação
    this.formErrors = {};

    // Validação do campo Nome de Usuário (obrigatório)
    if (!this.user.user) {
      this.formErrors['username'] = 'Nome de usuário é obrigatório.';
    }

    // Validação do campo E-mail (obrigatório)
    if (!this.user.email) {
      this.formErrors['email'] = 'E-mail é obrigatório.';
    }else{
      this.isValidEmail(this.user.email);
    }

    // Validação do campo Senha (obrigatório)
    if (!this.user.password) {
      this.formErrors['password'] = 'Senha é obrigatória.';
    } else {
      this.isValidPassword(this.user.password);
    }

    // Validação do campo Nome e Sobrenome (obrigatório)
    if (!this.user.name) {
      this.formErrors['name'] = 'Nome e sobrenome são obrigatórios.';
    }

    // Lógica para enviar o formulário se não houver erros
    if (Object.keys(this.formErrors).length === 0) {
      console.log('Dados do usuário:', this.user);
      // Você pode adicionar a lógica de envio do formulário para o servidor aqui
    }
  }

  isValidPassword(password: string): void {
    // Verifica se a senha tem pelo menos 6 caracteres
    if (password.length < 7) {
      this.formErrors['password'] = 'A senha deve ter pelo menos 7 caracteres.';
    }
  
    // Verifica se a senha contém pelo menos 1 letra
    const letterRegex = /[a-zA-Z]/;
    if (!letterRegex.test(password)) {
      this.formErrors['password'] = 'A senha deve conter pelo menos uma letra';
    }
  
    // Verifica se a senha contém pelo menos 6 números
    const numberRegex = /\d/g;
    const numbers = password.match(numberRegex);
    if(!(numbers !== null && numbers.length >= 6)){
      this.formErrors['password'] = 'A senha deve conter pelo menos 6 números.';
    }
  }

  isValidEmail(email: string): boolean {
    // Regex para validar um email simples (pode ser mais abrangente se necessário)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
