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
      cy.createBlog({
        title: 'Best blog',
        author: 'foobar',
        url: 'www.google.com',
        likes: 1000
      })
      cy.createBlog({
        title: 'Worst blog',
        author: 'foobar',
        url: 'www.google.com',
        likes: 2
      })
      cy.visit('http://localhost:3000')
    })

    it('Blogs are ordered by likes', function () {
      cy.get('div.blog')
        .eq(0)
        .contains('Best blog')

      cy.get('div.blog')
        .eq(1)
        .contains('Worst blog')
    })
  })
})
