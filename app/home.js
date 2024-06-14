// home.js
import React from "react"
import Head from "next/head"
import "./global.css"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <index />
      </main>
    </div>
  )
}
