import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useFormik, FormikTouched } from 'formik';
import * as validate from 'yup';
import classnames from 'classnames';

import PlusIcon from "./assets/icons/Plus"

import crossImg from "@/src/assets/images/icon-cross.svg"

const CreateBoardForm = ({
  visible,
  close,
  createBoard,
} : {
  visible: boolean,
  close: Function,
  createBoard: Function,
}) => {
  const form = useFormik({
    initialValues: {
      name: '',
      columns: [],
    },
    validationSchema: validate.object().shape({
      name: validate.string().required(),
      columns: validate.array().of(validate.object().shape({
        name: validate.string().required(),
        color: validate.string().required(),
      })),
    }),
    onSubmit: values => {
      createBoard({
        name: values.name,
        columns: values.columns.map(column => ({
          name: column.name,
          color: column.color,
          tasks: [],
        }))
      })
      close()
    },
  });
  console.log(form.touched);

  const setBoardName = (name:string) => {
    form.setFieldValue("name", name)
  }

  const addColumn = () => {
    form.setFieldValue("columns", [
      ...form.values.columns,
      { name: "", color: "#635FC7" },
    ])
  }

  const deleteColumn = (index: number) => {
    form.setFieldValue("columns", [
      ...form.values.columns.slice(0, index),
      ...form.values.columns.slice(index + 1),
    ]);
  };

  const nameHasError = form.touched?.name && form.errors?.name

  const columnHasError = (index:number) => {
    const columns = form.touched.columns as FormikTouched<any>[]

    if (
      columns === undefined || columns.length === 0 ||
      form.errors === undefined || form.errors.columns === undefined
    ) {
      return false
    }

    return (
      columns[index] !== undefined && 
      form.errors.columns[index] !== undefined
    )
  } 

  return (
      <Transition show={visible}>
        <Dialog onClose={() => close()}>
          <Transition.Child
            className="overlay"
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          />
          <div className="mx-auto px-4 w-full fixed z-50 inset-0 flex items-center justify-center md:px-0">
            <Transition.Child
              as={Fragment}
              enter="transition duration-500"
              enterFrom="translate-y-5 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition duration-300"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-5 opacity-0"
            >
              <Dialog.Panel as={Fragment}>
                <form onSubmit={form.handleSubmit} className="w-full p-6 max-w-dialog bg-white rounded-md sm:p-8">
                  <p className="text-18 font-bold">Add new board</p>
                  <div className="mt-6">
                    <p className="text-12 font-bold text-gray-300">Board Name</p>
                    <input 
                      type="text" 
                      className={classnames("w-full mt-2 px-4 py-2.5 border text-14 font-medium rounded placeholder:text-gray-300 outline-none", {
                        "border-gray-300": !nameHasError,
                        "border-red": nameHasError,
                      })}
                      placeholder="e.g. Web Design"
                      value={form.values.name}
                      onChange={(e) => setBoardName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-12 font-bold text-gray-300">Board Columns</p>
                    {form.values.columns.map((column, index) => {
                      const setColumnName = (name:string) => {
                        const columns = form.values.columns

                        form.setFieldValue("columns", [
                          ...columns.slice(0, index),
                          { ...columns[index], name },
                          ...columns.slice(index + 1),
                        ])
                      }

                      const hasError = columnHasError(index)

                      return (
                        <div className="mt-2 flex items-center" key={index}>
                          <div className={classnames("w-full flex items-center border rounded", {
                            "border-gray-300": !hasError,
                            "border-red": hasError,
                          })}>
                            <button type="button" className="h-full px-4 outline-none">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: column.color }}
                              />
                            </button>
                            <input
                              type="text" 
                              className="w-full pl-0 pr-4 py-2.5 bg-transparent text-14 font-medium placeholder:text-gray-300 outline-none"
                              value={column.name}
                              onChange={(e) => setColumnName(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <button 
                            type="button" 
                            className="-mr-4 px-4 py-3"
                            onClick={() => deleteColumn(index)}
                          >
                            <img src={crossImg} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <button 
                    type="button" 
                    className="relative mt-3 w-full py-2.5 flex justify-center items-center"
                    onClick={() => addColumn()}
                  >
                    <div className="absolute w-full h-full bg-purple rounded-full opacity-10" />
                    <PlusIcon className="ml-3 w-2 fill-purple" />
                    <p className="ml-1 text-14 font-bold text-purple">Add New Column</p>
                  </button>
                  <button type="submit" className="relative mt-6 w-full py-2.5 flex justify-center items-center bg-purple text-14 font-bold text-white rounded-full">
                    Create New Board
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  )
}

export default CreateBoardForm