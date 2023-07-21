import React from "react"
import classnames from "classnames"

import { Board as TBoard } from "./index"

import logoLightImg from "./assets/images/logo-light.svg"
import logoDarkImg from "./assets/images/logo-dark.svg"
import logoMobileImg from "./assets/images/logo-mobile.svg"
import chevronDownImg from "./assets/images/icon-chevron-down.svg"
import addTaskMobileImg from "./assets/images/icon-add-task-mobile.svg"
import verticalEllipsisImg from "./assets/images/icon-vertical-ellipsis.svg"

const Board = ({ board } : { board: TBoard }) => {
  const boardEmpty = board.columns.length === 0
  const addTaskButtonEnabled = !boardEmpty
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between border-b border-transparent sm:border-gray-200 bg-white">
        <div className="h-full flex items-center">
          <div className="pl-4 sm:px-6">
            <img src={logoMobileImg} className="sm:hidden" />
            <img src={logoDarkImg} className="hidden sm:block" />
          </div>
          <div className="h-full pl-4 flex items-center sm:pl-6 sm:border-l sm:border-gray-200">
            <p className="text-18 font-bold sm:text-20">{board.name}</p>
            <img src={chevronDownImg} className="sm:hidden w-2.5 ml-2" />
          </div>
        </div>
        <div className="py-4 flex items-center">
          <button 
            type="button" 
            className={classnames("px-4 py-2 flex items-center bg-purple rounded-full shadow-md sm:px-6 sm:py-4", {
              "opacity-25": !addTaskButtonEnabled,
            })}
            disabled={!addTaskButtonEnabled}
          >
            <img src={addTaskMobileImg} className="w-3" />
            <span className="hidden ml-2 text-white sm:block">Add New Task</span>
          </button>
          <button type="button" className="h-full px-4 sm:px-6">
            <img src={verticalEllipsisImg} />
          </button>
        </div>
      </div>
      {boardEmpty ? (
        <div className="grow flex items-center">
          <div className="w-full">
            <p className="px-8 text-center text-18 font-bold text-gray-300">
              This board is empty. Create a new column to get started.
            </p>
            <button type="button" className="px-5 py-3.5 mt-6 mx-auto block bg-purple text-14 font-bold text-white rounded-full">
              <div className="flex items-center">
                <img src={addTaskMobileImg} className="w-2.5" />
                <span className="ml-2">Add New Column</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="grow flex overflow-x-auto">
          {board.columns.map(column => (
            <div className="w-4/5 px-3 pt-6 shrink-0">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple rounded-full"></div>
                <p className="ml-3 text-12 font-bold text-gray-300 tracking-widest uppercase">{column.name} ({column.tasks.length})</p>
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
  );
}

export default Board