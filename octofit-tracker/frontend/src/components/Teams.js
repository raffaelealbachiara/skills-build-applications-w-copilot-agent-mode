import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const protocol = codespace ? 'https' : 'http';
    const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';

    const apiUrl = `${protocol}://${host}/api/teams/`;

    console.log(`[Teams] Fetching from: ${apiUrl}`);

    fetch(apiUrl)
      .then((res) => {
        console.log(`[Teams] Response status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(`[Teams] Fetched data:`, data);
        const teamsList = data.results || (Array.isArray(data) ? data : []);
        setTeams(teamsList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Teams] Error fetching teams:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info"><strong>Loading...</strong> Fetching teams data</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>👥 Teams</h2>
      {teams.length === 0 ? (
        <div className="alert alert-warning"><strong>No data</strong> No teams found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td><strong>{team.name}</strong></td>
                  <td>{team.description || 'N/A'}</td>
                  <td>{new Date(team.created_at).toLocaleDateString()}</td>
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

export default Teams;
