import { useState } from 'react'

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
]

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  return (
    <div className="project-filter">
      <nav>
        <p>Fitler by:</p>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => changeFilter(filter)}
            className={currentFilter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilter
