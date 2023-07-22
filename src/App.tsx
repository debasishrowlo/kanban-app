import React, { useState } from "react"
import { Transition } from "@headlessui/react"

import Header from "./Header"
import BoardList from "./BoardList"

import PlusIcon from "./assets/icons/Plus"
import SlashedEyeIcon from "./assets/icons/SlashedEye"

import eyeImg from "./assets/images/icon-show-sidebar.svg"

const enum taskStatuses {
  todo = "Todo",
  doing = "Doing",
  done = "Done",
}

export type Board = {
  name: string,
  columns: Array<{
    name: string,
    color: string,
    tasks: Array<{
      name: string,
      description: string,
      status: taskStatuses,
      subtasks: Array<{
        title: string,
        complete: boolean,
      }>
    }>,
  }>,
}

export const sidebarEnterDurationClass = "duration-[400ms]"
export const sidebarLeaveDurationClass = "duration-300"

const App = () => {
  const boards:Board[] = [
    {
      name: "Platform Launch",
      // columns: [],
      columns: [
        {
          name: "Todo",
          color: "#635FC7",
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: taskStatuses.todo,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
                { 
                  title: "Research competitor pricing and business models",
                  complete: false,
                },
              ],
            },
            {
              name: "Build UI for onboarding flow",
              description: "",
              status: taskStatuses.todo,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Build UI for search",
              description: "",
              status: taskStatuses.todo,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Build settings UI",
              description: "",
              status: taskStatuses.todo,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
          ]
        },
        {
          name: "Doing",
          color: "#635FC7",
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: taskStatuses.doing,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Design settings and search pages",
              description: "",
              status: taskStatuses.doing,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Add account management endpoints",
              description: "",
              status: taskStatuses.doing,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
          ],
        },
        {
          name: "Done",
          color: "#635FC7",
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: taskStatuses.done,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Design settings and search pages",
              description: "",
              status: taskStatuses.done,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
            {
              name: "Add account management endpoints",
              description: "",
              status: taskStatuses.done,
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  complete: true,
                },
              ],
            },
          ],
        },
      ],
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
  const selectBoard = (index:number) => setActiveBoardIndex(index)
  const selectBoardMobile = (index:number) => {
    setActiveBoardIndex(index)
    toggleSidebar()
  }
  
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header 
          addTaskButtonEnabled={addTaskButtonEnabled}
          sidebarOpen={sidebarOpen}
          activeBoardIndex={activeBoardIndex}
          boards={boards}
          toggleSidebar={toggleSidebar}
          selectBoard={selectBoardMobile}
        />
        <div className="relative grow flex">
          <Transition
            show={sidebarOpen}
            className="sm:hidden absolute z-10 inset-0 bg-black opacity-50"
            enter={`transition-opacity ${sidebarEnterDurationClass}`}
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave={`transition-opacity ${sidebarLeaveDurationClass}`}
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
            onClick={toggleSidebar}
          ></Transition>
          <div className="hidden h-full relative sm:block">
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
                onClick={toggleSidebar}
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
              onClick={toggleSidebar}
              className="hidden sm:block w-14 h-12 absolute z-10 left-0 bottom-8 bg-purple hover:bg-light-purple transition-colors rounded-r-full"
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
              <div className="h-full px-4 flex space-x-6 overflow-x-auto sm:px-6">
                {activeBoard.columns.map((column, index) => (
                  <div 
                    className="w-5/6 pt-6 shrink-0"
                    style={{ maxWidth: "304px" }}
                    key={index}
                  >
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple rounded-full"></div>
                      <p className="ml-3 text-12 font-bold text-gray-300 tracking-title uppercase">{column.name} ({column.tasks.length})</p>
                    </div>
                    <div className="mt-6 space-y-5">
                      {column.tasks.map((task, index) => {
                        const completedSubtaskCount = task.subtasks.filter(subtask => subtask.complete).length
                        const subtaskCount = task.subtasks.length
                        
                        return (
                          <div 
                            className="px-4 py-6 bg-white rounded-lg shadow-[0_4px_6px_0px_rgba(54,78,126,0.10)]"
                            key={index}
                          >
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
    </>
  );
}

export default App