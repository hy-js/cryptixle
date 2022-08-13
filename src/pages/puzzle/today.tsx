import { InferGetServerSidePropsType } from "next"
import { prisma } from "@/server/db/client"
import { useState } from "react"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"
import getDate from "@/utils/getDate"

export type Clue = {
  clue: string
  answer: string
}

const Today = ({
  firstClue,
  secondClue
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { width, height }: Size = useWindowSize()
  const [across, setAcross] = useState("")
  const [down, setDown] = useState("")

  const [showDown, setDownShow] = useState(false)
  const [showAcross, setAcrossShow] = useState(false)

  const onSubmitAcross = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (across.toUpperCase() === firstClue.answer) {
      setAcrossShow(true)
    }
  }
  const onSubmitDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (down.toUpperCase() === secondClue.answer) {
      setDownShow(true)
    }
  }

  return (
    <div className='flex flex-col w-min-screen justify-center'>
      <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
        <h3 className='text-xl'>{firstClue.clue}</h3>
        <form onSubmit={onSubmitAcross}>
          {showAcross ? (
            <input
              type='text'
              disabled
              value={firstClue.answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='across'
              id='across'
              type='text'
              autoComplete='off'
              onChange={(e) => setAcross(e.target.value)}
              maxLength={firstClue.answer.length}
              className='border border-gray-500 w-full text-xl my-2 focus:bg-slate-300 uppercase'
            />
          )}
          <button
            type='submit'
            className='hidden bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
            Submit
          </button>
        </form>
        <hr />
        <form onSubmit={onSubmitDown}>
          <h3 className='text-xl'>{secondClue.clue}</h3>
          {showDown ? (
            <input
              type='text'
              disabled
              value={secondClue.answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='down'
              id='down'
              type='text'
              autoComplete='off'
              onChange={(e) => setDown(e.target.value)}
              maxLength={secondClue.answer.length}
              className='border  border-gray-500 w-full text-xl my-2 focus:bg-neutral-100 uppercase'
            />
          )}
          <button
            type='submit'
            className='bg-white hidden hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
            Submit
          </button>
        </form>
      </div>
      {showAcross && showDown && (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </div>
  )
}

export default Today

// Sever Side Rendering
export async function getServerSideProps() {
  const { currentDay, currentMonth, currentYear } = getDate()
  const dbClues = await prisma.puzzle.findMany({
    take: 2,
    where: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  })
  console.log(dbClues)
  if (dbClues.length > 0) {
    return {
      props: {
        firstClue: dbClues[0],
        secondClue: dbClues[1]
      }
    }
  }

  // Otherwise get ser new clues for the day
  // Randomizer
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  // Get two clues
  const clues = await prisma.puzzle.findMany({
    take: 2,
    skip: skip,
    where: {
      setDate: {
        contains: "NIL"
      }
    }
  })

  await prisma.puzzle.update({
    where: {
      rowId: clues[0].rowId
    },
    data: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  })

  await prisma.puzzle.update({
    where: {
      rowId: clues[1].rowId
    },
    data: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  })

  const firstClue: Clue = clues[0]
  const secondClue: Clue = clues[1]

  return {
    props: {
      firstClue,
      secondClue
    }
  }
}
