const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important'
    return (
      <>
      <li className="font-bold">{note.content}</li>
      <button className="bg-red-300 rounded-md p-1" onClick={toggleImportance}>{label}</button>
      </>
    )
  }
  

export default Note