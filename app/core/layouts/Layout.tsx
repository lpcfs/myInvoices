import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Container from "@mui/material/Container"
import ApplicationBar from "./ApplicationBar"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "myInvoices"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApplicationBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  )
}

export default Layout
