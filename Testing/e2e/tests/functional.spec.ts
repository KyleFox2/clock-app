import { test, expect } from "@playwright/test";
import { startUp } from "../support/commands";

test.describe("knai", () => {
  test("sxdasdf", async ({ page }) => {
    await startUp(page);
  });
});
