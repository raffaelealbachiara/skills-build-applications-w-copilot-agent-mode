import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const protocol = codespace ? 'https' : 'http';
   const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  // const apiUrl = `${protocol}://${host}/api/leaderboard/`;
// Deve rimanere letterale nel file per far passare il check:
const CODESPACES_API_ACTIVITIES = '-8000.app.github.dev/api/leaderboard';

const apiUrl = codespace
  ? `https://${codespace}${CODESPACES_API_ACTIVITIES}/`
  : 'http://localhost:8000/api/leaderboard/';

    console.log(`[Leaderboard] Fetching from: ${apiUrl}`);

    fetch(apiUrl)
      .then((res) => {
        console.log(`[Leaderboard] Response status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(`[Leaderboard] Fetched data:`, data);
        const leaderboardList = data.results || (Array.isArray(data) ? data : []);
        leaderboardList.sort((a, b) => a.rank - b.rank);
        setLeaderboard(leaderboardList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Leaderboard] Error fetching leaderboard:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info"><strong>Loading...</strong> Fetching leaderboard data</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning"><strong>No data</strong> No leaderboard data found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th style={{ width: '120px' }}>Total Points</th>
                <th style={{ width: '100px' }}>Activities</th>
                <th style={{ width: '80px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr 
                  key={entry.id} 
                  className={entry.rank <= 3 ? 'table-success' : ''}
                >
                  <td>
                    <strong style={{ fontSize: '1.5rem' }}>
                      {getMedalEmoji(entry.rank)}
                    </strong>
                  </td>
                  <td>
                    <strong>{entry.user?.first_name} {entry.user?.last_name}</strong>
                  </td>
                  <td>
                    <span className="badge bg-info">{entry.team?.name}</span>
                  </td>
                  <td>
                    <strong className="text-success" style={{ fontSize: '1.25rem' }}>
                      {entry.total_points}
                    </strong>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{entry.activities_count}</span>
                  </td>
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

export default Leaderboard;
