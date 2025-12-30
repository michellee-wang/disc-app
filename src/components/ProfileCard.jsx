function ProfileCard({ profile, isConnected, onConnect, showSaveButton = true, showUserInformation = false }) {
  const fullName = (profile.firstName && profile.lastName) 
    ? `${profile.firstName} ${profile.lastName}` 
    : (profile.firstName || profile.lastName || 'Anonymous User');
  
  const defaultProfilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lvjjRAVDQ-nBDq_4dy1xCyRjjDaHV-Tqcw&s';
  
  return (
    <article className="profile-card">
      <div className="profile-picture">
        <img 
          src={profile.profilePicture || defaultProfilePic} 
          alt={`Profile picture of ${fullName}`} 
          onError={(e) => {
            e.target.src = defaultProfilePic;
          }}
        />
      </div>
      <div className="card-content">
        {profile.spotifyUserId ? (
          <a 
            href={`https://open.spotify.com/user/${profile.spotifyUserId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="profile-name-link"
          >
            <h2>{fullName}</h2>
          </a>
        ) : (
          <h2>{fullName}</h2>
        )}
        <p className="major">
          {profile.major}{profile.graduationYear ? ` • Class of ${profile.graduationYear}` : ''}
        </p>
        <p className="bio">{profile.bio}</p>
        {profile.topArtists && profile.topArtists.length > 0 && (
          <>
            <h3>TOP ARTISTS</h3>
            <div className="top-artists">
              {profile.topArtists.map((artist, index) => {
                const artistData = typeof artist === 'object' ? artist : { name: artist };
                const artistUrl = artistData.id 
                  ? `https://open.spotify.com/artist/${artistData.id}`
                  : `https://open.spotify.com/search/${encodeURIComponent(artistData.name)}`;
                
                return (
                  <a 
                    key={index}
                    href={artistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="artist-link"
                  >
                    <span>{artistData.name || artist}</span>
                  </a>
                );
              })}
            </div>
          </>
        )}
        {showSaveButton && (
          <button 
            className={`connect-btn ${isConnected ? 'connected' : ''}`}
            onClick={() => onConnect(profile.id)}
          >
            {isConnected ? '♥ Saved' : 'Save'}
          </button>
        )}

        {showUserInformation  && (
          <div className="user-information">    
            <p className="user-information-text">
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        )
        }
      </div>
    </article>
  );
}

export default ProfileCard;

