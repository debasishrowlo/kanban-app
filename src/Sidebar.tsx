import { Transition } from "@headlessui/react"

import {
  Board,
  sidebarEnterDurationClass,
  sidebarLeaveDurationClass,
} from "./App"
import BoardList, { MenuItemBackground } from "./BoardList"

import SlashedEyeIcon from "./assets/icons/SlashedEye"

import eyeImg from "./assets/images/icon-show-sidebar.svg"

const SidebarOverlay = ({
  sidebarOpen,
  toggleSidebar,
} : { 
  sidebarOpen: boolean
  toggleSidebar: Function,
}) => {
  return (
    <Transition
      show={sidebarOpen}
      className="overlay absolute z-10 md:hidden"
      enter={`transition-opacity ${sidebarEnterDurationClass}`}
      enterFrom="opacity-0"
      enterTo="opacity-50"
      leave={`transition-opacity ${sidebarLeaveDurationClass}`}
      leaveFrom="opacity-50"
      leaveTo="opacity-0"
      onClick={() => toggleSidebar()}
    />
  )
}

const Sidebar = ({
  sidebarOpen,
  activeBoardIndex,
  boards,
  selectBoard,
  toggleSidebar,
  showCreateBoardForm,
} : {
  sidebarOpen: boolean,
  activeBoardIndex: number,
  boards: Board[],
  selectBoard: Function,
  toggleSidebar: Function,
  showCreateBoardForm: Function,
}) => {
  return (
    <>
      <SidebarOverlay
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="hidden h-full relative md:block">
        <Transition
          appear={true}
          show={sidebarOpen}
          enter={`transition-all ${sidebarEnterDurationClass}`}
          enterFrom="w-0"
          enterTo="w-sidebar"
          leave={`transition-all ${sidebarLeaveDurationClass}`}
          leaveFrom="w-sidebar"
          leaveTo="w-0"
        />
        <Transition
          appear={true}
          className="w-sidebar h-full -mt-px py-8 absolute z-20 top-0 left-0 flex flex-col justify-between border-r border-gray-200 bg-white"
          show={sidebarOpen}
          enter={`transition-transform ${sidebarEnterDurationClass}`}
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave={`transition-transform ${sidebarLeaveDurationClass}`}
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <BoardList
            boards={boards}
            activeBoardIndex={activeBoardIndex}
            selectBoard={selectBoard}
            showCreateBoardForm={showCreateBoardForm}
          />
          <button 
            type="button" 
            onClick={() => toggleSidebar()}
            className="relative px-6 py-4 flex items-center text-left group"
          >
            <MenuItemBackground />
            <SlashedEyeIcon className="fill-gray-300 group-hover:fill-purple transition-colors duration-300" />
            <p className="ml-3 text-16 font-bold text-gray-300 group-hover:text-purple transition-colors duration-300">Hide Sidebar</p>
          </button>
        </Transition>
        <button 
          type="button"
          onClick={() => toggleSidebar()}
          className="hidden md:block w-14 h-12 absolute z-10 left-0 bottom-8 bg-purple hover:bg-light-purple transition-colors rounded-r-full"
        >
          <img src={eyeImg} className="mx-auto w-4" />
        </button>
      </div>
    </>
  )
}

export default Sidebar