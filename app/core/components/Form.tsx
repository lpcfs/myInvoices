import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, ButtonGroup } from "@mui/material"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  listText,
  listCommand,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key as any, {
                type: "submit",
                message: value,
              })
            }
          }
        })}
        className="form"
        {...props}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ mt: "1rem", mb: "1rem" }}
        >
          {submitText && (
            <Button type="submit" disabled={ctx.formState.isSubmitting || !ctx.formState.isDirty}>
              {submitText}
            </Button>
          )}
          {ctx.formState.isDirty && (
            <Button
              disabled={ctx.formState.isSubmitting || !ctx.formState.isDirty}
              onClick={async () => ctx.reset()}
            >
              CANCEL
            </Button>
          )}
        </ButtonGroup>

        {listText && (
          <Button
            variant="outlined"
            disabled={ctx.formState.isSubmitting || ctx.formState.isDirty}
            onClick={async () => listCommand()}
            sx={{ mt: "1rem", mb: "1rem", ml: "1rem" }}
          >
            {listText}
          </Button>
        )}

        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError && (
          <div role="alert" style={{ color: "red" }}>
            {formError}
          </div>
        )}

        <style global jsx>{`
          .form > * + * {
            margin-top: 1rem;
          }
        `}</style>
      </form>
    </FormProvider>
  )
}

export default Form
