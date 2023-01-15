Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`
    },
    body: {
      title,
      author,
      url
    }
  }).then(({ body }) => {
    cy.request({
      url: `http://localhost:3003/api/blogs/${body.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem('loggedBlogappUser')).token
        }`
      },
      body: {
        likes
      }
    })
  })
})
