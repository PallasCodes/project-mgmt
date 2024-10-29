import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  const history = useHistory()
  const { documents, errors } = useCollection('users')
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [users, setUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => ({
        label: user.displayName,
        value: user,
        id: user.id,
      }))
      setUsers(options)
    }
  }, [documents])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }
    if (!assignedUsers.length) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }

    const assignedUsersList = assignedUsers.map((user) => ({
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      id: user.value.id,
    }))

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    }

    console.log(project)

    await addDocument(project)
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Details:</span>
          <textarea
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            required
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(options) => setAssignedUsers(options)}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create
