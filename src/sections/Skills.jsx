import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SELECTED_WORK } from '../data/projects.js';

export default function Skills() {
  return (
    <div id="skills" className="capabilities">
      <h3 className="quiet-label" data-section-title tabIndex={-1}>
        Capabilities in practice
      </h3>
      <ul>
        {SELECTED_WORK.map((project) => (
          <li key={project.id}>
            <Link to={`/case-study/${project.id}`} state={{ entry: 'capabilities' }}>
              <strong>{project.discipline}</strong>
              <span>{project.name}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
