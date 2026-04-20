import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const protocol = codespace ? 'https' : 'http';
    const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';

    const apiUrl = `${protocol}://${host}/api/users/`;

    console.log(`[Users] Fetching from: ${apiUrl}`);

    fetch(apiUrl)
      .then((res) => {
        console.log(`[Users] Response status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(`[Users] Fetched data:`, data);
        const usersList = data.results || (Array.isArray(data) ? data : []);
        setUsers(usersList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Users] Error fetching users:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info"><strong>Loading...</strong> Fetching users data</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>👤 Users</h2>
      {users.length === 0 ? (
        <div className="alert alert-warning"><strong>No data</strong> No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Total Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.first_name} {user.last_name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    {user.team?.name && (
                      <span className="badge bg-info">{user.team.name}</span>
                    )}
                  </td>
                  <td><strong className="text-success">{user.total_points}</strong></td>
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

export default Users;
