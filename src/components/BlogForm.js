import { useState, useRef } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ addBlog }) => {
  const initialBlogState = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(initialBlogState)

  const blogFormRef = useRef()

  const handleInputChange = (event, key) => {
    setNewBlog(() => ({
      ...newBlog,
      [key]: event.target.value
    }))
  }

  const createBlog = e => {
    e.preventDefault()
    addBlog(newBlog)
    setNewBlog(initialBlogState)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <form onSubmit={createBlog}>
        <p>
          title:{' '}
          <input
            value={newBlog.title}
            onChange={e => handleInputChange(e, 'title')}
          />
        </p>
        <p>
          author:{' '}
          <input
            value={newBlog.author}
            onChange={e => handleInputChange(e, 'author')}
          />
        </p>
        <p>
          url:{' '}
          <input
            value={newBlog.url}
            onChange={e => handleInputChange(e, 'url')}
          />
        </p>

        <button type='submit'>save</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
