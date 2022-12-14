import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { SettingsModal } from "../SettingsModal"
import { HelpModal } from "../HelpModal"
import logo from "../../../public/cryptixle_logo.png"
import { useRouter } from "next/router"

const Navbar = () => {
  let [isHelpOpen, setHelpIsOpen] = useState(false)
  let [isSettingsOpen, setSettingsIsOpen] = useState(false)
  const router = useRouter()

  function openModal(type: string) {
    if (type === "settings") {
      setSettingsIsOpen(true)
    }
    if (type === "help") {
      setHelpIsOpen(true)
    }
  }
  return (
    <>
      <div className='flex w-min-screen items-center justify-center bg-neutral-100'>
        <Image src={logo} alt='Cryptixle Logo' width={110} height={110} />
      </div>
      <div className='navbar flex w-min-screen items-center justify-center bg-neutral-100 '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 mx cursor-pointer'
          fill='none'
          viewBox='0 0 24 24'
          onClick={() => openModal("help")}
          stroke='currentColor'
          strokeWidth={2}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>

        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 mx-2 cursor-pointer'
          fill='none'
          viewBox='0 0 24 24'
          onClick={() => openModal("settings")}
          stroke='currentColor'
          strokeWidth={2}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg> */}
        <Link href={"/"}>
          <h1 className='text-xl text-[1.75rem] leading-normal uppercase cursor-pointer'>
            Cryptixle
          </h1>
        </Link>
        {router.asPath.split("/")[2] === "today" ? (
          <Link href={"/puzzle/random"}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mx-2 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </Link>
        ) : (
          <Link href={"/puzzle/today"}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mx-2 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </Link>
        )}
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 cursor-pointer'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg> */}
      </div>
      <HelpModal open={isHelpOpen} setIsOpen={setHelpIsOpen} />
      <SettingsModal open={isSettingsOpen} setIsOpen={setSettingsIsOpen} />
    </>
  )
}

export default Navbar
