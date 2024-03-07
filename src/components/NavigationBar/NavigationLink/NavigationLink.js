import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "../../../helpers/debounce";

import "./NavigationLink.scss";

export const NavigationLink = ({
  text,
  value,
  timeZone,
  isActive,
  onSelect,
  onResize,
}) => {
  const elementRef = useRef();

  const resizeHandler = useCallback(() => {
    onResize(elementRef.current);
  }, [onResize]);

  const resizeHandlerWithDebounce = debounce(resizeHandler);

  useEffect(() => {
    if (isActive) {
      window.addEventListener("resize", resizeHandlerWithDebounce);
    }
    return () => {
      if (isActive) {
        window.removeEventListener("resize", resizeHandlerWithDebounce);
      }
    };
  }, [isActive, resizeHandlerWithDebounce]);

  if (isActive) {
    return (
      <span
        data-testid="navigation-link"
        ref={elementRef}
        className={`navigation-link ${isActive && "navigation-link--active"}`}
        title={text}
      >
        {text}
      </span>
    );
  } else {
    return (
      <a
        data-testid="navigation-link"
        className={`navigation-link`}
        title={text}
        href={`#${value}`}
        onClick={(event) => {
          onSelect(event, text, value, timeZone);
        }}
      >
        {text}
      </a>
    );
  }
};

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
};