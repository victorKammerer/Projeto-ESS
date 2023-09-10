import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('a categoria {string} está disponível', (category: string) => {
    cy.get('.buttons-list').should('contain', category);
});

When('o usuário escolhe a categoria {string}', (category: string) => {
    cy.get('.buttons-list').contains(category).click();
});

Then('apenas os reviews relacionados à categoria {string} são exibidos do mais novo para o mais antigo.', (category: string) => {
    let dates = [];
    //all posts should contain the category
    cy.get('.post').each((post) => {
        //check categories
        cy.wrap(post).find('.categories').should('contain', category);
        //add date to array
        cy.wrap(post).find('.date').then((date) => {
            dates.push(date.text());
        });
    }).then(() => {
        //check if dates are in order
        cy.log('dates: ', dates);
        for (let i = 0; i < dates.length - 1; i++) {
            let date1 = new Date(dates[i]);
            let date2 = new Date(dates[i + 1]);
            expect(date1).to.be.greaterThan(date2);
        }
    });
});

// new scenario
When('o usuário clica no botão {string}', (button: string) => {
    if (button === 'Inverter ordem') 
        cy.get('.arrows').click();
    else if (button === 'All')
        cy.get('.buttons-list').contains(button).click();
});

Then('os reviews são exibidos de forma contrária.', () => {
    let dates = [];
    //all posts should contain the category
    cy.get('.post').each((post) => {
        //add date to array
        cy.wrap(post).find('.date').then((date) => {
            dates.push(date.text());
        });
    }).then(() => {
        //check if dates are in order
        cy.log('dates: ', dates);
        for (let i = 0; i < dates.length - 1; i++) {
            let date1 = new Date(dates[i]);
            let date2 = new Date(dates[i + 1]);
            expect(date1).to.be.lessThan(date2);
        }
    });
});

// new scenario
Given('a categoria {string} está selecionada', (category: string) => {
    cy.get('.buttons-list').contains(category).click();
});

Then('todos os reviews são exibidos do mais novo para o mais antigo.', () => {
    let dates = [];
    //all posts should contain the category
    cy.get('.post').each((post) => {
        //add date to array
        cy.wrap(post).find('.date').then((date) => {
            dates.push(date.text());
        });
    }).then(() => {
        //check if dates are in order
        cy.log('dates: ', dates);
        for (let i = 0; i < dates.length - 1; i++) {
            let date1 = new Date(dates[i]);
            let date2 = new Date(dates[i + 1]);
            expect(date1).to.be.greaterThan(date2);
        }
    });
});

