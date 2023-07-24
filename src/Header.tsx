import classnames from "classnames"
import { Transition } from "@headlessui/react"

import {
  Board,
  sidebarEnterDurationClass,
  sidebarLeaveDurationClass,
} from "./App"
import BoardList from "./BoardList"

import PlusIcon from "./assets/icons/Plus"

import chevronDownImg from "./assets/images/icon-chevron-down.svg"
import logoDarkImg from "./assets/images/logo-dark.svg"
import logoMobileImg from "./assets/images/logo-mobile.svg"
import verticalEllipsisImg from "./assets/images/icon-vertical-ellipsis.svg"

const Header = ({
  addTaskButtonEnabled,
  sidebarOpen,
  activeBoardIndex,
  boards,
  toggleSidebar,
  selectBoard,
} : {
  addTaskButtonEnabled: boolean,
  sidebarOpen: boolean,
  activeBoardIndex: number,
  boards: Board[],
  toggleSidebar: Function,
  selectBoard: Function,
}) => {
  const activeBoard = boards[activeBoardIndex]

  return (
    <div className="relative flex items-center justify-between border-b border-transparent md:border-gray-200 bg-white">
      <div className="h-full flex items-center">
        <div className="h-full">
          <div className="h-full pl-4 flex items-center md:px-6 md:border-r md:border-gray-200">
            <img src={logoMobileImg} className="md:hidden" />
            <img src={logoDarkImg} className="hidden md:block" />
          </div>
          <Transition
            appear={true}
            show={sidebarOpen}
            className="hidden md:block"
            enter={`transition-all ${sidebarEnterDurationClass}`}
            enterFrom="w-0"
            enterTo="w-sidebar"
            leave={`transition-all ${sidebarLeaveDurationClass}`}
            leaveFrom="w-sidebar"
            leaveTo="w-0"
          />
        </div>
        <button
          type="button" 
          className="h-full pl-4 flex items-center md:pl-6 md:pointer-events-none"
          onClick={() => toggleSidebar()}
        >
          <p className="text-18 font-bold md:text-20">{activeBoard.name}</p>
          <img 
            src={chevronDownImg} 
            className={classnames(`md:hidden w-2.5 ml-2 transition-transform duration-300`, {
              "rotate-180": sidebarOpen,
            })} 
          />
        </button>
      </div>
      <div className="py-4 flex items-center">
        <button 
          type="button" 
          className={classnames("px-4 py-2 flex items-center bg-purple font-bold rounded-full shadow-md md:px-6 md:py-4", {
            "hover:bg-light-purple transition-colors": addTaskButtonEnabled,
            "opacity-25": !addTaskButtonEnabled,
          })}
          disabled={!addTaskButtonEnabled}
        >
          <PlusIcon className="w-3 fill-white" />
          <span className="hidden ml-2 text-white md:block">Add New Task</span>
        </button>
        <button type="button" className="h-full px-4 md:px-6">
          <img src={verticalEllipsisImg} />
        </button>
      </div>
      <Transition
        show={sidebarOpen}
        className="w-4/5 absolute z-20 left-1/2 -translate-x-1/2 top-full md:hidden"
        enter={`transition ${sidebarEnterDurationClass}`}
        enterFrom="-translate-y-4 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave={`transition ${sidebarLeaveDurationClass}`}
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-4 opacity-0"
      >
        <div className="relative py-4 mt-4 mx-auto bg-white rounded-lg overflow-x-hidden">
          <BoardList
            boards={boards}
            activeBoardIndex={activeBoardIndex}
            selectBoard={selectBoard}
          />
        </div>
      </Transition>
    </div>
  )
}

export default Header