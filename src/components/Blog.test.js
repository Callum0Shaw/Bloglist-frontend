import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

const user = {
  id: 1,
  name: "Test Name",
  username: "Test Username",
}

const blog = {
  title: "Test Title",
  author: "Test Author",
  url: "Test Url",
  likes: 5,
  user: user,
}

const likeBlog = jest.fn()
const deleteBlog = jest.fn()

test("Minimised blog shows correct content", () => {
  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )
  expect(component.container).not.toHaveTextContent(blog.url, blog.likes)
})

test("Expanded blog show correct content", () => {
  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
  )

  const showButton = component.getByText("View")

  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(
    blog.title, blog.author, blog.url, blog.likes
  )
})
