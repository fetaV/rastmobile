// home.js
import React from "react"
import Head from "next/head"
import Home from "@/pages/home"

export default function Page() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </div>
  )
}
