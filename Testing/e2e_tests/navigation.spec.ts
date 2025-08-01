import { test, expect } from "@playwright/test";
import { startUp } from "../support/commands";

test.describe("Navigation Functionality", () => {
  test("displays all navigation links and headings correctly", async ({
    page,
  }) => {
    await test.step("Load the homepage", async () => {
      await startUp(page, "");
    });

    await test.step("Check logo and main heading", async () => {
      const appLink = page.getByRole("link", { name: "Clock App" });
      const heading = page.getByRole("heading");
      await expect(appLink).toBeVisible();
      await expect(heading).toContainText("Clock App");
    });

    await test.step("Verify all navigation links are visible and labeled", async () => {
      const navList = page.getByRole("list");
      const navLabels = ["Digital Clock", "Stopwatch", "Timer", "World Clock"];

      for (const label of navLabels) {
        const link = page.getByRole("link", { name: label });
        await expect(link).toBeVisible();
        await expect(navList).toContainText(label);
      }
    });
  });

  test("navigates correctly between all pages", async ({ page }) => {
    await startUp(page, "");

    await test.step("Navigate to World Clock", async () => {
      const worldClockLink = page.getByRole("link", { name: "World Clock" });
      await worldClockLink.click();
      await expect(page).toHaveURL(/\/worldclock$/);
    });

    await test.step("Navigate to Timer Setup and start a timer", async () => {
      const timerLink = page.getByRole("link", { name: "Timer" });
      await timerLink.click();
      await expect(page).toHaveURL(/\/timersetup$/);

      const hourUpButton = page
        .locator("#hour")
        .getByRole("button", { name: "↑" });
      const startButton = page.getByRole("button", { name: "Start" });

      await hourUpButton.click();
      await startButton.click();
      await expect(page).toHaveURL(/\/timer$/);
    });

    await test.step("Return to homepage via Clock App link", async () => {
      const homeLink = page.getByRole("link", { name: "Clock App" });
      await homeLink.click();
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step("Navigate to Stopwatch", async () => {
      const stopwatchLink = page.getByRole("link", { name: "Stopwatch" });
      await stopwatchLink.click();
      await expect(page).toHaveURL(/\/stopwatch$/);
    });

    await test.step("Return to Digital Clock", async () => {
      const digitalClockLink = page.getByRole("link", {
        name: "Digital Clock",
      });
      await digitalClockLink.click();
      await expect(page).toHaveURL(/\/$/);
    });
  });
});
