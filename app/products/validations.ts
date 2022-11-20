import { z } from "zod"
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const CreateProduct = z.object({
  name: z.string().min(2).trim(),
  description: z.string().min(5),
  price: z.number(),
  image: z.any(),
})

export const UpdateProduct = z.object({
  id: z.number(),
  name: z.string().min(2).trim(),
  description: z.string().min(5),
  price: z.number(),
  image: z.any(),
})
