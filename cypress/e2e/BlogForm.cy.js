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
    })

    it('A blog can be created', function () {
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

      cy.contains('new blog "Blog title" added')

      cy.contains('Blog title')
    })
  })
})
