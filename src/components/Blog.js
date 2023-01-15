import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, handleUpdate }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    blog.likes++
    await blogService.patch(blog.id, { likes: blog.likes })
    await handleUpdate()
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      await blogService.remove(blog.id)
      await handleUpdate()
    }
  }
  return (
    <div style={blogStyle} data-testid='blog'>
      {blog.title}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        {blog.author}
        <br />
        {blog.url}
        <br />
        {parseInt(blog.likes, 10)} <button onClick={addLike}>like</button>
        <br />
        {blog.user?.username === user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
