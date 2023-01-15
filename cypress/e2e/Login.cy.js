describe('Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'foobar'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in').click()
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in').click()
      cy.get('input:first').type('test')
      cy.get('input:last').type('foobar')
      cy.contains('login').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Log in').click()
      cy.get('input:first').type('invalid')
      cy.get('input:last').type('invalid')
      cy.contains('login').click()

      cy.contains('wrong credentials')
    })
  })
})
