/// <reference types="Cypress" />

describe("User authenticates", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully with valid credentials", () => {
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get('button').contains('Submit').click()
    });
    cy.contains('Hi user@mail.com')
  })

  it("unsuccessfully with invalid credentials", () => {
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get('button').contains('Submit').click()
    });
    cy.contains("Invalid login credentials. Please try again.");
  });
});