import BoardForm from "./BoardForm"

import { Board } from "./App"

const EditBoardForm = ({
  visible,
  close,
  activeBoard,
  updateBoard,
} : {
  visible: boolean,
  activeBoard: Board,
  close: Function,
  updateBoard: Function,
}) => {
  return (
    <BoardForm
      board={activeBoard}
      visible={visible}
      close={close}
      onSubmit={updateBoard}
      title="Edit Board"
      submitButtonText="Save Changes"
    />
  )
}

export default EditBoardForm