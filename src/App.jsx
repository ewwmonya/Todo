import { data } from '../data'
import { useState } from 'react'


function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState(data.map(item => ({...item, done: false})))
  const [done, setDone] = useState(false)

//    {id: 8847, todoItem: 'Get Milk'}

  const handleClick = (e) => {
    e.preventDefault()
    if(!newTodo) return
    const fakeId = Date.now() % 20;
    const submitedTodo = {id: fakeId, todoItem: newTodo, done: false}
    // console.log(...todoList, submitedTodo);
    setTodoList([...todoList, submitedTodo])
    setNewTodo("")
  }

const trashCan = (id) => {
  const updatedList = todoList.filter((todo)=> todo.id !== id);
  setTodoList(updatedList);
  return
}

const checkBox = (id) => {
  const updatedList = todoList.map(todo => {
    if(todo.id === id) {
      return {...todo, done: !todo.done}
    }
    return todo
  })
  setTodoList(updatedList)
}



  return (
<div className="container">

    <div className="flex gap-x-8 justify-center items-center">
      <h2>Todo</h2>
      <img src="./next-tasks.svg" alt="" className='w-24 h-16'/>
    </div>

    <form className='form' onSubmit={handleClick}>
      <div className="form-row">
      <label htmlFor="todoInput">
        Type A todo
      </label>
      <input type="text" className='form-input' id='todoInput' value={newTodo} onChange={(e)=> setNewTodo(e.target.value)}/>
      </div>
    <button type="submit" className='btn'>Add Todo</button>
    </form>
    <h3>Todos</h3>
    <section className='flex flex-col items-center gap-3.5' style={{fontSize: '2rem'}}>
      {todoList.map((item)=>{
        return (
          <section key={item.id} className={`w-full flex justify-between border-b-indigo-400 border-b-2 pr-5`} >
            <p className={`${item.done ? 'line-through text-green-500' : ''}`}>{item.todoItem}</p>
            <div className='m-3.5 my-64' style={{ display: 'flex', justifyContent: 'center', gap: '30px'}}>
              <button id='delete' type="button" style={{cursor: "pointer"}} onClick={()=> trashCan(item.id)} >🗑️</button>
              <button id='done' type="button" style={{cursor: "pointer"}} onClick={() => {
                checkBox(item.id)} 
              }>
                {item.done ? '✅' : '⬜️'}

              </button>
              </div>
          </section> 
        )
      })}
    </section>
</div>
  )
}

export default App

