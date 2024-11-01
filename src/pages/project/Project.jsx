import { useParams } from 'react-router-dom'

import { useDocument } from '../../hooks/useDocument'

import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

import './Project.css'

const Project = () => {
  const { id } = useParams()
  const { error, document } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  )
}

export default Project
