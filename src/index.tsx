import React from "react"
import { createRoot } from "react-dom/client"

import Board from "./Board"

import "./index.css"

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
      columns: [
        {
          name: "Todo",
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
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
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
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
          tasks: [
            {
              name: "Research pricing points of various competitors and trial different business models",
              description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
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
  ]
  const activeBoardIndex = 0

  return <Board board={boards[activeBoardIndex]} />
}

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)