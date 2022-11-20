import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { Avatar, ListItemAvatar, Typography } from "@mui/material"

const ITEMS_PER_PAGE = 10

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <nav aria-label="main folders">
      <List>
        {products.map((product) => (
          <ListItem key={product.id} disablePadding>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <ListItemButton>
                <ListItemAvatar>
                  {product.image && <Avatar alt="Remy Sharp" src={product.image} />}
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`${product.description}`}
                ></ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </Button>
      <Button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </Button>
    </nav>
  )
}

const ProductsPage = () => {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <Typography variant="h4" component="h2" sx={{ mt: "1rem" }}>
        Products
      </Typography>

      <Suspense fallback={<div>Loading...</div>}>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ mt: "1rem" }}
        >
          <Button onClick={async () => router.push(Routes.NewProductPage())}>
            Add new Product
          </Button>
        </ButtonGroup>
        <ProductsList />
      </Suspense>
    </Layout>
  )
}

export default ProductsPage
