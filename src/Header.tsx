import { Fragment } from "react"
import classnames from "classnames"
import { Listbox, Transition } from "@headlessui/react"

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
  showCreateBoardForm,
  editBoard,
} : {
  addTaskButtonEnabled: boolean,
  sidebarOpen: boolean,
  activeBoardIndex: number,
  boards: Board[],
  toggleSidebar: Function,
  selectBoard: Function,
  showCreateBoardForm: Function,
  editBoard: Function,
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
        <div className="relative flex items-center">
          <Listbox value={null} onChange={() => {}}>
            <Listbox.Button type="button" className="h-full px-4 md:px-6 md:py-4">
              <img src={verticalEllipsisImg} />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-300"
              enterFrom="-translate-y-2 opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition duration-200"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="-translate-y-2 opacity-0"
            >
              <Listbox.Options className="w-48 mt-5 mr-4 absolute z-10 top-full right-0 bg-white overflow-hidden shadow-lg rounded-lg md:mr-6">
                <Listbox.Option 
                  className="px-4 py-4 hover:bg-gray-200 text-14 font-medium text-gray-300 whitespace-nowrap cursor-pointer transition-colors duration-300" value={null}
                  onClick={() => editBoard()}
                >
                  Edit Board
                </Listbox.Option>
                <Listbox.Option className="px-4 py-4 hover:bg-light-red/20 text-14 font-medium text-red whitespace-nowrap cursor-pointer transition-colors duration-300" value={null}>
                  Delete Board
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
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
            showCreateBoardForm={showCreateBoardForm}
          />
        </div>
      </Transition>
    </div>
  )
}

export default Header