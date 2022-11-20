import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductForm } from "./ProductForm"
import { FormApi, SubmissionErrors } from "final-form"

it("ProductForm test", () => {
  render(<ProductForm onSubmit={(data) => {}} />)

  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument()
})
