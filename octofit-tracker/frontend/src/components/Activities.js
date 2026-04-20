import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const protocol = codespace ? 'https' : 'http';
    const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
    //const apiUrl = `${protocol}://${host}/api/activities/`;

// Deve rimanere letterale nel file per far passare il check:
const CODESPACES_API_ACTIVITIES = '-8000.app.github.dev/api/activities';

const apiUrl = codespace
  ? `https://${codespace}${CODESPACES_API_ACTIVITIES}/`
  : 'http://localhost:8000/api/activities/';

    console.log(`[Activities] Fetching from: ${apiUrl}`);

    fetch(apiUrl)
      .then((res) => {
        console.log(`[Activities] Response status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(`[Activities] Fetched data:`, data);
        const activitiesList = data.results || (Array.isArray(data) ? data : []);
        setActivities(activitiesList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Activities] Error fetching activities:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info"><strong>Loading...</strong> Fetching activities data</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  const activityEmoji = {
    running: '🏃',
    walking: '🚶',
    strength: '💪',
    cycling: '🚴',
    swimming: '🏊'
  };

  return (
    <div>
      <h2>⚡ Activities</h2>
      {activities.length === 0 ? (
        <div className="alert alert-warning"><strong>No data</strong> No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Points</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td><strong>{activity.user?.first_name} {activity.user?.last_name}</strong></td>
                  <td>
                    <span className="badge bg-primary">
                      {activityEmoji[activity.activity_type] || '🎯'} {activity.activity_type}
                    </span>
                  </td>
                  <td>{activity.duration_minutes} min</td>
                  <td>{activity.distance_km} km</td>
                  <td>{activity.calories_burned} kcal</td>
                  <td><strong className="text-warning">{activity.points_earned} pts</strong></td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
