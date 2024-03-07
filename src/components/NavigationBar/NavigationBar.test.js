import React, { fireEvent, render, screen } from "@testing-library/react";
import { NavigationBar } from "./NavigationBar";

describe("NavigationBar", () => {
  let data;

  let item01;
  let item02;

  beforeEach(() => {
    item01 = {
      title: "Some Title",
      value: "Some Value",
      timeZone: "America/Toronto"
    };

    item02 = {
      title: "Some Other Title",
      value: "Some Other Value",
      timeZone: "America/New_York"
    };

    data = [
      item01,
      item02
    ];

    render(<NavigationBar data={data}
                          textField="title"
                          valueField="value"
                          timeZoneField="timeZone"
                          onChange={() => {
                          }
                          } />);
  });

  test("should render navigation bar", () => {
    const navEl = screen.getByTestId("navigation");
    expect(navEl).toBeInTheDocument();
  });

  test("should render two navigation links", () => {
    const navigationLinks = screen.getAllByTestId("navigation-link");
    expect(navigationLinks.length).toBe(2);
  });

  test("should render title", () => {
    const navigationLinks = screen.getAllByTestId("navigation-link");

    const firstNavLink = navigationLinks[0];

    expect(firstNavLink.innerHTML).toBe(item01.title);
  });

  test("should set item value into `href` attribute", () => {
    const navigationLinks = screen.getAllByTestId("navigation-link");

    const firstNavLink = navigationLinks[0];

    expect(firstNavLink.getAttribute('href')).toBe('#' + item01.value);
  });


  test("should set active navigation", () => {
    let navigationLinks = screen.getAllByTestId("navigation-link");
    let firstNavLink = navigationLinks[0];

    fireEvent.click(firstNavLink);

    navigationLinks = screen.getAllByTestId("navigation-link");
    firstNavLink = navigationLinks[0];

    expect(firstNavLink.getAttribute('class')).toContain('navigation-link--active');
  });
});

