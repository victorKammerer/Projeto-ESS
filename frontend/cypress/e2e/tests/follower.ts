import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';

/*
Scenario: Seguir uma pessoa

  Given o usuário está na página "users/2"
  When clico em "Seguir"
  Then o texto muda de "Seguir" para "Seguindo"
  and a contagem de "Seguindo" dessa pessoa aumenta em 1
  And o meu feed "Seguindo" contém as postagens da conta de id "2"

  Given o usuário está na página "users/2"
  And "Seguir" está visível
  When clico em "Seguir"
  Then o muda para "Seguindo"
  And essa pessoa é adicionada a minha lista de seguidores
  And a contagem de "Seguindo" dessa pessoa aumenta em 1
  And na página "users/me" feed "Seguindo" contém as postagens da conta de id "2"
*/


Given('{string} está visível', (button: string) => {
  cy.get('.Btn > p').contains(button).should('be.visible');
});

let OldCount : number = 0;
let newCount : number = 0;
When("clico em {string}", (button: string) => {
  cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
    OldCount = Number(texto);
    cy.get('.Btn > p').contains(button).click().then(() => {
      cy.wait(1000);
      cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
        newCount = Number(texto);
      });
    });
  });
});

Then('o texto muda de {string} para {string}', (button1: string, button2: string) => {
  cy.get('.Btn > p').should('not.contain', button1);
  cy.get('.Btn > p').should('contain', button2);
});

Then('a contagem de {string} dessa pessoa aumenta em {string}', (button: string, i: string) => {
  expect(newCount).to.equal(OldCount + Number(i));
});