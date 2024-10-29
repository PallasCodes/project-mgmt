import { useEffect, useState } from 'react'

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

import './Dashboard.css'

const Dashboard = () => {
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const { user } = useAuthContext()

  function changeFilter(filter) {
    setCurrentFilter(filter)
  }

  const projects = documents?.filter((doc) => {
    switch (currentFilter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        doc.assignedUsersList?.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return doc.category === currentFilter
      default:
        return true
    }
  })

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard
