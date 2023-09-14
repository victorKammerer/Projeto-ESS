import {Before, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';

Given('{string} está visível - user', (button: string) => {
  cy.contains(button).should('be.visible');
});    

When('clico em {string} - User', (button: string) => {
  let confirmMessage: string;

  switch (button) {
    case 'Salvar':
      cy.get('button.purple').click();
      break;
    case 'Cadastrar':
      cy.contains('Cadastrar').click();
      break;
    default:
      throw new Error(`Botão não reconhecido: ${button}`);
  }
});  

When('clico em {string} e aparece uma notificação com a menssagem {string}', (button: string, message: string) => {
  cy.window().then((win) => {
    cy.stub(win, 'confirm').as('windowConfirmStub');

    switch (button) {
      case 'Editar':
        cy.get('app-edit-btn.editbtn').click();
        break;
      case 'Excluir':
        cy.get('app-button.postbtn').click();
        break;
      default:
        throw new Error(`Botão não reconhecido: ${button}`);
    }
  });

  cy.get('@windowConfirmStub').should('have.been.calledOnce');
  cy.get('@windowConfirmStub').should('have.been.calledWith', message);
});

 

When('Confirmo a notificação {string}', (message: string)=>{
  cy.on('window:confirm', () => {
    return true; // Confirma a notificação
  });

  if(message.includes('editar')){
    cy.visit('/users/1/edit');
  }else if(message.includes('excluir')){
    cy.visit('/');
  }else{
    cy.log("Notificação não reconhecida");
  }
});

Then('o usuário foi para a página {string}', (expectedPage: string) => {
  cy.url().should('include', expectedPage);
});

  