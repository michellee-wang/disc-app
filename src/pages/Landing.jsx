import { Link } from 'react-router-dom'
import CardExample from '../assets/DISC Project Group 1 (1).png'
import taylorSwiftPhoto from '../assets/DISC Project Image 1.png'
import headphones from '../assets/DISC Project Frame.png'
import musicNote from '../assets/Vector from DISC Project.png'

function Landing() {

  return (
    <div className="landing-page">
      <section className="hero-section">
        <img src={headphones} alt="Headphones" className="headphones-icon" />
        <h1 className="hero-title">
          Find your <span className="gradient-text">music</span><br />
          <span className="gradient-text-purple">soulmate</span>
        </h1>
        <p className="hero-subtitle">stop connecting on looks. connect on vibe</p>
        <img src={musicNote} alt="Music note" className="music-note-icon" />
      </section>

      <section className="welcome-section">
        <h2 className="welcome-title">
          welcome to <img className="muse-logo" src="https://i.postimg.cc/qRf5GrN5/DISC-Project-Muse-(1).png" alt="Muse Logo" />
        </h2>
        <p className="welcome-subtitle">skip the small talk. . .</p>
        <p className="welcome-tagline">just pick up an earbud</p>
      </section>

      <section className="discover-preview-section">
        <div className="discover-text">
          <h2 className="discover-title">
            Discover people who<br />
            <span className="gradient-text-purple">listen like you.</span>
          </h2>
          <p className="discover-subtitle">
            There's someone on campus who<br />
            shares your vibe.
          </p>
        </div>
        <div className="profile-preview">
          <img src={CardExample} alt="Profile preview" className="profile-card-image" />
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to find your match?</h2>
        <div className="cta-content">
          
          <Link to="/discover" className="cta-button">
          {/* &lt;3 is a less than sign*/}
            join muse &lt;3
          </Link>
          <img src={taylorSwiftPhoto} alt="Taylor Swift" className="taylor-swift-photo" />
        </div>
      </section>
    </div>
  );
}

export default Landing;

