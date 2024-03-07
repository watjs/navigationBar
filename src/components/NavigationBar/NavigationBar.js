import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavigationLink } from "./NavigationLink/NavigationLink";

import "./NavigationBar.scss";

export const NavigationBar = (props) => {
  const {
    data,
    onChange,
    textField,
    valueField,
    timeZoneField,
    showIndicator = true,
  } = props;

  const navElRef = useRef();
  const indicatorElRef = useRef();

  const [navData, setNavData] = useState(data);

  const setActiveLink = useCallback(
    (value) => {
      const updatedData = navData.map((item) => {
        item.isActive = item[valueField] === value;

        return item;
      });

      setNavData(updatedData);
    },
    [navData, valueField],
  );

  const moveIndicatorPosition = useCallback(
    (offsetWidth, offsetLeft) => {
      if (showIndicator) {
        indicatorElRef.current.style.width = `${offsetWidth}px`;
        indicatorElRef.current.style.left = `${offsetLeft}px`;
      }
    },
    [showIndicator],
  );

  const onSelect = useCallback(
    (event, text, value, timeZone) => {
      event.preventDefault();

      setActiveLink(value);

      if (showIndicator) {
        moveIndicatorPosition(
          event.target.offsetWidth,
          event.target.offsetLeft,
        );
        indicatorElRef.current.style.backgroundColor =
          event.target.getAttribute("data-active-color");
      }

      onChange(text, timeZone);
    },
    [onChange, setActiveLink, showIndicator, moveIndicatorPosition],
  );

  const onResize = useCallback(
    (element) => {
      moveIndicatorPosition(element.offsetWidth, element.offsetLeft);
    },
    [moveIndicatorPosition],
  );

  return (
    navData && (
      <nav
        data-testid="navigation"
        ref={navElRef}
        className={`navigation-bar${showIndicator ? " navigation-bar--show-border" : ""}`}
        aria-label="Cities"
      >
        <ul className="navigation-bar__list">
          {navData.map((item) => (
            <li key={item[valueField]} className="navigation-bar__item">
              <NavigationLink
                text={item[textField]}
                value={item[valueField]}
                timeZone={item[timeZoneField]}
                onSelect={onSelect}
                onResize={onResize}
                isActive={item.isActive}
              />
            </li>
          ))}
        </ul>
        {showIndicator && (
          <span className="nav-indicator" ref={indicatorElRef}></span>
        )}
      </nav>
    )
  );
};

NavigationBar.propTypes = {
  textField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  timeZoneField: PropTypes.string.isRequired,
  showIndicator: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  data: (props, propName, componentName) => {
    if (!Array.isArray(props[propName])) {
      return new Error(
        "`" +
          componentName +
          "`: Invalid value `" +
          props[propName] +
          "` supplied to" +
          " `" +
          propName +
          "`. Validation failed.",
      );
    }

    const itemWithMissingTextField = props[propName].find((item) => {
      return item[props["textField"]] === undefined;
    });

    if (itemWithMissingTextField) {
      return new Error(
        "`" +
          componentName +
          "`: Invalid value `" +
          itemWithMissingTextField[props["textField"]] +
          "` is set to `" +
          props["textField"] +
          "` supplied to ` data object ` .Validation failed.",
      );
    }

    const itemWithMissingValueField = props[propName].find((item) => {
      return item[props["valueField"]] === undefined;
    });
    if (itemWithMissingValueField) {
      return new Error(
        "`" +
          componentName +
          "`: Invalid value `" +
          itemWithMissingTextField[props["valueField"]] +
          "` is set to `" +
          props["valueField"] +
          "` supplied to ` data object ` .Validation failed.",
      );
    }
  },
};
