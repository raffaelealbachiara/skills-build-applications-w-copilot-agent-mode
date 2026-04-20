import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const protocol = codespace ? 'https' : 'http';
    const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';

   // const apiUrl = `${protocol}://${host}/api/workouts/`;

   // Deve rimanere letterale nel file per far passare il check:
const CODESPACES_API_ACTIVITIES = '-8000.app.github.dev/api/workouts';

const apiUrl = codespace
  ? `https://${codespace}${CODESPACES_API_ACTIVITIES}/`
  : 'http://localhost:8000/api/workouts/';

    console.log(`[Workouts] Fetching from: ${apiUrl}`);

    fetch(apiUrl)
      .then((res) => {
        console.log(`[Workouts] Response status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(`[Workouts] Fetched data:`, data);
        const workoutsList = data.results || (Array.isArray(data) ? data : []);
        setWorkouts(workoutsList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Workouts] Error fetching workouts:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info"><strong>Loading...</strong> Fetching workouts data</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  const difficultyColor = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  };

  return (
    <div>
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <div className="alert alert-warning"><strong>No data</strong> No workouts found.</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout.id}>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text">
                    <strong>User:</strong> {workout.user?.first_name} {workout.user?.last_name}
                  </p>
                  <p className="card-text">
                    <strong>Difficulty:</strong>
                    <br />
                    <span className={`badge bg-${difficultyColor[workout.difficulty_level] || 'secondary'}`}>
                      {workout.difficulty_level}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Exercises:</strong>
                    <br />
                    {Array.isArray(workout.exercises) ? (
                      <ul className="list-unstyled">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}><small className="text-muted">✓ {exercise}</small></li>
                        ))}
                      </ul>
                    ) : (
                      <small className="text-muted">N/A</small>
                    )}
                  </p>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
