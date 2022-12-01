import logo from './logo.svg';
import './App.css';
import pointData from './pointData.js';

const FRAME_WIDTH = 512;
const INNER_WIDTH = 3200;

const c2p = (x) => {
  return (x * (INNER_WIDTH) + FRAME_WIDTH) / (INNER_WIDTH + FRAME_WIDTH * 2)
}

const family2emoji = {
  "bass": "🐟",
  "guitar": "🎸",
  "reed": "🎷",
  "brass": "🎺",
  "keyboard": "🎹",
  "organ": "⛪️",
  "voice": "🗣",
  "mallet": "🔨",
  "string": "🎻",
  "flute": "🪄",
}


const SHOW_LABEL = false;
function App() {
  return (
    <div className="App">
      <h1>Audio Latent Space Cartography Demo</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img src="./map.png" style={{ height: "80vh" }}></img>
        {pointData.map((point, pi) => {
          return <div key={pi}
            onClick={() => {
              // play audio
              console.log("play audio", point)
              const audio = new Audio(point.metadata.filepath.replace("./data/nsynth/nsynth-test/audio/", "/"));
              // lower volume
              audio.volume = 0.1;
              audio.play();
              console.log("hello")
            }}
            style={{ width: 10, height: 10, borderRadius: 100, backgroundColor: "turquoise", cursor: "pointer", position: "absolute", left: c2p(point.y) * 100 + "%", top: 100 - c2p(point.x) * 100 + "%", color: "grey", fontSize: 15 }}>{SHOW_LABEL ? family2emoji[point.metadata.instrument_family_str] : ""}</div>
        })}
      </div>
    </div >
  );
}

export default App;
