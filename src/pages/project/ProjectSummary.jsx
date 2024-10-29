import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()

  function handleClick() {
    deleteDocument(project.id)
    history.push('/')
  }

  return (
    <div className="project-summary">
      <h2 className="prage-title">{project.name}</h2>
      <p className="due-date">
        Proyect due by {project.dueDate.toDate().toDateString()}
      </p>
      <p className="details">{project.details}</p>
      <h4>Project is assiggned to:</h4>
      {project.assignedUsersList?.map((user) => (
        <div key={user.id}>
          <Avatar src={user.photoURL} />
        </div>
      ))}
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Completed
        </button>
      )}
    </div>
  )
}

export default ProjectSummary
