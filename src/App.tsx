import { useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

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

const App = () => {
  const boards:Board[] = [
    {
      name: "Platform Launch",
      columns: [
        {
          name: "Todo",
          color: "#49C4E5",
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
          color: "#8471F2",
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
          color: "#67E2AE",
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeBoard = boards[activeBoardIndex]
  const boardEmpty = activeBoard.columns.length === 0
  const addTaskButtonEnabled = !boardEmpty

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const selectBoard = (index:number) => setActiveBoardIndex(index)

  const headerSelectBoard = (index:number) => {
    selectBoard(index)
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
          selectBoard={headerSelectBoard}
        />
        <div className="relative grow flex">
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