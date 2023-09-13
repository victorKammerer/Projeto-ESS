import {Before, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { contains } from 'cypress/types/jquery';

describe('Testes de Usuário', () => {
    // Antes de cada teste, você pode configurar o estado inicial, como visitar a página inicial ou criar um usuário.
    beforeEach(() => {
      // Configure o estado inicial aqui, se necessário
      // cy.visit('/');
    });
  
    it('Ir para página de edição do usuário', () => {
      // Configurar o estado inicial para este cenário
      // cy.visit('users/1');
  
      // Verifique se o botão "Editar" está visível
      // cy.get('.editar-botao').should('be.visible');
  
      // Clique no botão "Editar"
      // cy.get('.editar-botao').click();
  
      // Verifique se a notificação de edição está visível
      // cy.get('.notificacao-edicao').should('be.visible');
  
      // Confirme a notificação de edição
      // cy.get('.confirmar-botao').click();
  
      // Verifique se o usuário está na página de edição correta
      // cy.url().should('include', 'users/1/edit');
    });
  
    it('Excluir minha conta com sucesso', () => {
      // Configurar o estado inicial para este cenário
      // cy.visit('users/1/edit');
  
      // Verifique se o botão "Excluir" está visível
      // cy.get('.excluir-botao').should('be.visible');
  
      // Clique no botão "Excluir"
      // cy.get('.excluir-botao').click();
  
      // Verifique se a notificação de exclusão está visível
      // cy.get('.notificacao-exclusao').should('be.visible');
  
      // Confirme a notificação de exclusão
      // cy.get('.confirmar-botao').click();
  
      // Verifique se o usuário está na página inicial
      // cy.url().should('eq', '/');
      
      // Verifique se a notificação de exclusão bem-sucedida está visível
      // cy.get('.notificacao-exclusao-sucesso').should('be.visible');
    });
  
    it('Editar minha conta com sucesso', () => {
      // Configurar o estado inicial para este cenário
      // cy.visit('users/1/edit');
  
      // Verifique se o campo "Nome" contém "Fulano"
      // cy.get('.nome-campo').should('contain', 'Fulano');
  
      // Edite o campo "Nome" com "Treloso"
      // cy.get('.nome-campo').clear().type('Treloso');
  
      // Clique no botão "Salvar"
      // cy.get('.salvar-botao').click();
  
      // Aguarde a recarga da página (se necessário)
      // cy.wait(1000);
  
      // Verifique se o campo "Nome" agora mostra "Treloso"
      // cy.get('.nome-campo').should('contain', 'Treloso');
    });
  
    it('Criar uma conta com informações opcionais faltando', () => {
      // Configurar o estado inicial para este cenário
      // cy.visit('/signup');
  
      // Preencha os campos obrigatórios
      // cy.get('#username').type('Willie');
      // cy.get('#email').type('Willow@etest.com');
      // cy.get('#password').type('123456a');
      // cy.get('#name').type('Willah');
      // cy.get('#lastname').type('Cat');
  
      // Preencha os campos opcionais
      // cy.get('#pronouns').clear();
      // cy.get('#bio').type('Willie Willow Willah tutuutututuututu...');
  
      // Clique no botão "Cadastrar"
      // cy.get('.cadastrar-botao').click();
  
      // Verifique se o usuário está na página do seu perfil
      // cy.url().should('include', '/perfil');
    });
  });
  