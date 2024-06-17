// pages/board.js
import Head from "next/head"
import Board2 from "../app/components/Board2"
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
        <Board2 id={id} />
      </main>
    </div>
  )
}

export default BoardPage
