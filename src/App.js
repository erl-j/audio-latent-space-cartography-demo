import logo from './logo.svg';
import './App.css';
import pointData from './pointData.js';
import React from 'react';
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
  "vocal": "🗣",
  "mallet": "🔨",
  "string": "🎻",
  "flute": "🪄",
}


function App() {

  const [showLabels, setShowLabels] = React.useState(false);



  return (
    <div className="App">
      <h1>Audio Latent Space Cartography Demo</h1>
      <p>Click on a point to hear it</p>
      <button

        onClick={
          () => {
            setShowLabels(!showLabels)
          }
        }
      >{!showLabels ? "Show audio labels" : "Hide audio labels"}</button>
      <div style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", display: "inline-block", height: "99vh" }}>
          <img src="./map.png" style={{ height: "100%", opacity: showLabels ? 0.1 : 1 }}></img>
          {pointData.map((point, pi) => {
            return <div key={pi}
              onClick={() => {
                // play audio
                console.log("play audio", point)
                const audio = new Audio(point.metadata.filepath.replace("./data/nsynth/nsynth-test", process.env.PUBLIC_URL));
                // lower volume
                audio.volume = 0.1;
                audio.play();
                console.log("hello")
              }}
              style={{
                width: showLabels ? 0 : 20,
                height: showLabels ? 0 : 20,
                borderRadius: 100,
                backgroundColor: "lightgray",
                boxShadow: "10px 10px 10px black",
                cursor: "pointer", position: "absolute",
                left: c2p(point.y) * 100 + "%",
                top: 100 - c2p(point.x) * 100 + "%",
                color: "grey", fontSize: 25,
                lineHeight: "-50%"
              }}>{showLabels ? family2emoji[point.metadata.instrument_family_str] : ""}</div>
          })}

        </div>
        {showLabels &&
          <div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <h3>Legend</h3 >
              {Object.keys(family2emoji).map((family) => {
                return <div style={{ display: "flex", flexDirection: "row", fontSize: 30 }}>
                  <div>{family2emoji[family]}   {family}</div>
                </div>
              })}
            </div>

          </div>}
      </div >
    </div>
  );
}

export default App;
