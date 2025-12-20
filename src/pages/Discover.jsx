import { useState, useEffect } from 'react'
import ProfileCard from '../components/ProfileCard'
import Loading from '../components/Loading'

// const API_BASE_URL = 'https://disc-assignment-5-users-api-iyct.onrender.com';
const API_BASE_URL = 'http://localhost:3001';

// NOTE: Random artist generation commented out - now fetching from database
// const TOP_ARTISTS = [
//   'Taylor Swift', 'Drake', 'Bad Bunny', 'The Weeknd', 'Ariana Grande',
//   'Billie Eilish', 'Ed Sheeran', 'Post Malone', 'Travis Scott', 'Dua Lipa',
//   'Olivia Rodrigo', 'Harry Styles', 'Justin Bieber', 'SZA', 'Morgan Wallen',
//   'Kanye West', 'Eminem', 'Rihanna', 'BTS', 'Doja Cat',
//   'Kendrick Lamar', 'Bruno Mars', 'Adele', 'Lady Gaga', 'Selena Gomez',
//   'Shawn Mendes', 'J. Cole', 'Cardi B', 'Lil Baby', 'Tyler, The Creator',
//   'Frank Ocean', 'Daniel Caesar', 'Keshi', 'Sabrina Carpenter', 'Chappell Roan',
//   'Zach Bryan', 'Noah Kahan', 'Hozier', 'Beyoncé', 'Metro Boomin',
//   '21 Savage', 'Future', 'Lana Del Rey', 'Arctic Monkeys', 'The Neighbourhood',
//   'Mac Miller', 'Childish Gambino', 'Khalid', 'Rex Orange County', 'PARTYNEXTDOOR'
// ];

// function getRandomArtists() {
//   const shuffled = [...TOP_ARTISTS].sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, 3);
// }

function Discover() {
  // state management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All Majors');
  const [selectedGraduationYear, setSelectedGraduationYear] = useState('All Graduation Years');
  const [connectedProfiles, setConnectedProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableMajors, setAvailableMajors] = useState([]);
  const [availableGraduationYears, setAvailableGraduationYears] = useState([]);

  // when the component mounts, uses the api to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        
        // const response = await fetch(`${API_BASE_URL}/api/users`);
        const response = await fetch(`${API_BASE_URL}/users`);

        const data = await response.json();
        
        // database includes topp artists for each user
        // const usersWithArtists = data.map(user => ({
        //   ...user,
        //   topArtists: getRandomArtists()
        // }));
        
        setProfiles(data);
        
        // extract the majors from the fetched users for filtering dropdown
        const majors = [...new Set(data.map(user => user.major).filter(major => major))];
        setAvailableMajors(majors.sort());
        
        // extract the graduation years from the fetched users for filtering dropdown
        const years = [...new Set(data.map(user => user.graduationYear).filter(year => year && year !== 'undefined' && year !== 'null'))];
        setAvailableGraduationYears(years.sort((a, b) => Number(a) - Number(b)));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter(profile => {
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         profile.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = selectedMajor === 'All Majors' || profile.major === selectedMajor;
    const matchesGraduationYear = selectedGraduationYear === 'All Graduation Years' || 
                                  profile.graduationYear == selectedGraduationYear;
    
    return matchesSearch && matchesMajor && matchesGraduationYear;
  });

  const handleConnect = (profileId) => {
    setConnectedProfiles(prev => 
      prev.includes(profileId) ? prev : [...prev, profileId]
    );
  };

  useEffect(() => {
    console.log('Connected profiles updated:', connectedProfiles);
    console.log('Number of connections:', connectedProfiles.length);
  }, [connectedProfiles]);

  useEffect(() => {
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
      console.log('Results found:', filteredProfiles.length);
    }
  }, [searchQuery, filteredProfiles.length]);

  // Show loading screen
  if (loading) {
    return <Loading />;
  }

  return (
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
              <option>All Majors</option>
              {availableMajors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <select 
              value={selectedGraduationYear} 
              onChange={(e) => setSelectedGraduationYear(e.target.value)}
            >
              <option>All Graduation Years</option>
              {availableGraduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
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
        {filteredProfiles.length === 0 && !loading && (
          <p className="no-results">No profiles found. Try adjusting your filters!</p>
        )}
      </div>
    </main>
  );
}

export default Discover;

