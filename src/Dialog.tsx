import { Fragment, ReactNode } from "react"
import { Dialog as LibDialog, Transition } from "@headlessui/react"

const Dialog = ({
  className = "",
  visible,
  children,
  close,
} : { 
  className?: string,
  visible: boolean,
  children: ReactNode,
  close: Function,
}) => {
  return (
    <Transition show={visible}>
      <LibDialog onClose={() => close()}>
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
            <LibDialog.Panel as={Fragment}>
              <div className={`w-full max-w-dialog bg-white rounded-md ${className}`}>
                {children}
              </div>
            </LibDialog.Panel>
          </Transition.Child>
        </div>
      </LibDialog>
    </Transition>
  )
}

export default Dialog