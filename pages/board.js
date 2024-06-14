// pages/board.js
import Head from "next/head"
import Board2 from "../app/components/Board2"

const BoardPage = () => {
  return (
    <div>
      <Head>
        <title>Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Board2 />
      </main>
    </div>
  )
}

export default BoardPage
