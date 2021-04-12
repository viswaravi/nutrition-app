import IndiaMap from "../../components/indiaMap";
import "./styles.scss";
import * as Data from "../../assets/states.json";
import { useState, useEffect } from "react";

function Home() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    setStates(Data.default);
  }, [Data]);

  return (
    <div className="home-page">
      <div className="states-container">
        {Object.keys(states).map((code) => {
          return (
            <div key={code} className="state-name">
              {states[code]}
            </div>
          );
        })}
      </div>
      <IndiaMap />
    </div>
  );
}

export default Home;
