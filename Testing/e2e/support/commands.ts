import { Page, expect } from "@playwright/test";

export async function startUp(page: Page) {
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");
}
