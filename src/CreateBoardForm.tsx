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
    />
  )
}

export default CreateBoardForm