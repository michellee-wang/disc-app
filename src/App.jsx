import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'

function App() {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All Majors');
  const [selectedGraduationYear, setSelectedGraduationYear] = useState('All Graduation Years');
  const [connectedProfiles, setConnectedProfiles] = useState([]);

  // Sample profile data
  const profiles = [
    {
      id: 1,
      firstName: 'Michelle',
      lastName: 'Wang',
      email: 'michelle.wang@example.edu',
      major: 'Computer Science & Industrial Engineering',
      bio: '"I love listening to literally anything from kanye West to country music like Zach Bryan & I love playing tennis and pickleball!"',
      graduationYear: '2029',
      image: 'https://i.postimg.cc/V6BpdL90/profile-Picture.png',
      // this data is from spotify api
      topArtists: ['keshi', 'billie eilish', 'daniel caesar'],
    },
  ];

  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter(profile => {
    // searches by name and bio
    
    // since first and last name are separate, we need to combine them
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         profile.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = selectedMajor === 'All Majors' || profile.major.includes(selectedMajor);
    const matchesGraduationYear = selectedGraduationYear === 'All Graduation Years' || profile.graduationYear === selectedGraduationYear;
    
    return matchesSearch && matchesMajor && matchesGraduationYear;
  });

  // once you click connect that profile will be added to the connectedProfiles array 
  // then the button will say connected and can't be clicked again
  const handleConnect = (profileId) => {
    setConnectedProfiles(prev => 
      prev.includes(profileId) ? prev : [...prev, profileId]
    );
  };

  // useEffect to log state changes (requirement for disc project)
  useEffect(() => {
    console.log('Connected profiles updated:', connectedProfiles);
    console.log('Number of connections:', connectedProfiles.length);
  }, [connectedProfiles]);

  // Additional useEffect for search
  useEffect(() => {
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
      console.log('Results found:', filteredProfiles.length);
    }
  }, [searchQuery, filteredProfiles.length]);

  return (
    <>
    
      <NavBar />
      <main>
        <section className="discover-section">
          <h1>Discover</h1>
          
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

         
            <div className="dropdown">
              <select 
                value={selectedMajor} 
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                {/* getAllUsers will be used to get an array or hashmap of all majors this is a temporary placeholder*/}
                <option>All Majors</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Music</option>
                <option>Psychology</option>
                <option>Communications</option>
              </select>
            </div>

            <div className="dropdown">
              <select 
                value={selectedGraduationYear} 
                onChange={(e) => setSelectedGraduationYear(e.target.value)}
              >
                <option>All Graduation Years</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
              </select>
            </div>
          </div>
        </section>

        <div className="profiles-grid">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isConnected={connectedProfiles.includes(profile.id)}
              onConnect={handleConnect}
            />
          ))}
          {filteredProfiles.length === 0 && (
            <p className="no-results">No profiles found. Try adjusting your filters!</p>
          )}
        </div>
      </main>

      <footer>
        <img src="https://i.postimg.cc/sX9qvDP1/DISC-Project-Muse.png" alt="Muse Logo" />
        <p>Connecting students through the power of music.</p>
      </footer>
    </>
  )
}

export default App
