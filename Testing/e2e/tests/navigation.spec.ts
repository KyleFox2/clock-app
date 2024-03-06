import { test, expect } from "@playwright/test";
import { startUp } from "../support/commands";

test.describe("navigation functionality", () => {
  test("visual checks", async ({ page }) => {
    await startUp(page);

    //Opens up the application and checks that all the navigation buttons are present and valid
    await expect(page.getByRole("link", { name: "Clock App" })).toBeVisible();
    await expect(page.getByRole("heading")).toContainText("Clock App");
    await expect(
      page.getByRole("link", { name: "Digital Clock" })
    ).toBeVisible();
    await expect(page.getByRole("list")).toContainText("Digital Clock");
    await expect(page.getByRole("link", { name: "Stopwatch" })).toBeVisible();
    await expect(page.getByRole("list")).toContainText("Stopwatch");
    await expect(page.getByRole("link", { name: "Timer" })).toBeVisible();
    await expect(page.getByRole("list")).toContainText("Timer");
    await expect(page.getByRole("link", { name: "World Clock" })).toBeVisible();
    await expect(page.getByRole("list")).toContainText("World Clock");
  });

  test("navigation functionality checks", async ({ page }) => {
    await startUp(page);

    //Checks the buttons link to the correct page and verifys against the url
    await page.getByRole("link", { name: "World Clock" }).click();
    await expect(page.url()).toBe("http://localhost:3000/worldclock");
    await page.getByRole("link", { name: "Timer" }).click();
    await expect(page.url()).toBe("http://localhost:3000/timersetup");
    await page.locator("#hour").getByRole("button", { name: "↑" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.url()).toBe("http://localhost:3000/timer");
    await page.getByRole("link", { name: "Clock App" }).click();
    await expect(page.url()).toBe("http://localhost:3000/");
    await page.getByRole("link", { name: "Stopwatch" }).click();
    await expect(page.url()).toBe("http://localhost:3000/stopwatch");
    await page.getByRole("link", { name: "Digital Clock" }).click();
    await expect(page.url()).toBe("http://localhost:3000/");
  });
});
