import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://disc-users-api.onrender.com';

const SPOTIFY_CLIENT_ID = 'e3f801a24a46466399e47cc1b07a8b2c'; //this is fine if it's public
const SPOTIFY_REDIRECT_URI = 'https://disc-app-five.vercel.app/discover'; // vite must be running on 127.0.0.1:5173
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_SCOPES = 'user-top-read';

function Signup() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [spotifyCode, setSpotifyCode] = useState(null);
  const hasProcessedCode = useRef(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      setError('You must authorize Spotify to sign up.');
      return;
    }
    
    // strictMode protection
    if (code && !hasProcessedCode.current) {
      hasProcessedCode.current = true;
      setSpotifyCode(code);
      setLoading(true);
      
      // getting the user data from localStorage that we saved before Spotify redirect
      const pendingSignup = localStorage.getItem('pendingSignup');
      
      if (pendingSignup) {
        const userData = JSON.parse(pendingSignup);
        completeSignupWithSpotify(userData, code);
      } else {
        setError('Session expired. Please fill out the form and sign up again.');
        setLoading(false);
      }
    }
  }, [searchParams]);


  // limiting profile picture size because supabase can't handle large images
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { 
        setError('Image must be smaller than 1MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const completeSignupWithSpotify = async (userData, code) => {
    setLoading(true);
    
    try {
      const spotifyResponse = await fetch(`${API_BASE_URL}/spotify/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const spotifyData = await spotifyResponse.json();
      
      if (!spotifyResponse.ok) {
        throw new Error(spotifyData.error || 'Failed to connect Spotify');
      }

      // now create account with Spotify top artists
      const signupData = { 
        ...userData,
        topArtists: spotifyData.topArtists || []
      };

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const usersResponse = await fetch(`${API_BASE_URL}/users`);
      if (usersResponse.ok) {
        const allUsers = await usersResponse.json();
        const fullProfile = allUsers.find(u => 
          u.email && userData.email && 
          u.email.toLowerCase() === userData.email.toLowerCase()
        );
        
        if (fullProfile) {
          login(fullProfile, data.session);
        } else {
          const userToStore = {
            ...(data.user || {}),
            ...userData,
            topArtists: spotifyData.topArtists
          };
          login(userToStore, data.session);
        }
      } else {
        const userToStore = {
          ...(data.user || {}),
          ...userData,
          topArtists: spotifyData.topArtists
        };
        login(userToStore, data.session);
      }
      
      localStorage.removeItem('pendingSignup');
      navigate('/discover');
    } catch (err) {
      setError(err.message);
      localStorage.removeItem('pendingSignup');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const signupData = { 
      email, 
      password, 
      firstName,
      lastName,
      bio,
      major,
      graduationYear: parseInt(graduationYear),
      profilePicture
    };

    try {
      // save signup data to localStorage 
      localStorage.setItem('pendingSignup', JSON.stringify(signupData));
      
      //redirecting to spotify oauth
      const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: SPOTIFY_SCOPES,
      });

      window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="signup-section">
        <h1 className="signup-title">
          Join <span className="gradient-text-purple">Muse</span>
        </h1>
        <form onSubmit={handleSignup} className="signup-form">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              required
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="major">Major</label>
            <input
              id="major"
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              placeholder="What are you studying?"
            />
          </div>
          <div>
            <label htmlFor="graduationYear">Graduation Year</label>
            <input
              id="graduationYear"
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              required
              placeholder="2029"
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="signup-file-input"
            />
            {profilePicture && (
              <img 
                src={profilePicture} 
                alt="Preview" 
              />
            )}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

