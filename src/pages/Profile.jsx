import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileCard from '../components/ProfileCard';
import Loading from '../components/Loading';

function Profile() {
  const { user: contextUser, updateUser } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [loading, setLoading] = useState(!contextUser);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const savedSession = localStorage.getItem('session');
        
        if (!savedSession || !contextUser) {
          setLoading(false);
          return;
        }
        const currentUser = contextUser;
                const response = await fetch(`http://localhost:3001/users`);
        if (response.ok) {
          const allUsers = await response.json();
          // Find the user in the list by email (case-insensitive)
          const fullProfile = allUsers.find(u => 
            u.email && currentUser.email && 
            u.email.toLowerCase() === currentUser.email.toLowerCase()
          );
          
          if (fullProfile) {
            setUser(fullProfile);
            updateUser(fullProfile);
          } else {
            setUser(currentUser);
          }
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [contextUser, updateUser]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!user) {
    return ( <Loading />)
  }

  return (
    <main>
      <section className="discover-section">
        <h1>Welcome, {user.firstName || 'User'}!</h1>
      </section>

      <ProfileCard profile={user} showSaveButton={false} />
    </main>
  );
}

export default Profile;
 
