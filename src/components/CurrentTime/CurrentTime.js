import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./CurrentTime.scss";

const TIME_UPDATE_INTERVAL_MS = 1000;
export const CurrentTime = ({
  city,
  timeZone,
  locales = "en-US",
  dateStyle = "full",
  timeStyle = "long",
}) => {
  const [currentDate, setCurrentDate] = useState(null);

  const setDate = useCallback(() => {
    const date = new Date();
    const cityDate = new Intl.DateTimeFormat(locales, {
      dateStyle,
      timeStyle,
      timeZone,
    }).format(date);
    setCurrentDate(cityDate);
  }, [setCurrentDate, locales, timeZone, dateStyle, timeStyle]);

  useEffect(() => {
    setDate();

    const intervalId = setInterval(() => {
      setDate();
    }, TIME_UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [setDate]);

  return (
    <div className="current-time">
      <h2 className="current-time__title">
        Current Local Time in <strong>{city}</strong>
      </h2>
      <div className="current-time__value">{currentDate}</div>
    </div>
  );
};

CurrentTime.propTypes = {
  city: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  locales: PropTypes.string,
  dateStyle: PropTypes.string,
  timeStyle: PropTypes.string,
};
