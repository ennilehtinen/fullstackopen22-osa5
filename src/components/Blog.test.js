import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

jest.mock('axios')

const blog = {
  title: 'Hello world',
  author: 'Foobar',
  likes: 123,
  url: 'www.google.com'
}
const user = {
  username: 'dummy'
}

describe('Blog', () => {
  test('renders only title by default', () => {
    render(<Blog user={user} blog={blog} />)

    const element = screen.getByText('Hello world')
    expect(element).toBeDefined()

    const additionalInfo = screen.queryByText('www.google.com')
    expect(additionalInfo).toBeNull()
  })

  test('renders other content when details clicked', async () => {
    render(<Blog user={user} blog={blog} />)

    const usr = userEvent.setup()
    const button = screen.getByText('show')
    await usr.click(button)

    expect(screen.getByTestId('blog')).toHaveTextContent('www.google.com')
    expect(screen.getByTestId('blog')).toHaveTextContent('123')
    expect(screen.getByTestId('blog')).toHaveTextContent('Foobar')
  })

  test('calls backend when like is clicked', async () => {
    const mockLike = jest.fn()
    axios.patch.mockResolvedValue({
      data: blog
    })

    render(<Blog user={user} blog={blog} handleUpdate={mockLike} />)

    const usr = userEvent.setup()
    const showButton = screen.getByText('show')
    await usr.click(showButton)

    const likeButton = screen.getByText('like')
    await usr.click(likeButton)
    await usr.click(likeButton)

    expect(mockLike).toBeCalledTimes(2)
  })
})
