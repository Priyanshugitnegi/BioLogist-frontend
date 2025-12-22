// src/components/Team.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/team/')
      .then(res => {
        console.log("Team API:", res.data);
        setTeam(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Team API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section">
      <h1 className="page-title">Meet Our Team</h1>
      <p className="page-text">Experts in genomics, proteomics, and biotech innovation.</p>

      {loading ? (
        <p className="center">Loading team...</p>
      ) : team.length > 0 ? (
        <div className="grid">
          {team.map(member => (
            <div key={member.id} className="card">
              {member.photo ? (
                <img src={member.photo} alt={member.name} />
              ) : (
                <div className="no-image">No Photo</div>
              )}
              <div className="card-body">
                <h3 className="card-title">{member.name}</h3>
                <p className="card-desc">{member.role}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="center">No team members yet. Add in Admin!</p>
      )}
    </section>
  );
}