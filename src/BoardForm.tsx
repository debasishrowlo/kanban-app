import { Fragment, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { useFormik, FormikTouched } from "formik"
import * as validate from "yup"
import classnames from "classnames"

import Dialog from "./Dialog"

import { Board, Column } from "./App"

import PlusIcon from "@/src/assets/icons/Plus"
import CrossIcon from "./assets/icons/Cross"

const Column = ({
  column,
  setName,
  setColor,
  deleteColumn,
  hasError,
} : {
  column: { name: string, color: string },
  setName: Function,
  setColor: Function,
  deleteColumn: Function,
  hasError: boolean,
}) => {
  const colors = [
    "#baf3db", "#f8e6a0", "#ffe2bd", "#ffd2cc", "#dfd8fd",
    "#4bce97", "#e2b203", "#faa53d", "#f87462", "#9f8fef",
    "#1f845a", "#946f00", "#b65c02", "#ca3521", "#6e5dc6",
    "#cce0ff", "#c1f0f5", "#d3f1a7", "#fdd0ec", "#dcdfe4",
    "#579dff", "#60c6d2", "#94c748", "#e774bb", "#8590a2",
    "#0c66e4", "#1d7f8c", "#5b7f24", "#ae4787", "#626f86",
  ]

  return (
    <div className="mt-2 flex items-center">
      <div className={classnames("w-full relative flex items-center border rounded", {
        "border-gray-300": !hasError,
        "border-red": hasError,
      })}>
        <div className="relative">
          <Listbox value={column.color} onChange={(color:string) => setColor(color)}>
            <Listbox.Button type="button" className="h-full px-4 py-3 outline-none">
              <div
                className="w-4 h-4 rounded-full transition-colors duration-300"
                style={{ backgroundColor: column.color }}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-300"
              enterFrom="translate-x-4 opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition duration-200"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="translate-x-4 opacity-0"
            >
              <Listbox.Options className="ml-2 w-60 absolute z-20 top-1/2 left-full -translate-y-1/2 flex flex-wrap border border-gray-200 bg-white shadow-lg rounded-md overflow-hidden">
                {colors.map((color, index) => (
                  <Listbox.Option key={index} value={color} className="w-1/5 py-3 flex items-center justify-center hover:bg-gray-200 transition duration-200 rounded cursor-pointer">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
        <input
          type="text" 
          className="w-full pl-0 pr-4 py-2.5 bg-transparent text-14 font-medium placeholder:text-gray-300 outline-none"
          value={column.name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {hasError && (
          <p className="mr-4 absolute top-1/2 right-0 -translate-y-1/2 text-14 font-medium text-red">Can't be empty</p>
        )}
      </div>
      <button 
        type="button" 
        className="-mr-4 px-4 py-3"
        onClick={() => deleteColumn()}
      >
        <CrossIcon className={classnames({
          "fill-gray-300": !hasError,
          "fill-red": hasError,
        })} />
      </button>
    </div>
  )
}

const BoardForm = ({
  visible,
  board,
  title,
  submitButtonText,
  close,
  onSubmit,
} : {
  visible: boolean,
  board?: Board,
  title: string,
  submitButtonText: string,
  close: Function,
  onSubmit: Function,
}) => {
  const form = useFormik({
    initialValues: {
      name: board ? board.name : '',
      columns: board ? [...board.columns] : [],
    },
    validationSchema: validate.object().shape({
      name: validate.string().required(),
      columns: validate.array().of(validate.object().shape({
        name: validate.string().required(),
        color: validate.string().required(),
      })),
    }),
    onSubmit: (values:Board, { resetForm }) => {
      onSubmit({
        name: values.name,
        columns: values.columns.map((column:Column, index:number) => {
          return {
            name: column.name,
            color: column.color,
            tasks: column.tasks || [],
          }
        }),
      })
      resetForm()
      close()
    },
  });

  useEffect(() => {
    if (board) {
      form.setFieldValue("name", board.name)
      form.setFieldValue("columns", board.columns)
    }
  }, [board])

  const setBoardName = (name:string) => {
    form.setFieldValue("name", name)
  }

  const addColumn = () => {
    form.setFieldValue("columns", [
      ...form.values.columns,
      { name: "", color: "#6e5dc6" },
    ])
  }

  const deleteColumn = (index: number) => {
    form.setFieldValue("columns", [
      ...form.values.columns.slice(0, index),
      ...form.values.columns.slice(index + 1),
    ]);
    const columns = form.touched.columns as FormikTouched<any>[] || []
    form.setTouched({
      ...form.touched,
      columns: [
        ...columns.slice(0, index),
        ...columns.slice(index + 1),
      ]
    });
  }

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
    <Dialog visible={visible} close={close} className="p-6 md:p-8">
      <form onSubmit={form.handleSubmit}>
        <p className="text-18 font-bold">{title}</p>
        <div className="mt-6">
          <p className="text-12 font-bold text-gray-300">Board Name</p>
          <div className="mt-2 relative">
            <input 
              type="text" 
              className={classnames("w-full px-4 py-2.5 border text-14 font-medium rounded placeholder:text-gray-300 outline-none", {
                "border-gray-300": !nameHasError,
                "border-red": nameHasError,
              })}
              placeholder="e.g. Web Design"
              value={form.values.name}
              onChange={(e) => setBoardName(e.target.value)}
              autoFocus
            />
            {nameHasError && (
              <p className="mr-4 absolute top-1/2 right-0 -translate-y-1/2 text-14 font-medium text-red">Can't be empty</p>
            )}
          </div>
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

            const setColumnColor = (color:string) => {
              const columns = form.values.columns

              form.setFieldValue("columns", [
                ...columns.slice(0, index),
                { ...columns[index], color },
                ...columns.slice(index + 1),
              ])
            }

            return (
              <Column 
                key={index}
                column={column}
                setName={setColumnName}
                setColor={setColumnColor}
                deleteColumn={() => deleteColumn(index)}
                hasError={columnHasError(index)}
              />
            )
          })}
        </div>
        <button 
          type="button" 
          className="relative mt-3 w-full py-2.5 flex justify-center items-center outline-none bg-purple/10 rounded-full"
          onClick={() => addColumn()}
        >
          {/* <div className="absolute w-full h-full bg-purple rounded-full opacity-10" /> */}
          <PlusIcon className="ml-3 w-2 fill-purple" />
          <p className="ml-1 text-14 font-bold text-purple">Add New Column</p>
        </button>
        <button type="submit" className="relative mt-6 w-full py-2.5 flex justify-center items-center bg-purple text-14 font-bold text-white rounded-full">
          {submitButtonText}
        </button>
      </form>
    </Dialog>
  )
}

export default BoardForm