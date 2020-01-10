/// <reference types="Cypress" />

describe("User can sign up", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/",
      response: "fixture:signup.json",
      headers: {
        uid: "user@mail.com"
      }
    });
    cy.get("#signup").click();
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#password_confirmation").type("password");
      cy.get('button').contains('Submit').click();
    });
    cy.contains('Hi user@mail.com!')
  });

  it("with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid signup credentials. Please try again."],
        success: false
      }
    });
    cy.get("#signup").click();
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get('button').contains('Submit').click()
    });
    cy.contains('Invalid signup credentials. Please try again.')
  });
});