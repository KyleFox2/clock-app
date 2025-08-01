import { test, expect } from "@playwright/test";
import { startUp, getDate, getTime, pageUrl } from "../support/commands";

// DIGITAL CLOCK
test.describe("Digital Clock", () => {
  test("Displays current time", async ({ page }) => {
    await startUp(page, "");

    await test.step("Check displayed time matches system time", async () => {
      const timeDisplay = page.locator(".time");
      await expect(timeDisplay).toContainText(await getTime());
    });
  });

  test("Displays current date", async ({ page }) => {
    await startUp(page, "");

    await test.step("Check displayed date matches system date", async () => {
      const dateDisplay = page.locator(".date");
      await expect(dateDisplay).toContainText(await getDate());
    });
  });
});

// STOPWATCH
test.describe("Stopwatch", () => {
  test("Renders all initial elements correctly", async ({ page }) => {
    await startUp(page, "stopwatch");

    await test.step("Check visibility and labels of all static stopwatch elements", async () => {
      const timeText = page.getByText(":00.00");
      const body = page.locator("body");
      const resetButton = page.getByRole("button", { name: "Reset" });
      const resetLabel = page.locator("#reset");
      const startButton = page.getByRole("button", { name: "Start" });
      const startStopLabel = page.locator("#start-stop");

      await expect(timeText).toBeVisible();
      await expect(body).toContainText("00:00.00");
      await expect(resetButton).toBeVisible();
      await expect(resetLabel).toContainText("Reset");
      await expect(startButton).toBeVisible();
      await expect(startStopLabel).toContainText("Start");
    });
  });

  test("Can start and stop", async ({ page }) => {
    await startUp(page, "stopwatch");

    const startButton = page.getByRole("button", { name: "Start" });
    const stopButton = page.getByRole("button", { name: "Stop" });
    const startStopLabel = page.locator("#start-stop");

    await test.step("Start stopwatch and check label changes", async () => {
      await startButton.click();
      await expect(startStopLabel).toContainText("Stop");
    });

    await test.step("Stop stopwatch and check label returns to Start", async () => {
      await stopButton.click();
      await expect(startStopLabel).toContainText("Start");
    });
  });

  test("Can reset to zero", async ({ page }) => {
    await startUp(page, "stopwatch");

    const startButton = page.getByRole("button", { name: "Start" });
    const resetButton = page.getByRole("button", { name: "Reset" });
    const body = page.locator("body");

    await test.step("Start and confirm stopwatch is counting", async () => {
      await startButton.click();
      await expect(body).not.toContainText("00:00.00");
    });

    await test.step("Reset and confirm stopwatch returns to zero", async () => {
      await resetButton.click();
      await expect(body).toContainText("00:00.00--yuk");
    });
  });
});

// TIMER
test.describe("Timer Setup", () => {
  test("Renders all setup elements", async ({ page }) => {
    await startUp(page, "timersetup");

    await test.step("Check time outputs are zeroed", async () => {
      await expect(page.locator("#hourOutput")).toContainText("00");
      await expect(page.locator("#minOutput")).toContainText("00");
      await expect(page.locator("#secOutput")).toContainText("00");
    });

    await test.step("Check up/down arrows and labels exist for all time units", async () => {
      await expect(
        page.locator("#hour").getByRole("button", { name: "↑" })
      ).toBeVisible();
      await expect(
        page.locator("#hour").getByRole("button", { name: "↓" })
      ).toBeVisible();
      await expect(page.locator("#hour")).toContainText("Hours");

      await expect(
        page.locator("#min").getByRole("button", { name: "↑" })
      ).toBeVisible();
      await expect(
        page.locator("#min").getByRole("button", { name: "↓" })
      ).toBeVisible();
      await expect(page.locator("#min")).toContainText("Minutes");

      await expect(
        page.locator("#sec").getByRole("button", { name: "↑" })
      ).toBeVisible();
      await expect(
        page.locator("#sec").getByRole("button", { name: "↓" })
      ).toBeVisible();
      await expect(page.locator("#sec")).toContainText("Seconds");

      await expect(page.locator("#link")).toContainText("Start");
    });
  });

  test("Functions correctly when setting and running timer", async ({
    page,
  }) => {
    await startUp(page, "timersetup");

    await test.step("Increment hours, minutes, seconds and start timer", async () => {
      await page.locator("#hour").getByRole("button", { name: "↑" }).click();
      await page
        .locator("#min")
        .getByRole("button", { name: "↑" })
        .click({ clickCount: 2 });
      await page
        .locator("#sec")
        .getByRole("button", { name: "↑" })
        .click({ clickCount: 3 });
      await page.getByRole("button", { name: "Start" }).click();
    });

    await test.step("Confirm timer screen loads and displays buttons", async () => {
      await expect(page.url()).toBe(`${pageUrl}timer`);
      await expect(page.locator("#output")).toContainText("01:02:");
      await expect(page.locator("#delete")).toContainText("Delete");
      await expect(page.locator("#restart")).toContainText("Restart");
      await expect(page.locator("#stop-start")).toContainText("Stop");
    });

    await test.step("Restart timer", async () => {
      await page.getByRole("button", { name: "Restart" }).click();
      await expect(page.locator("#output")).toContainText("01:02:");
    });

    await test.step("Stop timer after delay and confirm time has changed", async () => {
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Stop" }).click();
      await page.waitForTimeout(4000);
      await expect(page.locator("#output")).not.toContainText("01:01:");
    });

    await test.step("Delete timer and return to setup screen", async () => {
      await page.getByRole("button", { name: "Delete" }).click();
      await expect(page.url()).toBe(`${pageUrl}timersetup`);
    });
  });
});

// WORLD CLOCK
test.describe("World Clock", () => {
  test("Renders default layout", async ({ page }) => {
    await startUp(page, "worldclock");

    const body = page.locator("body");

    await test.step("Check default time zone and labels", async () => {
      await expect(body).toContainText("Europe/London");
      await expect(body).toContainText("Local time zone");
    });

    await test.step("Check presence of search input and output display", async () => {
      await expect(page.getByPlaceholder("Search")).toBeVisible();
      await expect(page.getByPlaceholder("search")).toBeVisible();
      await expect(page.getByRole("button", { name: "🔍" })).toBeVisible();
      await expect(page.locator(".timezone-output")).toBeVisible();
      await expect(page.locator(".timezone-output")).toContainText(
        await getTime()
      );
    });
  });

  test("Shows error for invalid search", async ({ page }) => {
    await startUp(page, "worldclock");

    const searchInput = page.getByPlaceholder("Search");

    await test.step("Enter invalid city and check error", async () => {
      await searchInput.fill("12345678912");
      await searchInput.press("Enter");
      await expect(
        page.getByPlaceholder("Could not find that city")
      ).toBeVisible();
    });

    await test.step("Ensure default data remains visible", async () => {
      const body = page.locator("body");
      await expect(body).toContainText("Europe/London");
      await expect(body).toContainText("Local time zone");
    });
  });

  test.skip("Search updates clock info", async ({ page }) => {
    //This has been skipped as the world clock API has stopped working
    await startUp(page, "worldclock");

    const searchInput = page.getByPlaceholder("Search");
    const body = page.locator("body");

    await test.step("Search Tokyo and validate results", async () => {
      await searchInput.fill("tokyo");
      await page.getByRole("button", { name: "🔍" }).click();
      await expect(body).toContainText("Asia/Tokyo");
      await expect(body).toContainText("9 hours ahead");
    });

    await test.step("Search Bergen and validate results", async () => {
      await searchInput.fill("bergen");
      await searchInput.press("Enter");
      await expect(body).toContainText("Europe/Oslo");
      await expect(body).toContainText("1 hours ahead");
    });
  });
});
