import { Clue } from "@/constants/types"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from "react"
type Props = {
  open: boolean
  setIsOpen: (val: boolean) => void
  source: string
}

export const WinModal: React.FC<Props> = ({ open, setIsOpen, source }) => {
  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='text-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-medium leading-6 text-gray-900 flex mt-5 flex-wrap justify-center '>
                    <div className='bg-yellow-300 border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'>
                      W
                    </div>
                    <div className='bg-yellow-300 border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'>
                      I
                    </div>
                    <div className='bg-yellow-300 border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'>
                      N
                    </div>
                  </Dialog.Title>
                  <div className='mt-4'>
                    {source === "today" ? (
                      <p className='text-lg my-2 text-center'>
                        Great job, come back tomorrow to play again!
                      </p>
                    ) : (
                      <p className='text-lg my-2 text-center'>Great job!</p>
                    )}
                  </div>

                  <div className='mt-4 inline-flex justify-center'>
                    <button
                      type='button'
                      className='mx-4 rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      Thanks!
                    </button>
                    {/* {source === "today" && (
                      <Link href={"/puzzle/random"}>
                        <button
                          type='button'
                          className='mx-4 rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2'>
                          Play a random clue.
                        </button>
                      </Link>
                    )} */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default WinModal
