import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

test("BlogForm updates parent state and calls onSubmit", () => {
  const postBlog = jest.fn()

  const component = render(<BlogForm postBlog={postBlog} />)

  const title = component.container.querySelector("#Title")
  const author = component.container.querySelector("#Author")
  const url = component.container.querySelector("#Url")

  const form = component.container.querySelector("#formDiv")

  const handleInput = (input) => {
    fireEvent.change(input, {
      target: { value: "test" },
    })
  }
  handleInput(title)
  handleInput(author)
  handleInput(url)

  const submitButton = component.getByText("Create")
  fireEvent.click(submitButton)

  expect(postBlog.mock.calls).toHaveLength(1)
  expect(postBlog.mock.calls[0][0]).toStrictEqual({
    title: "test",
    author: "test",
    url: "test",
  })
})
