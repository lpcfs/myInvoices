import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductForm } from "./ProductForm"
import { FormApi, SubmissionErrors } from "final-form"

it("ProductForm test", () => {
  render(
    <ProductForm
      onSubmit={function (
        values: any,
        form: FormApi<any, Partial<any>>,
        callback?: ((errors?: SubmissionErrors) => void) | undefined
      ): void | SubmissionErrors | Promise<SubmissionErrors> {
        throw new Error("Function not implemented.")
      }}
    />
  )

  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument()
})
