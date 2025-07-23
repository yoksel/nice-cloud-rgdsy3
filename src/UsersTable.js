import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

export const keySourceOptions = [
  {id: 'uuidv4', name: 'uuidv4()'},
  {id: 'index', name: 'index'},
  {id: 'item-id', name: 'item.id'},
];

export const getRandomId = () => Math.ceil(Math.random() * 100000)

const UsersTable = ({keySourceOption = keySourceOptions[0], className}) => {
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
    setList(items => [newItem, ...items])
  }

  const getKey = useCallback(
    (index, id) => {
      if (keySourceOption.id === 'uuidv4') return uuidv4()
      if (keySourceOption.id === 'index') return index
      if (keySourceOption.id === 'item-id') return id
    },
    [keySourceOption],
  )

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Key</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => {
            const key = getKey(index, user.id)
            return (
              <tr key={key}>
                <td>{index}</td>
                <td>
                  <div className="key">{key}</div>
                </td>
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

      <button onClick={addItem}>Add New User</button>
    </div>
  )
}

export default UsersTable
