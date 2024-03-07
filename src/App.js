import React, { useState } from "react";

import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { CurrentTime } from "./components/CurrentTime/CurrentTime";

import "./App.scss";

import navigationData from "./data/navigation.json";

function App() {
  const [city, setCity] = useState();
  const [timeZone, setTimeZone] = useState();

  const onCitySelection = (city, timeZone) => {
    setCity(city);
    setTimeZone(timeZone);
  };
  return (
    <div className="app">
      <header className="app__header">
        <NavigationBar
          data={navigationData.cities}
          textField="label"
          valueField="section"
          timeZoneField="timeZone"
          onChange={onCitySelection}
        />
      </header>
      <section className="app__main">
        {city && <CurrentTime city={city} timeZone={timeZone} />}
      </section>
    </div>
  );
}

export default App;
