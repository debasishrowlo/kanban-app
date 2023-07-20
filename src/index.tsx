import React from "react"
import { createRoot } from "react-dom/client"

import logoMobileImg from "./assets/images/logo-mobile.svg"
import chevronDownImg from "./assets/images/icon-chevron-down.svg"
import addTaskMobileImg from "./assets/images/icon-add-task-mobile.svg"
import verticalEllipsisImg from "./assets/images/icon-vertical-ellipsis.svg"

import "./index.css"

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <img src={logoMobileImg} />
          <p className="ml-4 text-18 font-bold">Platform Launch</p>
          <img src={chevronDownImg} className="w-2 ml-2" />
        </div>
        <div className="flex items-center">
          <button type="button" className="px-4 py-2 bg-purple opacity-25 rounded-full shadow-md">
            <img src={addTaskMobileImg} className="w-3" />
          </button>
          <button type="button" className="px-4">
            <img src={verticalEllipsisImg} />
          </button>
        </div>
      </div>
      <div className="grow flex items-center">
        <div>
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
    </div>
  );
}

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)