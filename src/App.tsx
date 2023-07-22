import React, { useState } from "react"
import classnames from "classnames"
import { Transition } from "@headlessui/react"

import BoardIcon from "./assets/icons/Board"
import PlusIcon from "./assets/icons/Plus"

import chevronDownImg from "./assets/images/icon-chevron-down.svg"
import eyeImg from "./assets/images/icon-show-sidebar.svg"
import logoDarkImg from "./assets/images/logo-dark.svg"
import logoMobileImg from "./assets/images/logo-mobile.svg"
import slashedEyeImg from "./assets/images/icon-hide-sidebar.svg"
import verticalEllipsisImg from "./assets/images/icon-vertical-ellipsis.svg"

export type Board = {
  name: string,
  columns: Array<{
    name: string,
    tasks: Array<{
      name: string,
      description: string,
      subtasks: Array<{
        title: string,
        complete: boolean,
      }>
    }>,
  }>,
}

const App = () => {
  const boards:Board[] = [
    {
      name: "Platform Launch",
      columns: [],
      // columns: [
      //   {
      //     name: "Todo",
      //     tasks: [
      //       {
      //         name: "Research pricing points of various competitors and trial different business models",
      //         description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //           { 
      //             title: "Research competitor pricing and business models",
      //             complete: false,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Build UI for onboarding flow",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Build UI for search",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Build settings UI",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //     ]
      //   },
      //   {
      //     name: "Doing",
      //     tasks: [
      //       {
      //         name: "Research pricing points of various competitors and trial different business models",
      //         description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Design settings and search pages",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Add account management endpoints",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     name: "Done",
      //     tasks: [
      //       {
      //         name: "Research pricing points of various competitors and trial different business models",
      //         description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Design settings and search pages",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //       {
      //         name: "Add account management endpoints",
      //         description: "",
      //         subtasks: [
      //           {
      //             title: "Research competitor pricing and business models",
      //             complete: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
    {
      name: "Marketing Plan",
      columns: [],
    },
    {
      name: "Roadmap",
      columns: [],
    },
  ]
  const [activeBoardIndex, setActiveBoardIndex] = useState(0)

  const activeBoard = boards[activeBoardIndex]
  const boardEmpty = activeBoard.columns.length === 0
  const addTaskButtonEnabled = !boardEmpty

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const showBoard = (index:number) => setActiveBoardIndex(index)

  const sidebarEnterDurationClass = "duration-[400ms]"
  const sidebarLeaveDurationClass = "duration-300"
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between border-b border-transparent sm:border-gray-200 bg-white">
        <div className="h-full flex items-center">
          <div className="h-full">
            <div className="h-full pl-4 flex items-center sm:px-6 sm:border-r sm:border-gray-200">
              <img src={logoMobileImg} className="sm:hidden" />
              <img src={logoDarkImg} className="hidden sm:block" />
            </div>
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
          </div>
          <div className="h-full pl-4 flex items-center sm:pl-6">
            <p className="text-18 font-bold sm:text-20">{activeBoard.name}</p>
            <img src={chevronDownImg} className="sm:hidden w-2.5 ml-2" />
          </div>
        </div>
        <div className="py-4 flex items-center">
          <button 
            type="button" 
            className={classnames("px-4 py-2 flex items-center bg-purple hover:bg-light-purple font-bold rounded-full shadow-md transition-colors sm:px-6 sm:py-4", {
              "opacity-25": !addTaskButtonEnabled,
            })}
            disabled={!addTaskButtonEnabled}
          >
            <PlusIcon className="w-3 fill-white" />
            <span className="hidden ml-2 text-white sm:block">Add New Task</span>
          </button>
          <button type="button" className="h-full px-4 sm:px-6">
            <img src={verticalEllipsisImg} />
          </button>
        </div>
      </div>
      <div className="grow flex">
        <div className="h-full relative">
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
            <div>
              <p className="px-6 text-12 font-bold text-gray-300 tracking-title uppercase">All Boards ({boards.length})</p>
              <div className="mt-5">
                {boards.map((board, index) => {
                  const isActive = index === activeBoardIndex
                  
                  return (
                    <button 
                      type="button" 
                      className="w-full relative px-6 py-4 group"
                      onClick={() => showBoard(index)}
                    >
                      <div className="pr-5 absolute z-10 top-0 left-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10">
                        <div className="w-full h-full bg-purple rounded-r-full"></div>
                      </div>
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
                        <div className="w-full h-full bg-purple rounded-r-full"></div>
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
              <button type="button" className="w-full px-6 py-4 flex items-center">
                <BoardIcon className="fill-purple" />
                <PlusIcon className="ml-3 w-2.5 fill-purple" />
                <span className="ml-1 text-16 font-bold text-purple">Create New Board</span>
              </button>
            </div>
            <button 
              type="button" 
              onClick={toggleSidebar}
              className="relative px-6 py-4 flex items-center text-left group"
            >
              <div className="pr-5 absolute z-10 top-0 left-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10">
                <div className="w-full h-full bg-purple rounded-r-full"></div>
              </div>
              <img src={slashedEyeImg} />
              <p className="ml-3 text-16 font-bold text-gray-300">Hide Sidebar</p>
            </button>
          </Transition>
          <button 
            type="button"
            onClick={toggleSidebar}
            className="hidden sm:block w-14 h-12 absolute z-10 left-0 bottom-8 bg-purple rounded-r-full"
          >
            <img src={eyeImg} className="mx-auto w-4" />
          </button>
        </div>
        <div className="w-full h-full">
          {boardEmpty ? (
            <div className="h-full flex items-center">
              <div className="w-full">
                <p className="px-8 text-center text-18 font-bold text-gray-300">
                  This board is empty. Create a new column to get started.
                </p>
                <button type="button" className="px-5 py-3.5 mt-6 mx-auto block bg-purple hover:bg-light-purple text-14 font-bold text-white rounded-full transition-colors sm:text-16">
                  <div className="flex items-center">
                    <PlusIcon className="w-2.5 fill-white" />
                    <span className="ml-2">Add New Column</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex overflow-x-auto">
              {activeBoard.columns.map(column => (
                <div className="w-4/5 px-3 pt-6 shrink-0">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple rounded-full"></div>
                    <p className="ml-3 text-12 font-bold text-gray-300 tracking-title uppercase">{column.name} ({column.tasks.length})</p>
                  </div>
                  <div className="mt-6 space-y-5">
                    {column.tasks.map(task => {
                      const completedSubtaskCount = task.subtasks.filter(subtask => subtask.complete).length
                      const subtaskCount = task.subtasks.length
                      
                      return (
                        <div className="px-4 py-6 bg-white rounded-lg shadow-[0_4px_6px_0px_rgba(54,78,126,0.10)]">
                          <p className="text-16 font-bold">{task.name}</p>
                          <p className="mt-2 text-12 font-bold text-gray-300">{completedSubtaskCount} of {subtaskCount} subtasks</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App