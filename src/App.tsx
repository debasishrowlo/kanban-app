import { useState } from "react"

import Dialog from "./Dialog"
import Header from "./Header"
import Sidebar from "./Sidebar"
import EmptyBoard from "./EmptyBoard"
import Columns from "./Columns"
import CreateBoardForm from "./CreateBoardForm"
import EditBoardForm from "./EditBoardForm"

const enum taskStatuses {
  todo = "Todo",
  doing = "Doing",
  done = "Done",
}

export type Task = {
  name: string,
  description: string,
  status: taskStatuses,
  subtasks: Array<{
    title: string,
    complete: boolean,
  }>
}

export type Column = {
  name: string,
  color: string,
  tasks: Task[],
}

export type Board = {
  name: string,
  columns: Column[],
}

export const sidebarEnterDurationClass = "duration-[400ms]"
export const sidebarLeaveDurationClass = "duration-300"

const App = () => {
  const [boardData, setBoardData] = useState<{
    boards: Board[],
    activeBoardIndex: number,
  }>({
    boards: [
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
    ],
    activeBoardIndex: 0,
  })
  const boards = boardData.boards
  const activeBoardIndex = boardData.activeBoardIndex

  const [createBoardFormVisible, setCreateBoardFormVisible] = useState(false)
  const [editBoardFormVisible, setEditBoardFormVisible] = useState(false)
  const [deleteBoardDialogVisible, setDeleteBoardDialogVisible] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeBoard = boards[activeBoardIndex]
  const boardEmpty = activeBoard.columns.length === 0
  const addTaskButtonEnabled = !boardEmpty

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const showCreateBoardForm = () => {
    setCreateBoardFormVisible(true)
  }

  const showCreateBoardFormMobile = () => {
    setCreateBoardFormVisible(true)
    toggleSidebar()
  }

  const hideCreateBoardForm = () => {
    setCreateBoardFormVisible(false)
  }

  const showEditBoardForm = () => {
    setEditBoardFormVisible(false)
  }

  const hideEditBoardForm = () => {
    setEditBoardFormVisible(false)
  }

  const selectBoard = (index:number) => {
    setBoardData({
      ...boardData,
      activeBoardIndex: index,
    })
  }

  const headerSelectBoard = (index:number) => {
    selectBoard(index)
    toggleSidebar()
  }

  const createBoard = (board:Board) => {
    setBoardData({
      boards: [ ...boards, board ],
      activeBoardIndex: boards.length,
    })
  }

  const updateBoard = (board:Board) => {
    setBoardData({
      ...boardData,
      boards: [ 
        ...boards.slice(0, boardData.activeBoardIndex), 
        { ...board },
        ...boards.slice(boardData.activeBoardIndex + 1), 
      ],
    })
  }

  const editBoard = () => {
    setEditBoardFormVisible(true)
  }

  const showDeleteBoardConfirmation = () => {
    setDeleteBoardDialogVisible(true)
  }

  const hideDeleteBoardConfirmation = () => {
    setDeleteBoardDialogVisible(false)
  }

  const deleteBoard = () => {
    setBoardData({
      boards: [
        ...boards.slice(0, activeBoardIndex),
        ...boards.slice(activeBoardIndex + 1),
      ],
      activeBoardIndex: 0,
    })
    hideDeleteBoardConfirmation()
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
          showCreateBoardForm={showCreateBoardFormMobile}
          editBoard={() => editBoard()}
          showDeleteBoardConfirmation={showDeleteBoardConfirmation}
        />
        <div className="relative grow flex">
          <Sidebar
            sidebarOpen={sidebarOpen}
            activeBoardIndex={activeBoardIndex}
            boards={boards}
            selectBoard={selectBoard}
            toggleSidebar={toggleSidebar}
            showCreateBoardForm={showCreateBoardForm}
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
      <CreateBoardForm
        visible={createBoardFormVisible}
        close={hideCreateBoardForm}
        createBoard={createBoard}
      />
      <EditBoardForm
        visible={editBoardFormVisible}
        close={hideEditBoardForm}
        activeBoard={activeBoard}
        updateBoard={updateBoard}
      />
      <Dialog
        visible={deleteBoardDialogVisible} 
        close={() => hideDeleteBoardConfirmation()}
        className="p-6 md:p-8"
      >
        <p className="text-18 font-bold text-red">Delete this board?</p>
        <p className="mt-6 leading-6 text-14 font-medium text-gray-300">Are you sure you want to delete the ‘{activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="mt-6 md:flex">
          <button 
            type="button" 
            className="w-full py-3 bg-red hover:bg-light-red text-14 font-bold text-white rounded-full outline-none transition-colors duration-300"
            onClick={() => deleteBoard()}
          >
            Delete
          </button>
          <button 
            type="button" 
            className="w-full mt-4 py-3 bg-purple/10 hover:bg-purple/20 text-14 font-bold text-purple rounded-full outline-none md:mt-0 md:ml-4 transition-colors duration-300"
            onClick={() => hideDeleteBoardConfirmation()}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default App