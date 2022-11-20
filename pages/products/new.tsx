import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { CreateProduct } from "app/products/validations"
import { readFileAsync } from "app/utils/utils"

const NewProductPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <Layout title={"Create New Product"}>
      <p>
        <Link href={Routes.ProductsPage()}>Products</Link>
      </p>

      <h1>Create New Product</h1>

      <ProductForm
        submitText="Create Product"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateProduct}
        initialValues={{}}
        onSubmit={async (values) => {
          if (values.image.length > 0) {
            values.image = await readFileAsync(values.image[0])
          }
          try {
            const product = await createProductMutation(values)
            await router.push(Routes.ShowProductPage({ productId: product.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Layout>
  )
}

NewProductPage.authenticate = true

export default NewProductPage
