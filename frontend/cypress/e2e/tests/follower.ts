import {Before, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { contains } from 'cypress/types/jquery';

describe('Seguidores features', () => {
  let userLoggedName = '';
  Before(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/users/2/unfollow',
      body: {
        id: '1'
      },
      failOnStatusCode: false
    });
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/users/3/follow',
      body: {
        id: '1'
      },
      failOnStatusCode: false
    });

    cy.visit('/me').then(() => {
      cy.wait(500).then(() => {
        cy.get('.user-info > .username').invoke('text').then((username) => {
          userLoggedName = username;
            });
          });
        });
  });


  Given("{string} está visível", (button: string) => {
    cy.get('.user-info > .username').invoke('text').then((username) => {
      userName = username;
      cy.get('.Btn > p').should('contain', button);
    });
  });

  let userName : string = '';
  let OldCount : number = 0;
  let newCount : number = 0;
  When("clico em {string}", (button: string) => {
    cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
      OldCount = Number(texto);
      cy.get('.Btn > p').contains(button).click().then(() => {
        cy.wait(1000).then(() => {
          cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
            newCount = Number(texto);
          });
        });
      });
    });
  });


  Then('o texto muda de {string} para {string}', (button1: string, button2: string) => {
    cy.get('.Btn > p').should('not.contain', button1);
    cy.get('.Btn > p').should('contain', button2);
  });

  Then('o usuário de id {string} está na lista Seguidores do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.follower').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('contain', userLoggedName);
    });
  });

  Then('o usuário de id {string} não está na lista Seguidores do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.follower').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('not.contain', userLoggedName);
    });
  });

  Then('a contagem de {string} do usuário de id {string} aumenta em {string}', (list: string, id: string, number: string) => {
    expect(newCount).to.equal(OldCount + Number(number));
  });

  Then('o feed {string} contém as postagens do usuário de id {string}', (feed: string, id: string) => {
    cy.visit('/me').wait(1000).get('.tabs').contains(feed).click().then(() => {
      cy.get('.feed-container').should('contain', userName);
    });
  });

  Then('o feed {string} não contém as postagens do usuário de id {string}', (feed: string, id: string) => {
    cy.visit('/me').wait(1000).get('.tabs').contains(feed).click().then(() => {
      cy.get('.feed-container').should('not.contain', userName);
    });
  });


  Then('o usuário de id {string} está na lista Seguindo do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.following').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('contain', userName).then(() => {
        cy.get('.following').click();
      });
    });
  });

  Then('o usuário de id {string} não está na lista Seguindo do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.following').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('not.contain', userName).then(() => {
        cy.get('.following').click();
      });
    });
  });

  When('clico em {string} na barra de {string}', (button : string, bar : string) => {
    cy.get(bar).contains(button).click();
  });

  Then('o popup de {string} é aberto', (popup : string) => {
    cy.get('.popup').should('contain', popup);
  });

  Then('o popup de {string} é fechado', (popup : string) => {
    cy.get('.popup').should('not.exist');
  });


});