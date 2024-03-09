import { test, expect } from "@playwright/test";
import { startUp, getDate, getTime } from "../support/commands";

test.describe("digital clock tests", () => {
  test("time is valid", async ({ page }) => {
    await startUp(page, "");

    //Validates that the time is correct
    await expect(page.locator(".time")).toContainText(await getTime());
  });

  test("date is valid", async ({ page }) => {
    await startUp(page, "");

    //Validates that the date is correct
    await expect(page.locator(".date")).toContainText(await getDate());
  });
});

test.describe("stopwatch tests", () => {
  test("element presense check", async ({ page }) => {
    await startUp(page, "stopwatch");

    //Checks that all the elements are showing as expected
    await expect(page.getByText(":00.00")).toBeVisible();
    await expect(page.locator("body")).toContainText("00:00.00");
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
    await expect(page.locator("#reset")).toContainText("Reset");
    await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
    await expect(page.locator("#start-stop")).toContainText("Start");
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
    await expect(page.locator("#start-stop")).toContainText("Stop");
    await page.getByRole("button", { name: "Stop" }).click();
  });

  test("stopwatch is functional", async ({ page }) => {
    await startUp(page, "stopwatch");

    //checks the stopwatch updates and resets accordingly
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.locator("body")).not.toContainText("00:00.00");
    await expect(page.locator("#start-stop")).toContainText("Stop");
    await page.getByRole("button", { name: "Stop" }).click();
    await expect(page.locator("#start-stop")).toContainText("Start");
    await expect(page.locator("body")).not.toContainText("00:00.00");
    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.locator("body")).toContainText("00:00.00");
  });
});

test.describe("timer tests", () => {
  test("element presense checks", async ({ page }) => {
    await startUp(page, "timersetup");

    //Element presense check on the setup screen
    await expect(page.locator("#hourOutput")).toContainText("00");
    await expect(page.locator("#minOutput")).toContainText("00");
    await expect(page.locator("#secOutput")).toContainText("00");
    await expect(
      page.locator("#hour").getByRole("button", { name: "↑" })
    ).toBeVisible();
    await expect(
      page.locator("#hour").getByRole("button", { name: "↓" })
    ).toBeVisible();
    await expect(
      page.locator("#min").getByRole("button", { name: "↑" })
    ).toBeVisible();
    await expect(
      page.locator("#min").getByRole("button", { name: "↓" })
    ).toBeVisible();
    await expect(
      page.locator("#sec").getByRole("button", { name: "↑" })
    ).toBeVisible();
    await expect(
      page.locator("#sec").getByRole("button", { name: "↓" })
    ).toBeVisible();
    await expect(page.locator("#hour")).toContainText("Hours");
    await expect(page.locator("#min")).toContainText("Minutes");
    await expect(page.locator("#sec")).toContainText("Seconds");
    await expect(page.locator("#link")).toContainText("Start");
  });

  test("timer functionality checks", async ({ page }) => {
    await startUp(page, "timersetup");

    //Checks the functionality of the timer setup page
    await page.locator("#hour").getByRole("button", { name: "↑" }).click();
    await page.locator("#min").getByRole("button", { name: "↑" }).click({
      clickCount: 2,
    });
    await page.locator("#sec").getByRole("button", { name: "↑" }).click({
      clickCount: 3,
    });
    await page.getByRole("button", { name: "Start" }).click();

    //Checks the functionality of the timer page and checks the elements are valid
    await expect(page.url()).toBe("http://localhost:3000/timer");
    await expect(page.locator("#output")).toContainText("01:02:");
    await expect(page.locator("#delete")).toContainText("Delete");
    await expect(page.locator("#restart")).toContainText("Restart");
    await expect(page.locator("#stop-start")).toContainText("Stop");
    await page.getByRole("button", { name: "Restart" }).click();
    await expect(page.locator("#output")).toContainText("01:02:");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Stop" }).click();
    await page.waitForTimeout(4000);
    await expect(page.locator("#output")).not.toContainText("01:01:");
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.url()).toBe("http://localhost:3000/timersetup");
  });
});

test.describe("world clock tests", () => {
  test("4", async ({ page }) => {
    await startUp(page, "");

    //
  });

  test("5", async ({ page }) => {
    await startUp(page, "");

    //
  });
});
