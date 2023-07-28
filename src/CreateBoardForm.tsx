import BoardForm from "./BoardForm"

const CreateBoardForm = ({
  visible,
  close,
  createBoard,
} : {
  visible: boolean,
  close: Function,
  createBoard: Function,
}) => {
  return (
    <BoardForm
      visible={visible}
      close={close}
      onSubmit={createBoard}
      title="Add New Board"
      submitButtonText="Create New Board"
    />
  )
}

export default CreateBoardForm