import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {v4 as uuidv4} from 'uuid'
const getRandomId = () => Math.ceil(Math.random() * 100000)

function App() {
  const [userList, setList] = useState([
    {
      name: 'Old user 1',
      id: getRandomId(),
    },
    {
      name: 'Old user 2',
      id: getRandomId(),
    },
  ])

  const addItem = () => {
    const newItem = {
      name: 'New user',
      id: getRandomId(),
    }
    setList((items) => [newItem, ...items])
  }

  return (
    <>
      <p>Add note to the first text field and click 'Add New User'</p>
      <p>
        With any key based on uuidv4() the first text field will be cleared
        every time
      </p>

      <div className="row">
        <div className="col">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>ID</th>
                <th>Name</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => {
                return (
                  // key based on index does not work
                  <tr key={`play-queue-item-${uuidv4()}`}>
                    <td>{index}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={addItem} style={{backgroundColor: 'yellowgreen'}}>
            Add New User
          </button>
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
