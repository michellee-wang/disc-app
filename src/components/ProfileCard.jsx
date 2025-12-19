function ProfileCard({ profile, isConnected, onConnect }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <article className="profile-card">
      <div className="profile-picture">
        <img src={profile.image} alt={`Profile picture of ${fullName}`} />
      </div>
      <div className="card-content">
        <h2>{fullName}</h2>
        <p className="major">{profile.major} • Class of {profile.graduationYear}</p>
        <p className="bio">{profile.bio}</p>
        <h3>TOP ARTISTS</h3>
        <div className="top-artists">
          {profile.topArtists.map((artist, index) => (
            <span key={index}>{artist}</span>
          ))}
        </div>
        <button 
          className={`connect-btn ${isConnected ? 'connected' : ''}`}
          onClick={() => onConnect(profile.id)}
        >
          {isConnected ? '♥ Connected' : '♡ Connect'}
        </button>
      </div>
    </article>
  );
}

export default ProfileCard;

