import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {useState, useEffect} from 'react'
import UsersTable, {keySourceOptions} from './UsersTable'
import clsx from 'clsx'
import './styles.css'

function App() {
  const [currentKeySourceId, setCurrentKeySourceId] = useState(
    keySourceOptions[0].id,
  )

  useEffect(() => {
    const idFromHash = window.location.hash.slice(1)
    const keySourceById = keySourceOptions.find(item => item.id === idFromHash)
    if (keySourceById) {
      setCurrentKeySourceId(idFromHash)
    }
  }, [])

  return (
    <div className="page">
      <h1>
        Demo for issues with different variations of <code>key</code> prop in
        React
      </h1>

      <p>
        React requires to have a unique <code>key</code> prop for each child in
        a list:
      </p>

      <blockquote>
        <p>
          Keys tell React which array item each component corresponds to, so
          that it can match them up later. This becomes important if your array
          items can move (e.g. due to sorting), get inserted, or get deleted. A
          well-chosen key helps React infer what exactly has happened, and make
          the correct updates to the DOM tree.
        </p>
        Source:{' '}
        <a
          href="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
          target="_blank"
          rel="noreferrer"
        >
          Rendering Lists: Keeping list items in order with key
        </a>
      </blockquote>

      <blockquote>
        <b>Rules of keys</b>
        <ul>
          <li>
            Keys must be unique among siblings. However, it's okay to use the
            same keys for JSX nodes in different arrays.
          </li>
          <li>
            Keys must not change or that defeats their purpose! Don't generate
            them while rendering.
          </li>
        </ul>
        Source:{' '}
        <a
          href="https://react.dev/learn/rendering-lists#rules-of-keys"
          target="_blank"
          rel="noreferrer"
        >
          Rendering Lists: Rules of keys
        </a>
      </blockquote>

      <p>
        So if we have a <i>static</i> list, we probably can use almost any
        approach including index but the recommended approach is to use{' '}
        <code>item.id</code>.
      </p>

      <p>
        And if we have a list which will be updated <i>dynamically</i>, we
        should choose key prop values very carefully, because if React can't
        detect properly which element should be updated, it could update
        something unexpected.
      </p>

      <p>
        Below you can find some examples of how different <code>key</code>{' '}
        values could affect rendering of dynamic list.
      </p>

      <h2>How to check:</h2>
      <p>
        Add note to the first text field and click <b>Add New User</b> button
      </p>

      <h2>
        What results are expected for different <code>key</code> prop values?
      </h2>
      <dl>
        <dt>
          <code>uuidv4()</code>
        </dt>
        <dd>
          The first text field will be cleared every time because it breaks the
          rule:
          <blockquote>
            Keys must not change! Don't generate them while rendering.
          </blockquote>
        </dd>
        <dt>
          <code>index</code>
        </dt>
        <dd>
          Text value will be stored in a wrong item because after adding new
          item indexes will be changed
        </dd>
        <dt>
          <code>item.id</code>
        </dt>
        <dd>
          List works properly if all item ids are unique otherwise React will
          try to multiply duplicated items on every list update
        </dd>
        <dt>
          <code>item.id + index</code>
        </dt>
        <dd>
          React won't try to multiply duplicated items on every list update but
          text values will be cleared because after adding new item indexes will
          be changed so keys will always be new
        </dd>
      </dl>
      <ul className="tabs">
        {keySourceOptions.map(keySourceOption => (
          <li className="tab" key={keySourceOption.id}>
            <a
              href={`#${keySourceOption.id}`}
              className={clsx(
                'tab__link',
                currentKeySourceId === keySourceOption.id &&
                  'tab__link--current',
              )}
              onClick={() => setCurrentKeySourceId(keySourceOption.id)}
            >
              {keySourceOption.name}
            </a>
          </li>
        ))}
      </ul>
      {keySourceOptions.map(keySourceOption => (
        <UsersTable
          key={keySourceOption.id}
          keySourceOption={keySourceOption}
          className={clsx(
            currentKeySourceId !== keySourceOption.id && 'hidden',
          )}
        />
      ))}

      <footer>
        <a
          href="https://github.com/yoksel/react-keys-demo/"
          target="_blank"
          rel="noreferrer"
        >
          Project on Github
        </a>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
