import Head from "next/head"
import Board from "./Board"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Board />
      </main>
    </div>
  )
}
