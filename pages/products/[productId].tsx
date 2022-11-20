import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import { Box, Button, ButtonGroup, Link, Typography } from "@mui/material"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [product] = useQuery(getProduct, { id: productId })

  return (
    <>
      <Head>
        <title>Product {product.id}</title>
      </Head>

      <Typography variant="h4" component="h2" sx={{ mt: "1rem" }}>
        Products: {product.name}
      </Typography>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ mt: "1rem", mr: "1rem" }}
      >
        <Button
          onClick={async () => await router.push(Routes.EditProductPage({ productId: product.id }))}
        >
          Edit
        </Button>
        <Button
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: product.id })
              await router.push(Routes.ProductsPage())
            }
          }}
        >
          Delete
        </Button>
      </ButtonGroup>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ mt: "1rem" }}
      >
        <Button onClick={async () => await router.push(Routes.ProductsPage())}>Products</Button>
      </ButtonGroup>

      <Box sx={{ mt: "1rem" }}>
        <div>{product.description}</div>
        <br />

        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt="image" width="400px" />
        )}

        <br />
      </Box>
    </>
  )
}

const ShowProductPage = () => {
  const router = useRouter()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductPage
