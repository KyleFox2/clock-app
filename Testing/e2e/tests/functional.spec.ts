import { test, expect } from "@playwright/test";
import { startUp } from "../support/commands";

test.describe("digital clock tests", () => {
  test("time is valid", async ({ page }) => {
    await startUp(page);

    //Validates that the time is correct
    const date = new Date();
    const getTime = () => {
      return `${date.getHours().toLocaleString()}:${date
        .getMinutes()
        .toLocaleString()}:${date.getSeconds().toLocaleString()}`;
    };

    await expect(page.locator(".time")).toContainText(getTime());
  });

  test("date is valid", async ({ page }) => {
    await startUp(page);

    //Validates that the time is correct
    const getDate = () => {
      const date = new Date();
      const monthsList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const daysList = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return `${daysList[date.getDay()]} | ${date.getDate()} ${
        monthsList[date.getMonth()]
      } ${date.getFullYear()} | GMT`;
    };

    await expect(page.locator(".date")).toContainText(getDate());
  });
});

test.describe("stopwatch tests", () => {
  test("", async ({ page }) => {
    await startUp(page);

    //
  });
});

test.describe("timer tests", () => {
  test("", async ({ page }) => {
    await startUp(page);

    //
  });
});

test.describe("world clock tests", () => {
  test("", async ({ page }) => {
    await startUp(page);

    //
  });
});
