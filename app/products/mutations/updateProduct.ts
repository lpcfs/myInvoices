import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { UpdateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const product = await db.product.update({ where: { id }, data })

    return product
  }
)
