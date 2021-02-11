import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const persons = {
  humans:[{id:1,name:'David'}],
  superheroes:[{id:2,name:'Superman'}],
  stars:[{id:3,name:'Fluffy'}],
}

function App() {
  const [users, setUsers] = useState([
    {id: '', name: ''},
  ])
  React.useEffect(()=>{
    setUsers(
      Object
        .values(persons)
        .reduce(
            (acc,person)=>[...acc, ...person],
            [],
          ),
         )
    console.log(Object.values(persons))
    console.log(Object.keys(persons))
    console.log(Object.entries(persons))
  },[])
  console.log('refreshing component')
  const newUser = name=>({id:uuidv4(),name})
  const handleAddSubmit =(e)=>{
    e.preventDefault()
    const name= e.target.name.value
    setUsers([...users, newUser(name)])
    e.target.name.value=""
  }
  const handleFilterSubmit = (e)=>{
    e.preventDefault()
    const filterName = e.target.filter.value
    const newUser=users.filter((user) => user.name===filterName)
    setUsers(newUser)
  }
const handleSendToLast= e=>{
    e.preventDefault()
    const sendToLastName = e.target.sendToLast.value
    const oldUsersWithoutFiltered = users.filter((user) => user.name !== sendToLastName)
    setUsers([
      ...oldUsersWithoutFiltered,
      newUser(sendToLastName), 
      newUser(sendToLastName)
    ])
  }
  return (
    <div className="App">
      <pre>{JSON.stringify(users,null,2)}</pre>
      <ul>
        {users.map((user,index)=>(
          <li key={user.id}>
            {user.name} es mi usuario #{index+1}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddSubmit}>
        <label to="name">Add element</label>
        <input type="text" name="name" />
      </form>
      <form onSubmit={handleFilterSubmit}>
        <label to="filter">Filter</label>
        <input type="text" name="filter" />
      </form>
      <form onSubmit={handleFilterSubmit}>
        <label to="filter">Filter</label>
        <input type="text" name="filter" />
      </form>
      <form onSubmit={handleSendToLast}>
        <label to="sendToLast">Send to Last</label>
        <input type="text" name="sendToLast" />
      </form>
    </div>
  );
}

export default App;
