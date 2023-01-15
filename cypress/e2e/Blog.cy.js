describe('BlogForm', function () {
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
        name: 'Test User',
        username: 'test',
        password: 'foobar'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.login({ username: 'test', password: 'foobar' })

      cy.contains('New blog').click()
      cy.get('input')
        .eq(0)
        .type('Blog title')
      cy.get('input')
        .eq(1)
        .type('Fancy Writer')
      cy.get('input')
        .eq(2)
        .type('www.google.com')

      cy.contains('save').click()
    })

    it('Blog can be liked', function () {
      cy.contains('show').click()

      cy.contains('like').click()
      cy.contains('like').click()

      cy.contains(2)
    })

    it('Blog can deleted', function () {
      cy.contains('show').click()

      cy.contains('remove').click()

      cy.get('Blog title').should('not.exist')
    })
  })
})
