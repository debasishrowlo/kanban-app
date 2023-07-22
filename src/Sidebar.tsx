import React from "react"
import { Transition } from "@headlessui/react"

import {
  Board,
  sidebarEnterDurationClass,
  sidebarLeaveDurationClass,
} from "./App"
import BoardList from "./BoardList"

import SlashedEyeIcon from "./assets/icons/SlashedEye"

import eyeImg from "./assets/images/icon-show-sidebar.svg"

const Sidebar = ({
  sidebarOpen,
  activeBoardIndex,
  boards,
  selectBoard,
  toggleSidebar,
} : {
  sidebarOpen: boolean,
  activeBoardIndex: number,
  boards: Board[],
  selectBoard: Function,
  toggleSidebar: Function,
}) => {
  return (
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
      ></Transition>
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
        />
        <button 
          type="button" 
          onClick={() => toggleSidebar()}
          className="relative px-6 py-4 flex items-center text-left group"
        >
          <div className="pr-5 absolute z-10 top-0 left-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10">
            <div className="w-full h-full bg-purple rounded-r-full"></div>
          </div>
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
  )
}

export default Sidebar