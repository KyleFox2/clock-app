import { Page, expect } from "@playwright/test";

export async function startUp(page: Page) {
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");

  //sense checks
  await expect(page.getByText("Copyright © Kyle Fox")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText(
    "Copyright © Kyle Fox 2023"
  );
  await expect(page.getByRole("link", { name: "Clock App" })).toBeVisible();
  await expect(page.url()).toBe("http://localhost:3000/");
}
