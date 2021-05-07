import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("Blog renders content", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test Url",
    Likes: 5,
  }
  const user = {
    id: 1,
    name: "Test Name",
    username: "Test Username",
  }

  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )
  expect(component.container).not.toHaveTextContent("Test Url", "5")
})
