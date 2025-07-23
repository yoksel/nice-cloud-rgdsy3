import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import clsx from 'clsx'

export const keySourceOptions = [
  {id: 'uuidv4', name: 'uuidv4()'},
  {id: 'index', name: 'index'},
  {id: 'item-id', name: 'item.id'},
  {id: 'item-id-and-index', name: 'item.id + index'},
]

export const getRandomId = () => Math.ceil(Math.random() * 100000)

const getInitialUsers = () => [
  {
    name: 'Old user 1',
    id: getRandomId(),
  },
  {
    name: 'Old user 2',
    id: getRandomId(),
  },
]

const UsersTable = ({keySourceOption = keySourceOptions[0], className}) => {
  const [userList, setList] = useState(getInitialUsers())
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [newUserCounter, setNewUserCounter] = useState(0)
  const [nonUniqueIds, setNonUniqueIds] = useState(new Set())

  const addItem = () => {
    const userCounter = newUserCounter + 1
    const newItem = {
      name: `New user ${userCounter}`,
      id: getRandomId(),
    }
    setList(items => [newItem, ...items])
    setNewUserCounter(userCounter)
  }

  const reset = () => {
    setList(() => getInitialUsers())

    if (keySourceOption.id !== 'item-id') return

    const getUniqueIds = Array.from(new Set(userList.map(item => item.id)))

    if (getUniqueIds.length !== userList.length) {
      setShowErrorMessage(true)
    }
  }

  const addDuplicatedItem = () => {
    setNonUniqueIds(items => items.add(userList[0].id))
    setList(items => [userList[0], ...items])
  }

  const getKey = useCallback(
    (index, id) => {
      if (keySourceOption.id === 'uuidv4') return uuidv4()
      if (keySourceOption.id === 'index') return index
      if (keySourceOption.id === 'item-id') return id
      if (keySourceOption.id === 'item-id-and-index') return `${id}-${index}`
    },
    [keySourceOption],
  )

  return (
    <div className={clsx(className, 'user-table-container')}>
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
                  <div
                    className={clsx(
                      'key',
                      nonUniqueIds.has(key) && 'key--non-unique',
                    )}
                  >
                    {key}
                  </div>
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

      {showErrorMessage && (
        <div className="error-message">
          Reset does not work for list with duplicated values. Reload the page
          to update list.
        </div>
      )}

      <div className="buttons">
        <button onClick={addItem} className="button button--add">
          Add New User
        </button>{' '}
        <button onClick={reset} className="button button--reset">
          Reset
        </button>
      </div>
      {['item-id', 'item-id-and-index'].includes(keySourceOption.id) && (
        <div>
          <button
            onClick={addDuplicatedItem}
            className="button button--duplicate"
          >
            Duplicate User
          </button>{' '}
          — click button to see behavior for list with not unique ids
        </div>
      )}
    </div>
  )
}

export default UsersTable
