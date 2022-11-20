import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createDocument from "app/documents/mutations/createDocument"
import { DocumentForm, FORM_ERROR } from "app/documents/components/DocumentForm"
import { CreateDocument } from "app/documents/validations"

const NewDocumentPage = () => {
  const router = useRouter()
  const [createDocumentMutation] = useMutation(createDocument)

  return (
    <Layout title={"Create New Document"}>
      <h1>Create New Document</h1>

      <DocumentForm
        submitText="Create Document"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateDocument}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const document = await createDocumentMutation(values)
            await router.push(Routes.ShowDocumentPage({ documentId: document.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.DocumentsPage()}>
          <a>Documents</a>
        </Link>
      </p>
    </Layout>
  )
}

NewDocumentPage.authenticate = true

export default NewDocumentPage
