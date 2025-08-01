import { Page, expect } from "@playwright/test";

export const pageUrl: string = `http://localhost:3001/`;

export async function startUp(page: Page, directory: string) {
  const site: string = `${pageUrl + directory}`;
  await page.goto(site);
  await page.waitForLoadState("networkidle");

  //sense checks
  await expect(page.url()).toBe(site);
  await expect(page.getByRole("link", { name: "Clock App" })).toBeVisible();
  await expect(page.getByText("Copyright © Kyle Fox")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText(
    "Copyright © Kyle Fox 2023"
  );
}

export async function getTime() {
  const date = new Date();

  //gets the current time and returns it in formatted way
  const hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const sec = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  return `${hour}:${min}:${sec}`;
}

export async function getDate() {
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

  //return the month list in a formatted way
  return `${daysList[date.getDay()]} | ${date.getDate()} ${
    monthsList[date.getMonth()]
  } ${date.getFullYear()} | GMT`;
}
