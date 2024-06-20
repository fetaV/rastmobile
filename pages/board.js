// pages/board.js
import Head from "next/head"
import Board from "../app/components/Board"
import { useRouter } from "next/router"

const BoardPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Board id={id} />
      </main>
    </div>
  )
}

export default BoardPage
