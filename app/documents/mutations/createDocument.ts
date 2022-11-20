import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CreateDocument } from "../validations"

export default resolver.pipe(resolver.zod(CreateDocument), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const document = await db.document.create({ data: input })

  return document
})
