import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

jest.mock('axios')

const blog = {
  title: 'Hello world',
  author: 'Foobar',
  likes: 123,
  url: 'www.google.com'
}

describe('BlogForm', () => {
  test('adds blog when button is clicked', async () => {
    const user = userEvent.setup()
    const mockAdd = jest.fn()

    render(<BlogForm addBlog={mockAdd} />)

    const newBlogButton = screen.getByText('New blog')
    await user.click(newBlogButton)

    const input = screen.getAllByRole('textbox')

    await user.type(input[0], 'blogname')
    await user.type(input[1], 'author')
    await user.type(input[2], 'www.google.com')

    const saveButton = screen.getByText('save')
    await user.click(saveButton)

    expect(mockAdd).toHaveBeenCalledWith({
      title: 'blogname',
      author: 'author',
      url: 'www.google.com'
    })
  })
})
