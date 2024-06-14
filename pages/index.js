// pages/index.js
import React from "react"
import Head from "next/head"
import Link from "next/link"
import CreateBoard from "../pages/createboard"

export default function Page() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/board">Go to Board 2</Link>

      <Link href="/createboard">Go to Create Board</Link>
    </div>
  )
}
