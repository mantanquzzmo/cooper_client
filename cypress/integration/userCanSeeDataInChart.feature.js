describe('User can view chart of his data', () => {
  before(function() {
    cy.server();
    cy.visit("/");

    cy.get('#login').click();
    cy.get('#login-form').within(() => {
      cy.get('#email').type('user@mail.com')
      cy.get('#password').type('password')
      cy.get('button').contains('Submit').click()
    })
  });

  it('successfully', async () => {
    cy.get('#show-graph').click()
    cy.get('#chart')
  })
})