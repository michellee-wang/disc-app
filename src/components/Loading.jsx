import { ClipLoader } from 'react-spinners';

function Loading() {
  return (
    <main>
      <div className="loading-container">
        <ClipLoader color="#8319f9" size={60} />
        <p className="loading-text">Loading. . .</p>
      </div>
    </main>
  );
}

export default Loading;

