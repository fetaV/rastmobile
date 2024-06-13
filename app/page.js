import Head from "next/head"
import Board from "./Board"
import Board2 from "./Board2"
import CreateBoard from "./CreateBoard"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Board2 />
      </main>
      <main>
        <CreateBoard />
      </main>
    </div>
  )
}
