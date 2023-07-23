import { Board } from "./App"

const Columns = ({
  activeBoard,
} : {
  activeBoard: Board,
}) => {
  return (
    <div className="h-full px-4 flex space-x-6 overflow-x-auto md:px-6">
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
  )
}

export default Columns