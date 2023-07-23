import { Transition } from "@headlessui/react"
import { useState } from "react"

import Header from "./Header"
import Sidebar from "./Sidebar"
import EmptyBoard from "./EmptyBoard"
import Columns from "./Columns"

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
      className="md:hidden absolute z-10 inset-0 bg-black opacity-50"
      enter={`transition-opacity ${sidebarEnterDurationClass}`}
      enterFrom="opacity-0"
      enterTo="opacity-50"
      leave={`transition-opacity ${sidebarLeaveDurationClass}`}
      leaveFrom="opacity-50"
      leaveTo="opacity-0"
      onClick={() => toggleSidebar()}
    ></Transition>
  )
}

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
          <SidebarOverlay
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <Sidebar
            sidebarOpen={sidebarOpen}
            activeBoardIndex={activeBoardIndex}
            boards={boards}
            selectBoard={selectBoard}
            toggleSidebar={toggleSidebar}
          />
          <div className="w-full h-full">
            {boardEmpty ? (
              <EmptyBoard />
            ) : (
              <Columns activeBoard={activeBoard} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App