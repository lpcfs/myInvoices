import { z } from "zod"

export const CreateDocument = z.object({
  name: z.string(),
  description: z.string(),
})

export const UpdateDocument = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty("The name of document is required")
    .max(32, "Name must be less than 32 characters"),
  description: z
    .string()
    .nonempty("The Description is required")
    .max(1000, "Name must be less than 1000 characters"),
})
