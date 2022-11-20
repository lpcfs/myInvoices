import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateDocument } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateDocument),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const document = await db.document.update({ where: { id }, data })

    return document
  }
)
