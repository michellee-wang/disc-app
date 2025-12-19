function Loading() {
  return (
    <main>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading profiles...</p>
        <p className="loading-subtext">The server might be waking up which can take up to 5 minutes</p>
      </div>
    </main>
  );
}

export default Loading;

