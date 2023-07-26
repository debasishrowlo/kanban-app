import classnames from "classnames"
import { Transition } from "@headlessui/react"

import { Board } from "./App"

import BoardIcon from "./assets/icons/Board"
import PlusIcon from "./assets/icons/Plus"

export const MenuItemBackground = () => {
  return (
    <div className="pr-5 absolute z-10 top-0 left-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10">
      <div className="w-full h-full bg-purple rounded-r-full"/>
    </div>
  )
}

export const BoardList = ({
  boards,
  activeBoardIndex,
  selectBoard,
  showCreateBoardForm,
} : {
  boards: Board[],
  activeBoardIndex: number,
  selectBoard: Function,
  showCreateBoardForm: Function,
}) => {
  return (
    <div>
      <p className="px-6 text-12 font-bold text-gray-300 tracking-title uppercase">All Boards ({boards.length})</p>
      <div className="mt-5">
        {boards.map((board, index) => {
          const isActive = index === activeBoardIndex
          
          return (
            <button 
              type="button" 
              className="w-full relative px-6 py-4 group"
              onClick={() => selectBoard(index)}
              key={index}
            >
              <MenuItemBackground />
              <Transition
                show={isActive}
                className="pr-5 absolute z-20 top-0 left-0 w-full h-full"
                enter="transition-transform duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="w-full h-full bg-purple rounded-r-full" />
              </Transition>
              <div className="relative z-30 flex items-center">
                <BoardIcon className={classnames("transition-colors duration-300", {
                  "fill-white": isActive,
                  "fill-gray-300 group-hover:fill-purple": !isActive,
                })} />
                <p className={classnames("ml-3 text-16 font-bold transition-colors duration-300", {
                  "text-white": isActive,
                  "text-gray-300 group-hover:text-purple": !isActive,
                })}>{board.name}</p>
              </div>
            </button>
          )
        })}
      </div>
      <button 
        type="button" 
        className="relative w-full px-6 py-4 flex items-center group"
        onClick={() => showCreateBoardForm()}
      >
        <MenuItemBackground />
        <BoardIcon className="fill-purple" />
        <PlusIcon className="ml-3 w-2.5 fill-purple" />
        <span className="ml-1 text-16 font-bold text-purple">Create New Board</span>
      </button>
    </div>
  )
}

export default BoardList