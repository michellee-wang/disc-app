import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/ProfileCard';
import Loading from '../components/Loading';

const API_BASE_URL = 'https://disc-users-api.onrender.com/';

function Saved() {
  const { user: currentUser } = useAuth();
  const [savedUsers, setSavedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedUsers = async () => {
      if (!currentUser || !currentUser.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/${currentUser.id}/saved`);
        if (response.ok) {
          const data = await response.json();
          setSavedUsers(data);
        } else {
          console.error('Failed to fetch saved users');
        }
      } catch (error) {
        console.error('Error fetching saved users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedUsers();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="discover-section">
        <h1>Saved Users</h1>
      </section>

      <div className="profiles-grid">
        {savedUsers.length > 0 ? (
          savedUsers.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              showSaveButton={false}
              showUserInformation={true}
            />
          ))
        ) : (
          <p className="no-results">No saved users yet. Start discovering!</p>
        )}
      </div>
    </main>
  );
}

export default Saved;

