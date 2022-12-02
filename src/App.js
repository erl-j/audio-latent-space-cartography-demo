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

const mapName2url = {
  "3D rendered Music Instruments": "maps/map.png",
  "Magritte Music Instruments": "maps/magritte_map.png",
  "Mushroom mode": "maps/mushroom_map.png",
  "Christmas ornaments": "maps/christmas_map.png",
  "Neon lights":"maps/neon_map.png",
  "Flowers":"maps/flowers_map.png"
}
function App() {

  const [showLabels, setShowLabels] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState("3D render");

  return (
    <div style={{ width: "100vw", height: "100vh", flex: "column", flexDirection: "column" }}>
      <div style={{ margin: 32 }}>
        <h1>Audio Latent Space Cartography Demo</h1>
        <p>Click on a point to hear it. Select a latent map style in the dropdown. Legend appears at the bottom of the page when labels are shown.</p>
        <label>
          Latent map style :
          <select type="select" value={selectedMap} onChange={(e) => setSelectedMap(e.target.value)}>
            {
              Object.keys(mapName2url).map((name) => {
                return <option  key={ name }value={name}>{name}</option>
              })
            }
          </select>
        </label>
        <br></br>
        <button
          onClick={
            () => {
              setShowLabels(!showLabels)
            }
          }
        >{!showLabels ? "Show audio labels" : "Hide audio labels"}</button>



      </div>
      <div style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>

        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={ process.env.PUBLIC_URL+"/"+mapName2url[selectedMap]} style={{ maxHeight: "100vh", maxWidth: "98vw", opacity: showLabels ? 0.1 : 1 }}></img>
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
                width: showLabels ? 0 : "1.5vh",
                height: showLabels ? 0 : "1.5vh",
                borderRadius: 100,
                backgroundColor: "lightgray",
                boxShadow: "0px 0px 3px 1px black",
                cursor: "pointer", position: "absolute",
                left: c2p(point.y) * 100 + "%",
                top: 100 - c2p(point.x) * 100 + "%",
                color: "grey", fontSize: 25,
                lineHeight: "-50%"
              }}>{showLabels ? family2emoji[point.metadata.instrument_family_str] : ""}</div>
          })}

        </div>

      </div >
      <div>


        <div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", margin: 32 }}>

            {showLabels &&
              <>
                <h3>Legend</h3>
                {Object.keys(family2emoji).map((family) => {
                  return <div style={{ display: "flex", flexDirection: "row", fontSize: 24 }}>
                    <div>{family2emoji[family]}   {family}</div>
                  </div>
                })}
              </>
            }
          </div>
        </div>
      </div >
    </div>
  );
}

export default App;
