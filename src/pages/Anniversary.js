import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NAME = "Hoang Cong Tung";

export default function Anniversary() {
  const [songPlaying, setSongPlaying] = useState(false);
  const audioRef = useRef(null);
  const songStarted = useRef(false);

  // Auto-play the song when the page loads
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !songStarted.current) {
      songStarted.current = true;
      audio.play().then(() => setSongPlaying(true)).catch(() => {});
    }
  }, []);

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (songPlaying) {
      audio.pause();
      setSongPlaying(false);
    } else {
      audio.play().then(() => setSongPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="anniversary-page">
      <div className="wrap">
        <header className="top" id="top">
          <div className="brand">{NAME}</div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/anniversary">Anniversary</Link>
          </nav>
        </header>

        <section className="anniversary anniversary-full">
          <div className="wrap anniversary-inner">
            <div className="anniversary-text">
              <h2>Love Anniversary</h2>
              <p className="anniversary-names">
                <span className="name">Hoang Cong Tung</span>
                <span className="amp">&amp;</span>
                <span className="name">Le Thi Thu Thao</span>
              </p>
              <p className="anniversary-dates">
                16 Feb 2022 &nbsp;→&nbsp; 16 Feb 2026
              </p>
              <p className="anniversary-message">
                Every day with you is a gift. Here's to us, to the moments we've shared,
                and to all the ones still to come.
              </p>
              <button className="btn play-song" onClick={toggleSong}>
                {songPlaying ? "❚❚ Pause" : "♪ Play"} "You Are The Reason"
              </button>
            </div>
            <div className="anniversary-visual">
              <div className="heart" aria-hidden="true">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <path
                    d="M50 88 C20 60 5 40 5 25 C5 10 18 5 30 5 C40 5 48 12 50 18 C52 12 60 5 70 5 C82 5 95 10 95 25 C95 40 80 60 50 88 Z"
                    fill="var(--accent)"
                  />
                </svg>
              </div>
              <div className="floating-hearts" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="float-heart"
                    style={{
                      left: `${10 + i * 15}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${3 + i * 0.5}s`,
                    }}
                  >
                    ♥
                  </span>
                ))}
              </div>
            </div>
          </div>
          <audio
            ref={audioRef}
            src="/song.m4a"
            loop
            preload="auto"
          />
        </section>

        <footer className="foot">
          <div>
            <small>© {new Date().getFullYear()} {NAME}</small>
          </div>
        </footer>
      </div>
    </div>
  );
}
