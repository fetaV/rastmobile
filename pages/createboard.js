// pages/createboard.js
import Head from "next/head"
import CreateBoard from "../app/components/CreateBoard"

const CreateBoardPage = () => {
  return (
    <div>
      <Head>
        <title>Create Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CreateBoard />
      </main>
    </div>
  )
}

export default CreateBoardPage
