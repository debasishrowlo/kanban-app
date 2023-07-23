import PlusIcon from "./assets/icons/Plus"

const EmptyBoard = () => {
  return (
    <div className="h-full flex items-center">
      <div className="w-full">
        <p className="px-8 text-center text-18 font-bold text-gray-300">
          This board is empty. Create a new column to get started.
        </p>
        <button type="button" className="px-5 py-3.5 mt-6 mx-auto block bg-purple hover:bg-light-purple text-14 font-bold text-white rounded-full transition-colors md:text-16">
          <div className="flex items-center">
            <PlusIcon className="w-2.5 fill-white" />
            <span className="ml-2">Add New Column</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default EmptyBoard
