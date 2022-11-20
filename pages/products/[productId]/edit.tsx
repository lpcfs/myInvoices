import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { UpdateProduct } from "app/products/validations"
import { readFileAsync } from "app/utils/utils"
import { Button, ButtonGroup, Typography } from "@mui/material"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { setQueryData }] = useQuery(
    getProduct,
    { id: productId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>Edit Product {product.name}</title>
      </Head>

      <Typography variant="h4" component="h2" sx={{ mt: "1rem" }}>
        Edit Product: {product.name}
      </Typography>

      {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group" sx={{ mt: '1rem' }}>
        <Button onClick={async () => await router.push(Routes.ProductsPage())}>
          Products
        </Button>
      </ButtonGroup> */}
      {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group" sx={{ mt: '1rem', mb: '1rem' }}>
        <Button onClick={async () => await router.push(Routes.EditProductPage({ productId: product.id }))}>
          Save
        </Button>
        <Button
          onClick={async () => {
            if (window.confirm("This will cancel your change")) {
              await deleteProductMutation({ id: product.id });
              await router.push(Routes.ProductsPage());
            }
          }}
        >
          Cancel
        </Button>
      </ButtonGroup> */}

      <ProductForm
        listText="Products"
        listCommand={() => router.push(Routes.ProductsPage())}
        submitText="Update Product"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={UpdateProduct}
        initialValues={product}
        onSubmit={async (values) => {
          try {
            if (values.image.length > 0 && typeof values.image === "object") {
              values.image = await readFileAsync(values.image[0])
            }
            const updated = await updateProductMutation({
              ...values,
              id: product.id,
            })
            await setQueryData(updated)
            await router.push(Routes.ShowProductPage({ productId: updated.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </>
  )
}

const EditProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
