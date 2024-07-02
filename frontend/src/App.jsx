import { useState, useEffect } from "react"
import Note from "./components/Note"
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMesage] = ('')

  useEffect(() => {    
    noteService      
      .getAll()
      .then(initialNotes => {        
        setNotes(initialNotes)      
      })  
  }, [])  

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {     
      setErrorMesage(
        `Note ${note.content} was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))})
  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {   
     event.preventDefault()    
     const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1 + ""
     }
   

     noteService
     .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {   
     console.log(event.target.value)   
      setNewNote(event.target.value) 
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button className="bg-blue-500 p-1 rounded-md" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul className="m-5">
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
        className="bg-slate-400 rounded-md p-1 placeholder:text-slate-900 mt-3"
        placeholder="Note" 
        value={newNote}
        onChange={handleNoteChange}
        />        
        <button className="bg-orange-500 p-1 rounded-md" type="submit">save</button>
      </form>
    </div>
  )
}

export default App